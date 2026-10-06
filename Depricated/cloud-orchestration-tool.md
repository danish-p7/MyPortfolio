---
title: "Distributed Cloud Orchestrator CLI"
slug: "cloud-orchestration-tool"
description: "A lightweight CLI tool and daemon for orchestrating microservices, managing ephemeral preview environments, and streamlining local testing."
techTags: ["Go", "TypeScript", "Docker", "AWS", "gRPC", "Linux"]
thumbnail: "/images/projects/orchestrator.svg"
liveUrl: "https://example.com/demo-orchestrator"
repoUrl: "https://github.com/example/cloud-orchestrator"
featured: false
date: "2023-11-04"
clientOrCompany: "Internal Infrastructure Project"
role: "DevOps & Systems Developer"
---

## Project Overview

Development teams frequently encountered configuration drift and long feedback loops when testing inter-service dependencies locally. The **Distributed Cloud Orchestrator** was built to spin up reproducible, isolated staging environments within seconds using containerized service graphs.

### Key Impact

- Reduced developer local environment onboarding time from **2 days to under 15 minutes**.
- Automated DNS routing and TLS certificate provisioning for local and remote preview branches.
- Implemented smart caching of built Docker layers across shared team build agents.

---

## Technical Highlights

- **Fast CLI in Go**: Single static binary with zero external dependencies for cross-platform support across macOS, Linux, and Windows.
- **TypeScript Web Dashboard**: Companion dashboard providing visual dependency mapping and resource consumption telemetry.
- **gRPC Protocol**: High-performance bi-directional RPC channel between the local daemon and remote preview controllers.
