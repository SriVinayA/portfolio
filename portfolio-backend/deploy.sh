#!/bin/bash
set -e

# ==========================================
# Configuration Variables
# ==========================================
RESOURCE_GROUP="portfolio-backend-slsha"
REGION="eastus"
REGISTRY_NAME="portfoliobackendslsharegistry"
REGISTRY_SERVER="${REGISTRY_NAME}.azurecr.io"
IMAGE_NAME="portfolio-backend-slsha-image"
SERVICE_NAME="portfolio-backend-slsha-service"
PORT=8000

# Fetch the current Git commit hash to use as the image tag
VERSION=$(git rev-parse --short HEAD)
FULL_IMAGE_PATH="${REGISTRY_SERVER}/${IMAGE_NAME}:${VERSION}"

# Check for API Key
if [ -z "$DEEPSEEK_API_KEY" ]; then
    echo "❌ Error: DEEPSEEK_API_KEY environment variable is not set."
    echo "Please set it before running: export DEEPSEEK_API_KEY=your_key_here"
    exit 1
fi

echo "🚀 Starting deployment for commit '${VERSION}'..."
echo "📦 Image destination: ${FULL_IMAGE_PATH}"

# ==========================================
# 0. Create Resource Group & Registry (skipped instantly if they already exist)
# ==========================================
echo "🏗️ Ensuring Resource Group exists..."
az group create --name ${RESOURCE_GROUP} --location ${REGION} > /dev/null

echo "🏗️ Ensuring Container Registry exists..."
az acr create --resource-group ${RESOURCE_GROUP} --name ${REGISTRY_NAME} --sku Basic > /dev/null 2>&1 || true

# ==========================================
# 1. Authenticate to Azure Container Registry
# ==========================================
echo "🔑 Configuring Docker authentication for Azure Container Registry..."
az acr login --name ${REGISTRY_NAME}

echo "⚙️  Ensuring admin user is enabled on registry..."
az acr update -n ${REGISTRY_NAME} --admin-enabled true > /dev/null

# ==========================================
# 2. Build and Push the Image
# ==========================================
echo "🛠️ Compiling GraalVM native image locally using Gradle..."
./gradlew bootBuildImage \
  --imageName=${FULL_IMAGE_PATH} \
  --imagePlatform=linux/amd64 \
  --cleanCache

echo "☁️ Pushing image to Azure Container Registry..."
docker push ${FULL_IMAGE_PATH}

# ==========================================
# 3. Configure Secret (creates it if it doesn't exist yet)
# ==========================================
echo "🔒 Ensuring API Key secret exists..."
az containerapp secret set \
  --name ${SERVICE_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --secrets "deepseek-api-key=${DEEPSEEK_API_KEY}" > /dev/null 2>&1 || true

# ==========================================
# 4. Deploy to Azure Container Apps (fast path vs first-time path)
# ==========================================
if az containerapp show --name ${SERVICE_NAME} --resource-group ${RESOURCE_GROUP} &>/dev/null; then
  echo "🔄 App already exists — using fast 'update' path..."
  az containerapp update \
    --name ${SERVICE_NAME} \
    --resource-group ${RESOURCE_GROUP} \
    --image ${FULL_IMAGE_PATH} \
    --set-env-vars "DEEPSEEK_API_KEY=secretref:deepseek-api-key" > /dev/null
else
  echo "🆕 App doesn't exist yet — creating with 'up'..."
  az containerapp up \
    --name ${SERVICE_NAME} \
    --resource-group ${RESOURCE_GROUP} \
    --location ${REGION} \
    --image ${FULL_IMAGE_PATH} \
    --registry-server ${REGISTRY_SERVER} \
    --ingress external \
    --target-port ${PORT}

  echo "⚙️  Mapping secret to environment variable..."
  az containerapp update \
    --name ${SERVICE_NAME} \
    --resource-group ${RESOURCE_GROUP} \
    --set-env-vars "DEEPSEEK_API_KEY=secretref:deepseek-api-key" > /dev/null
fi

# ==========================================
# 5. Warm-Up the New Revision (prevents scale-to-zero cold-start deadlock)
# ==========================================
echo "🔥 Warming up the new revision..."
sleep 15

APP_URL=$(az containerapp show \
  --name ${SERVICE_NAME} \
  --resource-group ${RESOURCE_GROUP} \
  --query "properties.configuration.ingress.fqdn" -o tsv)

for i in {1..6}; do
  if curl -sf "https://${APP_URL}/actuator/health" > /dev/null; then
    echo "✅ App is healthy and warmed up!"
    break
  else
    echo "⏳ Waiting for app to become healthy (attempt $i/6)..."
    sleep 10
  fi
done

echo "✅ Successfully deployed revision for Git commit ${VERSION} to Azure Container Apps!"
echo "🌐 URL: https://${APP_URL}"