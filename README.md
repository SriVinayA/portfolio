# Personal Portfolio & AI Chatbot

A modern personal portfolio built with React and Spring Boot. It includes an AI assistant that answers questions about the portfolio owner’s professional background using Spring AI and DeepSeek.

## Tech Stack

### Frontend (`/portfolio-frontend`)

- React 19, Vite, and TanStack Router
- Tailwind CSS v4, shadcn/ui, and Radix UI
- Server-Sent Events client for streaming AI responses
- Deployable on Vercel

### Backend (`/portfolio-backend`)

- Java 25, Spring Boot 4, Gradle, and GraalVM Native Image
- Spring AI with DeepSeek (`deepseek-v4-flash`)
- Server-Sent Events endpoint: `POST /api/chat/stream`
- In-memory conversation memory with a 10-message window
- Bucket4j rate limiting for `/api/chat`: 7 requests per minute per instance/IP
- CORS allowlist for portfolio and local-development origins
- Deployable to Google Cloud Run as a Linux amd64 native container image

## Chat behavior

- Responses stream over Server-Sent Events (SSE).
- The assistant is instructed to discuss the portfolio owner’s qualifications, projects, availability, and relevant technical roles.
- The DeepSeek response limit is configured as 350 tokens in `portfolio-backend/src/main/resources/application.yaml`.
- The required runtime environment variable is `DEEPSEEK_API_KEY`.

## Run locally

### Prerequisites

- Node.js 20+
- Java 25
- A DeepSeek API key
- Docker-compatible container tooling only if building the native image locally

### Start the backend

```bash
cd portfolio-backend
export DEEPSEEK_API_KEY="your_api_key_here"
./gradlew bootRun
```

The backend listens on `http://localhost:8080` by default. It uses the `PORT` environment variable when provided:

```yaml
server:
  port: ${PORT:8080}
```

Confirm it is healthy:

```bash
curl -i http://localhost:8080/actuator/health
```

### Start the frontend

```bash
cd portfolio-frontend
npm install
npm run dev
```

The Vite app normally runs at `http://localhost:5173`.

Set `VITE_CHAT_API_URL` in the frontend environment to the Cloud Run service URL.

## Deploy backend to Cloud Run

The backend is built as a `linux/amd64` GraalVM native image because Cloud Run runs Linux containers. The deployment script uses Apple’s `container` CLI to build, tag, push, deploy, and then remove local image tags.

### Configure deployment variables

Define resource names before using the commands below:

```bash
export PROJECT_ID="<PROJECT_ID>"
export REGION="<REGION>"
export REPOSITORY="<ARTIFACT_REGISTRY_REPOSITORY>"
export SERVICE_NAME="<CLOUD_RUN_SERVICE_NAME>"
export IMAGE_NAME="<IMAGE_NAME>"
export TAG="native-amd64"
export RUNTIME_SERVICE_ACCOUNT="<RUNTIME_SERVICE_ACCOUNT_EMAIL>"
```

Example values might use a region such as `us-central1`, but choose the region and names appropriate for your project.

### One-time Google Cloud setup

1. Install and authenticate the Google Cloud CLI:

```bash
gcloud auth login
gcloud auth application-default login
gcloud config set project "${PROJECT_ID}"
```

2. Enable required APIs:

```bash
gcloud services enable \
  run.googleapis.com \
  artifactregistry.googleapis.com \
  secretmanager.googleapis.com
```

3. Create a Docker Artifact Registry repository:

```bash
gcloud artifacts repositories create "${REPOSITORY}" \
  --repository-format=docker \
  --location="${REGION}" \
  --description="Portfolio backend images"
```

If it already exists, the command returns an “already exists” error; that is safe to ignore.

4. Create the DeepSeek API-key secret:

```bash
printf %s "your-deepseek-api-key" | \
  gcloud secrets create deepseek-api-key --data-file=-
```

For later rotations, add a secret version instead:

```bash
printf %s "your-new-deepseek-api-key" | \
  gcloud secrets versions add deepseek-api-key --data-file=-
```

5. Grant the Cloud Run runtime service account access to the secret:

```bash
gcloud secrets add-iam-policy-binding deepseek-api-key \
  --member="serviceAccount:${RUNTIME_SERVICE_ACCOUNT}" \
  --role="roles/secretmanager.secretAccessor"
```

### Deploy with `deploy.sh`

Configure these variables in `portfolio-backend/deploy.sh` to match your project:

```bash
PROJECT_ID="<PROJECT_ID>"
REGION="<REGION>"
REPOSITORY="<ARTIFACT_REGISTRY_REPOSITORY>"
SERVICE="<CLOUD_RUN_SERVICE_NAME>"
IMAGE_NAME="<IMAGE_NAME>"
TAG="native-amd64"
```

Then deploy:

```bash
cd portfolio-backend
chmod +x deploy.sh
./deploy.sh
```

The script performs these actions:

1. Selects the Google Cloud project.
2. Gets a short-lived Google access token and authenticates Apple Container to Artifact Registry.
3. Builds the native `linux/amd64` image locally.
4. Tags the image with its Artifact Registry destination.
5. Pushes it to Artifact Registry.
6. Deploys it to Cloud Run.
7. Prints the service and health URLs.
8. Removes local image tags after deployment completes.

### Manual deploy command

If you deploy without the script, construct the remote image reference as follows:

```bash
REMOTE_IMAGE="${REGION}-docker.pkg.dev/${PROJECT_ID}/${REPOSITORY}/${IMAGE_NAME}:${TAG}"

gcloud run deploy "${SERVICE_NAME}" \
  --image="${REMOTE_IMAGE}" \
  --region="${REGION}" \
  --platform=managed \
  --allow-unauthenticated \
  --port=8080 \
  --set-secrets="DEEPSEEK_API_KEY=deepseek-api-key:latest"
```

## Image tags and cleanup

Deployment temporarily creates two **local tags** that normally point to the same image layers:

```text
<IMAGE_NAME>:native-amd64
<REGION>-docker.pkg.dev/<PROJECT_ID>/<REPOSITORY>/<IMAGE_NAME>:native-amd64
```

- The first tag is the local build name.
- The second tag identifies the Artifact Registry destination used by `container image push`.

These are not normally two full copies of the image. After a successful push and Cloud Run deployment, `deploy.sh` removes both local tags:

```bash
container image rm "${LOCAL_IMAGE}" || true
container image rm "${REMOTE_IMAGE}" || true
```

This only removes local image references. It does **not** remove the pushed Artifact Registry image or affect the Cloud Run revision already deployed.

## Container image details

The backend Dockerfile uses a multi-stage build:

- The builder stage uses `ghcr.io/graalvm/native-image-community:25` to run `./gradlew nativeCompile`.
- The runtime stage uses `debian:bookworm-slim` with `ca-certificates`, `libc6`, `libstdc++6`, and `zlib1g` installed for the native executable.
- The executable starts on `PORT`, defaulting to 8080.

If Cloud Run reports that the container did not listen on port 8080, inspect the revision logs for the native executable’s actual error. A port-probe error often means the process exited before Spring Boot started.

## Frontend deployment

Deploy the frontend on Vercel:

1. Import the repository in Vercel.
2. Set the Root Directory to `portfolio-frontend`.
3. Set `VITE_CHAT_API_URL` to the deployed Cloud Run service URL.
4. Redeploy the frontend after changing environment variables.

Ensure the deployed frontend URL appears in `WebConfiguration.java`’s CORS allowlist before using it in production.

## Useful commands

### View the Cloud Run service URL

```bash
gcloud run services describe "${SERVICE_NAME}" \
  --region="${REGION}" \
  --format='value(status.url)'
```

### View recent Cloud Run logs

```bash
gcloud run services logs read "${SERVICE_NAME}" \
  --region="${REGION}" \
  --limit=100
```

### Test the deployed health endpoint

```bash
SERVICE_URL="$(gcloud run services describe "${SERVICE_NAME}" \
  --region="${REGION}" \
  --format='value(status.url)')"

curl -i "${SERVICE_URL}/actuator/health"
```

## Security notes

- Keep `DEEPSEEK_API_KEY` in Secret Manager; never commit it to source control.
- The current rate limit is in-memory, so it applies per Cloud Run instance, not globally across scaled instances.
- User messages are currently logged by `ChatService`; remove or minimize this logging if visitor content should not be retained in Cloud Logging.
- Only add trusted frontend origins to the backend CORS allowlist.
