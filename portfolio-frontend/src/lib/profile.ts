export const profile = {
  name: "Vinay Appari",
  title: "Full Stack Java Developer",
  tagline:
    "Engineering intelligent enterprise solutions by combining scalable architecture, cloud platforms, and the possibilities of modern AI",
  summary:
    "Vinay Appari is a Full Stack Engineer with 7+ years of experience designing enterprise Java systems, plus deep work in Python, C++ systems programming, and AI/LLM orchestration.",
  location: "United States",
  email: "sva.sjsu@gmail.com",
  github: "https://github.com/SriVinayA",
  linkedin: "https://www.linkedin.com/in/vinay-sva/",
  website: "https://vinayappari.dev",
  quote:
    "Building systems that are fast, resilient, and intelligent — from enterprise Java microservices and Python AI pipelines, to C++ systems and modern web applications.",
};

export const experience = [
  {
    company: "Qualcomm",
    role: "Full Stack Java Developer",
    location: "San Diego, CA",
    period: "Recent",
    stack: ["Java 8", "Spring Boot", "ReactJS", "Angular", "AWS", "Kafka", "MongoDB", "Kubernetes"],
    highlights: [
      "Developed enterprise applications using Java, Spring Boot, Microservices, ReactJS, Angular, MongoDB, and MySQL.",
      "Built responsive UIs with ReactJS, Redux, Angular, HTML5, CSS3, Bootstrap, and TypeScript.",
      "Developed secure REST APIs using Spring Security and OAuth2.",
      "Integrated AWS services and implemented containerized deployments using Docker, Kubernetes, and Jenkins.",
      "Implemented Kafka for real-time messaging and event-driven architecture.",
    ],
  },
  {
    company: "Toyota",
    role: "Full Stack Java Developer",
    location: "Plano, TX",
    period: "",
    stack: ["Java 8", "Spring Boot", "Angular 2", "AWS", "MongoDB", "Jenkins"],
    highlights: [
      "Developed microservices using Spring Boot and REST APIs.",
      "Designed responsive web applications using Angular 2, TypeScript, HTML5, CSS3, and Bootstrap.",
      "Implemented Spring Security, OAuth2, SOAP/REST services, and MongoDB.",
      "Configured AWS Route53, Jenkins CI/CD, and Gradle build automation.",
    ],
  },
  {
    company: "LJA Engineering",
    role: "Full Stack Java Developer",
    location: "Houston, TX",
    period: "",
    stack: ["Java 8", "Spring Boot", "ReactJS", "Angular", "Kafka", "AWS", "Oracle"],
    highlights: [
      "Developed RESTful microservices using Java 8 and Spring Boot.",
      "Built single-page applications using ReactJS and Angular (6–9).",
      "Implemented Kafka for real-time data streaming.",
      "Worked extensively with AWS: EC2, Lambda, API Gateway, DynamoDB, S3, CloudFormation.",
    ],
  },
  {
    company: "Centene",
    role: "Full Stack Java Developer",
    location: "St. Louis, MO",
    period: "",
    stack: ["Java 8", "Spring Boot", "Oracle", "SQL Server", "Azure", "PCF", "Jenkins"],
    highlights: [
      "Modernized monolithic applications into Spring Boot microservices.",
      "Developed RESTful services and integrated with enterprise platforms.",
      "Built CI/CD pipelines using Jenkins and ANT.",
      "Deployed applications on Pivotal Cloud Foundry (PCF) and Microsoft Azure.",
    ],
  },
  {
    company: "Mindmade Technologies",
    role: "Full Stack Java Developer",
    location: "Coimbatore, India",
    period: "",
    stack: ["Java/J2EE", "JSP", "JSF", "Struts", "Oracle", "WebSphere", "Hibernate"],
    highlights: [
      "Developed Java EE applications using JSP, Servlets, JSF, Struts, JDBC, and Hibernate.",
      "Built XML processing modules and implemented PL/SQL stored procedures.",
      "Developed DAO components and deployed applications on IBM WebSphere.",
    ],
  },
];

export const skills: { category: string; items: string[] }[] = [
  {
    category: "Languages",
    items: ["Java", "Python", "C++", "SQL", "PL/SQL", "Rust", "C", "TypeScript", "JavaScript"],
  },
  {
    category: "Backend",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "Spring Data JPA",
      "Spring AI",
      "Hibernate",
      "Microservices",
      "REST",
      "SOAP",
      "JMS",
      "FastAPI",
    ],
  },
  {
    category: "Frontend",
    items: [
      "ReactJS",
      "Redux",
      "Angular 2–9",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Bootstrap",
      "Leptos",
    ],
  },
  {
    category: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, Lambda, RDS, API Gateway)",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Maven",
      "Gradle",
      "Git",
    ],
  },
  {
    category: "Data & Streaming",
    items: [
      "Apache Kafka",
      "PostgreSQL",
      "Oracle",
      "MySQL",
      "MongoDB",
      "Cassandra",
      "DynamoDB",
      "DB2",
    ],
  },
  {
    category: "AI / LLM",
    items: ["Spring AI", "LangChain", "LangGraph", "GPT-4.1", "Gemini 3.1", "Prompt Engineering"],
  },
];

import boltfetchCover from "@/assets/boltfetch-cover.jpg";
import talenttrekCover from "@/assets/talenttrek-cover.jpg";
import portfolioCover from "@/assets/portfolio-cover.jpg";

export const projects = [
  {
    name: "Portfolio Website",
    tagline: "This site — with a Spring AI + Gemini chatbot.",
    description:
      "A modern, interactive personal portfolio built with React, TypeScript, Tailwind CSS, shadcn/ui, TanStack Router/Start, and Vite. The AI chatbot is powered by a Spring Boot backend using Spring AI integrated with Google's Gemini 3.1 API — try Cmd+K to ask it anything about my background.",
    stack: ["React", "TypeScript", "Tailwind", "shadcn/ui", "TanStack Router/Start", "Vite", "Spring Boot", "Spring AI", "Google Gemini API"],
    link: "https://github.com/SriVinayA/portfolio",
    cover: portfolioCover,
  },
  {
    name: "TalentTrek",
    tagline: "AI-powered career companion — Master's capstone.",
    description:
      "AI Resume Tailoring microservice: a pipeline that parses resume + JD into structured JSON, runs cosine-similarity gap analysis, uses GPT-4.1 with structured output for hallucination-free rewrites, then compiles to ATS-friendly PDF via a custom JSON→LaTeX pipeline with one-click Overleaf. Dockerized on AWS EC2 behind API Gateway + Cognito.",
    stack: ["Python", "FastAPI", "GPT-4.1", "LaTeX", "Docker", "AWS", "Cognito"],
    link: "https://github.com/SriVinayA/Resume-Customizer",
    cover: talenttrekCover,
  },
  {
    name: "BoltFetch",
    tagline: "A blazing-fast, resilient download manager written in Rust.",
    description:
      "High-performance multi-threaded download manager with dynamic multipart downloading, adaptive rate-limit handling, exponential backoff, and persistent resume via .boltfetch state files. Ships both a CLI (Clap + Indicatif) and a native Tauri v2 + Leptos desktop UI with an IDM-inspired segmented progress bar.",
    stack: ["Rust", "Tokio", "Reqwest", "Tauri v2", "Leptos", "WebAssembly"],
    link: "https://github.com/SriVinayA/BoltFetch",
    cover: boltfetchCover,
  },
];

export const strengths = [
  "Enterprise Java application development",
  "Microservices architecture & REST APIs",
  "Cloud-native applications on AWS",
  "ReactJS and Angular front-end development",
  "Docker, Kubernetes, and CI/CD",
  "Kafka-based distributed messaging",
  "Database design and optimization",
  "AI/LLM integration and prompt engineering",
  "Systems programming (C++, Rust)",
  "Agile delivery and DevOps practices",
];

export const education = [
  {
    degree: "Master's Degree — Computer Software Engineering",
    detail: "Capstone: TalentTrek AI Career Platform",
  },
];
