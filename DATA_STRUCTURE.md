# QA Notes - Data Structure

This document outlines the folder structure for the QA Notes learning platform.

## Current Structure

```
src/data/
├── typescript/               ✅ COMPLETED
│   ├── lessons/             (16 JSON files)
│   ├── cheatsheet/          (16 JSON files)
│   ├── examples/            (16 JSON files)
│   └── README.md
│
├── test-cases/              🚧 PLANNED
│   ├── lessons/
│   ├── cheatsheet/
│   ├── examples/
│   └── README.md
│
├── api-testing/             🚧 PLANNED
│   ├── lessons/
│   ├── cheatsheet/
│   ├── examples/
│   └── README.md
│
├── playwright/              🚧 PLANNED
│   ├── lessons/
│   ├── cheatsheet/
│   ├── examples/
│   └── README.md
│
├── appium/                  🚧 PLANNED
│   ├── lessons/
│   ├── cheatsheet/
│   ├── examples/
│   └── README.md
│
├── cicd/                    🚧 PLANNED
│   ├── lessons/
│   ├── cheatsheet/
│   ├── examples/
│   └── README.md
│
├── docker/                  🚧 PLANNED
│   ├── lessons/
│   ├── cheatsheet/
│   ├── examples/
│   └── README.md
│
├── n8n/                     🚧 PLANNED
│   ├── lessons/
│   ├── cheatsheet/
│   ├── examples/
│   └── README.md
│
└── llm-testing/             🚧 PLANNED
    ├── lessons/
    ├── cheatsheet/
    ├── examples/
    └── README.md
```

## Topics Overview

### 1. TypeScript ✅ (16 topics completed)
- Getting Started, Basic Types, Type Inference
- Functions, Interfaces, Type Aliases, Classes
- Generics, Enums, Type Guards, Utility Types
- Advanced Patterns, TSConfig, Common Patterns/Errors
- Quick Reference

### 2. Test Cases 🚧
- Test case design techniques
- Boundary value analysis, Equivalence partitioning
- Decision tables, State transition testing
- Test management and execution

### 3. API Testing 🚧
- REST API fundamentals
- HTTP methods and status codes
- Authentication (OAuth, JWT, API Keys)
- Postman/Newman, REST Assured
- API automation frameworks

### 4. Playwright 🚧
- Web automation setup and configuration
- Locators, selectors, and assertions
- Page Object Model
- Cross-browser and parallel testing
- CI/CD integration

### 5. Appium 🚧
- Mobile automation architecture
- iOS and Android capabilities
- Native, Hybrid, and Web apps
- Mobile gestures and locators
- Device farms and cloud testing

### 6. CI/CD 🚧
- CI/CD pipeline fundamentals
- Jenkins, GitHub Actions, GitLab CI
- Pipeline as code
- Testing in pipelines
- Deployment strategies

### 7. Docker 🚧
- Container fundamentals
- Images, containers, and Dockerfile
- Docker Compose and networking
- Multi-stage builds
- Docker in testing environments

### 8. N8N 🚧
- Workflow automation basics
- Nodes, triggers, and webhooks
- API integrations
- Error handling and scheduling
- Testing workflows

### 9. LLM Testing 🚧
- LLM and AI fundamentals
- Prompt engineering techniques
- Testing model outputs
- Hallucination detection
- Performance and security testing

## File Format

Each topic follows the same structure:

### Lesson File (`lessons/*.json`)
```json
{
  "title": "Topic Title",
  "description": "Brief description",
  "introduction": "Detailed intro",
  "sections": [
    {
      "title": "Section Title",
      "content": "Main content",
      "example": "Code example",
      "keyPoints": ["point1", "point2"],
      "analogy": "Explanation with analogy"
    }
  ]
}
```

### Cheatsheet File (`cheatsheet/*.json`)
```json
{
  "title": "Topic Cheatsheet",
  "description": "Quick reference",
  "sections": [
    {
      "title": "Section",
      "codeBlocks": ["code1", "code2"],
      "keyPoints": ["tip1", "tip2"]
    }
  ]
}
```

### Examples File (`examples/*.json`)
```json
{
  "title": "Topic Examples",
  "description": "Practical examples",
  "examples": [
    {
      "title": "Example Title",
      "description": "What it does",
      "code": "Code sample",
      "explanation": "How it works",
      "difficulty": "beginner|intermediate|advanced"
    }
  ]
}
```

## Next Steps

1. **TypeScript**: Continue adding more advanced topics as needed
2. **Test Cases**: Create 10-15 lessons covering test design fundamentals
3. **API Testing**: Focus on REST, authentication, and automation tools
4. **Playwright/Appium**: Build comprehensive automation guides
5. **CI/CD & Docker**: Cover DevOps essentials for QA engineers
6. **N8N**: Workflow automation for testing scenarios
7. **LLM Testing**: Emerging AI testing techniques

## Usage

To add content for a new topic:

1. Create JSON files in the appropriate folder (lessons/cheatsheet/examples)
2. Update `src/pages/Lessons.tsx` to add import mappings
3. Add topic metadata to the `LESSONS` array
4. Follow the existing JSON schema for consistency
