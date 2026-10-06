---
title: "NL-to-SQL: Multi-Agent Natural Language Analytics Platform"
slug: "nl-to-sql-multi-agent-platform"
description: "A multi-agent platform that turns plain-English questions into verified SQL queries and visualizations, using a staged agent pipeline, semantic caching, and a SQL security guard to prevent hallucinated or unsafe queries."
techTags: ["Python", "FastAPI", "React", "DuckDB", "FAISS", "LLMs", "RAG"]
thumbnail: "/images/projects/nl-to-sql-platform.svg"
liveUrl: ""
repoUrl: ""
featured: true
date: "2026-01-01"
clientOrCompany: "Personal Project"
role: "Creator & Developer"
---

## Project Overview

This project is a **multi-agent Natural-Language-to-SQL platform**: users ask questions in plain English, and the system plans, generates, validates and executes SQL against a **DuckDB** backend, then returns both the answer and a visualization. Rather than relying on a single LLM call to translate a question straight into SQL, which is prone to hallucinated tables, columns and logic, the platform routes each question through a pipeline of specialised agents so that every query is checked before it runs.

### Features & Capabilities

- **Staged Agent Pipeline**: A Router, a Planner, a SQL Agent and a Synthesiser each handle one part of the job, so no single step has to go from raw English to trustworthy SQL in one hop.
- **Hallucination Guardrails**: Because generation is split across stages, the pipeline can validate intermediate steps (schema, intent, query shape) before a query ever executes.
- **FAISS Semantic Caching**: Previously answered questions are embedded and cached, so semantically similar questions reuse prior results instead of triggering a fresh, costly LLM call.
- **SQL Security Guard**: Generated SQL is checked before execution to block injection attempts and unsafe statements.
- **RAG-Based Document Q&A**: Users can also ask questions over unstructured documents, answered through retrieval-augmented generation rather than SQL.
- **Anomaly Detection**: The platform flags unusual patterns in query results, surfacing outliers alongside the answer.
- **Auto-Generated Visualizations**: Results come back with charts, not just raw tables.

---

## The Challenge

Letting an LLM write SQL directly against a real schema runs into two recurring problems: the model **hallucinates** tables, columns or joins that don't exist, and a naively generated query can be an **injection risk** if it's built from unsanitized text. On top of that, sending every question straight to an LLM is slow and expensive, even when many questions are close variations of ones already asked. The goal was a platform that stayed both **accurate** and **safe** without giving up the flexibility of open-ended, plain-English questions.

---

## Solution Architecture

The core of the platform is a pipeline of cooperating agents, each with a narrow responsibility:

<table>
  <thead>
    <tr>
      <th>Stage</th>
      <th>Role</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Router</strong></td>
      <td>Classifies the incoming question and decides which downstream path it needs (structured SQL query, document Q&A, or anomaly check).</td>
    </tr>
    <tr>
      <td><strong>Planner</strong></td>
      <td>Breaks the question into a query plan, identifying the relevant tables, filters and aggregations before any SQL is written.</td>
    </tr>
    <tr>
      <td><strong>SQL Agent</strong></td>
      <td>Generates the SQL query from the plan and runs it against DuckDB.</td>
    </tr>
    <tr>
      <td><strong>Synthesiser</strong></td>
      <td>Turns the raw query results into a natural-language answer plus a visualization.</td>
    </tr>
  </tbody>
</table>

> **Note:** the source material describes this as a *5-stage* pipeline but only names four stages (Router, Planner, SQL Agent, Synthesiser). If there's a distinct validation/critic step between the SQL Agent and the Synthesiser (or elsewhere), add it here — that's likely the missing fifth stage.

Around this pipeline sit two supporting systems:

- **Semantic cache (FAISS)**: incoming questions are embedded and compared against previously answered ones; close matches skip the LLM pipeline and return a cached result, cutting both latency and redundant LLM calls.
- **SQL security guard**: every generated query is checked before execution to block injection patterns and unsafe operations, independent of whether it came from cache or from a fresh generation.

---

## Tech Stack

<table>
  <thead>
    <tr>
      <th>Area</th>
      <th>Technologies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Backend</strong></td>
      <td>Python, FastAPI</td>
    </tr>
    <tr>
      <td><strong>Frontend</strong></td>
      <td>React</td>
    </tr>
    <tr>
      <td><strong>Data</strong></td>
      <td>DuckDB</td>
    </tr>
    <tr>
      <td><strong>Retrieval / Caching</strong></td>
      <td>FAISS (semantic caching, RAG document retrieval)</td>
    </tr>
    <tr>
      <td><strong>Intelligence</strong></td>
      <td>LLMs (multi-agent orchestration: Router, Planner, SQL Agent, Synthesiser)</td>
    </tr>
  </tbody>
</table>

---

## My Role & Contributions

> **Edit this section with specifics** — the source description doesn't break out individual contributions, so fill in what you personally designed vs. implemented.

- Designed the multi-agent pipeline architecture (Router → Planner → SQL Agent → Synthesiser) to prevent SQL hallucination.
- Implemented FAISS-based semantic caching to reduce redundant LLM calls.
- Built the SQL security guard to defend against injection attacks.
- Added RAG-based document Q&A and anomaly detection as extensions beyond core SQL querying.

---

## Outcome

> **Add real numbers if you have them** — e.g. cache hit rate, latency reduction, or accuracy improvement over direct LLM-to-SQL generation. The source description doesn't include metrics, so none are stated here.
