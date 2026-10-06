---
title: "Applying Clean Architecture Principles in Modern TypeScript Services"
slug: "clean-architecture-in-typescript"
excerpt: "How to decouple business logic from framework concerns, external APIs, and persistence mechanisms using Ports and Adapters in TypeScript."
date: "2024-03-22"
tags: ["TypeScript", "Clean Architecture", "Design Patterns", "Backend"]
author: "Professional Developer"
---

When building enterprise Node.js or TypeScript services, coupling application logic to a specific ORM or web framework often leads to brittle tests and agonizing framework upgrades. Applying **Clean Architecture** (or the Hexagonal / Ports-and-Adapters pattern) solves this dilemma.

## The Core Concept: The Dependency Inversion Principle

The golden rule of Clean Architecture is: **business domain entities and use cases must never depend on external frameworks, databases, or UI drivers.** Instead, frameworks depend on abstractions defined by the domain.

### Layer Hierarchy

1. **Entities & Value Objects**: Immutable models representing core business constraints.
2. **Use Cases / Application Services**: Orchestrates business rules and workflows without knowledge of HTTP or SQL.
3. **Interface Adapters (Controllers, Repositories)**: Translates data between the format most convenient for the use cases and external representations.
4. **Frameworks & Drivers**: Express, Fastify, Next.js, PostgreSQL drivers, AWS SDK.

```typescript
// Define a Port (Interface) in the domain layer
export interface UserRepository {
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

// Implement an Adapter in the infrastructure layer
export class PostgresUserRepository implements UserRepository {
  constructor(private readonly pool: DbPool) {}

  async findById(id: string): Promise<User | null> {
    const res = await this.pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return res.rows[0] ? UserMapper.toDomain(res.rows[0]) : null;
  }

  async save(user: User): Promise<void> {
    // Persistence logic
  }
}
```

## Why This Matters for Long-Lived Systems

By separating the port definition from its concrete adapter, we can swap out a mock repository in unit tests instantly — without spawning a container or mock HTTP server. Furthermore, when upgrading libraries or migrating cloud providers, the domain layer remains 100% untouched.
