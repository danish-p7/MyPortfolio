---
title: "Real-Time Decisioning & Event Mediation Platform (Turkcell PoC)"
slug: "turkcell-decisioning-event-mediation-poc"
description: "A proof of concept for Turkcell's Inbound/Outbound Digital Marketing RFP: one Pega Customer Decision Hub backbone delivering real-time Next-Best-Action across web, mobile and IVR, plus Kafka-based event mediation for refill, payment and churn events."
techTags: ["Pega Customer Decision Hub", "Next-Best-Action", "Apache Kafka", "Cassandra", "PostgreSQL", "Data Flows", "Event Strategies", "REST Services", "Real-Time Decisioning"]
thumbnail: "/images/projects/orchestrator.svg"
liveUrl: "https://example.com/demo-orchestrator"
repoUrl: "https://github.com/example/cloud-orchestrator"
featured: true
date: "2026-08-04"
clientOrCompany: "Turkcell (via Adqura)"
role: "Decisioning Consultant"
---

## Project Overview

Turkcell ran an RFP for a next-generation **Inbound/Outbound Digital Marketing** capability. As part of that evaluation, I helped deliver a hands-on Proof of Concept on **Pega Customer Decision Hub (CDH)**. The goal was to show that a single "decisioning backbone" could serve both sides of the customer conversation:

- **Inbound**: a customer comes in through Web, Mobile or IVR, and the platform answers in real time with the best offers for that person, in that channel, at that moment.
- **Outbound**: streams of business events (refill, payment, usage, churn, sale) are queued, validated, enriched, correlated and routed to the right downstream systems.

The PoC covered **24 scenarios in total: 7 inbound decisioning scenarios and 17 outbound event-mediation scenarios**, all running on the same platform.

### Features & Capabilities

- **One Backbone, Every Channel**: A single decisioning layer gives consistent Next-Best-Action across Web, Mobile and IVR/call centre, driven by one set of eligibility, contact and arbitration rules.
- **Real-Time Decision Chain**: Every request follows the same funnel of *candidate offers → eligible offers → final offers*, with each stage explainable and testable.
- **Live Service Enrichment**: Decision flows call Turkcell services (current offer, subscription, device, profile, network) at decision time, including five in parallel, and cope with nulls and partial failures.
- **Event-Driven Outbound**: Kafka-backed data flows validate, enrich, aggregate and correlate refill and payment events, then route the results to target tables and downstream triggers.
- **Fast Customer Data Access**: A Customer Insight Cache (CIC) pre-computes fields such as segment priority and tariff limits, so runtime decisions stay light.
- **Traceable by Design**: Rejected events are written to audit and elimination logs with a reason code and the original payload.

---

## The Challenge

Turkcell needed to prove that a decisioning platform could go well beyond static campaign rules. The PoC had to show that it could:

1. Answer inbound requests in real time, with rules that differ by customer segment, contract type, price band and channel.
2. Combine data from several live services and event streams without slowing the decision down or failing when one dependency breaks.
3. Process high-volume outbound events reliably, with clear elimination, logging and routing logic.
4. Do all of the above on **one** platform rather than separate inbound and outbound stacks.

---

## Solution Architecture

<p>The architecture puts <strong>Pega Customer Decision Hub</strong> in the middle as the omni-channel, real-time decisioning engine.</p>

<table>
  <thead>
    <tr>
      <th>Layer</th>
      <th>What it does</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Inbound channels</strong></td>
      <td>Web, Mobile and IVR call <em>Get NBA</em> and <em>Capture Response</em>, and read <em>Response History</em>.</td>
    </tr>
    <tr>
      <td><strong>Customer Decision Hub</strong></td>
      <td>Runs eligibility, contact policy, engagement policy, prioritization and arbitration, and returns the next best action.</td>
    </tr>
    <tr>
      <td><strong>Product Catalogue</strong></td>
      <td>Offers are created, updated and deleted in the catalogue and feed eligibility checks.</td>
    </tr>
    <tr>
      <td><strong>Turkcell services</strong></td>
      <td>Online data fetch from <code>getCurrentOffer</code>, <code>SubscriptionService</code>, <code>DeviceService</code>, profile, device-shuttle and <code>NetworkService</code> services, and back-office stored procedures.</td>
    </tr>
    <tr>
      <td><strong>Kafka</strong></td>
      <td>Event and file publishers push refill events, payment events and churn customers onto streaming topics that CDH subscribes to.</td>
    </tr>
    <tr>
      <td><strong>Cassandra (NoSQL)</strong></td>
      <td>Response summaries, event summaries and raw events.</td>
    </tr>
    <tr>
      <td><strong>PostgreSQL (RDBMS)</strong></td>
      <td>Subscriber data model tables, audit tables and results/output tables.</td>
    </tr>
    <tr>
      <td><strong>Delivery mechanisms</strong></td>
      <td>SMS gateway, email, push and other outbound channels.</td>
    </tr>
  </tbody>
</table>

---

## Inbound Decisioning: 7 Scenarios

Each scenario was built as a decision flow with a defined success criterion: **the expected decision chain runs end to end**. Each one is modelled on a realistic customer persona.

### 1. Response-Based Elimination
*10 candidate offers → 4 eligible → 2 final*

A web customer wants to see TV+ and HBO Max bundles. Decisioning only runs on the 10 offers in the request. Product-catalogue eligibility cuts the list to 4, and then **30 days of response history** is checked against contact-policy limits (for example, "limit 2 and 2 rejects") to remove offers the customer has already been shown or has rejected too often.

### 2. First Best Offer (Business-Rule Ranking)
*8 candidates → 2 eligible → 1 best offer*

For individual postpaid customers, the platform computes a **segment priority** from subscriber data. That priority sets the upper and lower price and data limits for a new tariff. In the example, a customer on a 240 TL / 5 GB plan has an allowed upsell range of 360–480 TL. Engagement policies remove downsells and same-data plans, and arbitration selects the single best tariff (a 440 TL / 10 GB plan in the demo).

### 3. Business Moment (Real-Time Usage Events)
*6 candidates → 4 eligible → 4 final*

A heavy data user hits **80% of their quota**. That usage event is processed in real time, stored in the Customer Data Profiler and used immediately in the inbound decision. The customer sees ranked data top-up packs (1 GB, 3 GB, 10 GB and a 5G+ streamer pack), while SMS and voice packs are excluded by an engagement policy because they are not data plans. Offer validity and expiration are respected.

### 4. Prevent Downsell
*6 candidates → 6 after enrichment → 2 final*

The decision flow calls a **current-offer web service** mid-decision and compares the result to each candidate. Offers that would lower the customer's value are filtered out by price threshold, data threshold and other flags, such as a low-data plan or a 5G-box flag. The two best tariffs by data and price remain. The web-service error path is handled explicitly, so a failed call does not break the decision.

### 5. Parallel 5G Service Calls
*5 candidates → 5 after enrichment → 2 final*

Five services (device, SIM, subscription, network and profile parameters) are called **in parallel, not sequentially**. Outputs are merged into the subscriber record, NULL fields are handled, and a **partial failure in one call does not stop the others**. Business rules then decide who is really 5G-ready. In the demo, that means the customer has a 5G SIM and a 4G NSA network but a non-compatible device, so a 5G SIM-renewal campaign ranks first and a 4G tariff second, while device-upgrade and SA-specific offers are filtered out.

### 6. Conditional Sorting & Channel-Based Limits
*10 candidates → dynamic sort → 3 / 4 / 1 by channel*

The same eligible list is sorted with a rule chosen by **customer profile and channel**, then trimmed to a channel-specific limit set in configuration: **Web 3, Mobile 4, IVR 1**. A multi-channel customer therefore gets a coherent list that suits each touchpoint, without redeploying anything to change the limits.

### 7. Offer Consistency
*9 candidates → 5 eligible → 5 final*

Candidate offers arriving in the request are compared against the customer's **current package** (price, data, voice). Duplicates are removed by request-order priority, and offers that are more expensive or less valuable than what the customer already has are dropped. An **Upsell Map ID** protects offers that must be kept, and the final list preserves the requested order.

---

## Outbound: Event Mediation (17 Scenarios)

Real-time events are queued on **Kafka**, transformed and enriched in Pega **Data Flows**, split into different paths by rule, and written to target topics and tables.

### File-to-Kafka Loading

External event files are loaded through a scheduled, self-protecting job:

1. A **job scheduler** (per second, minute or hour) triggers a check activity.
2. The job checks whether a load data flow is **already running**. If it is, it stops; if not, it continues.
3. It starts the `LoadRefillEvents` data flow, which streams the file's rows to a Kafka-backed **Raw Events** dataset.
4. Processed files move through a folder lifecycle: **pending → processing → processed**.

### Content-Based Elimination
Raw events pass through a validation data transform. Invalid events, such as an ATM refill below a minimum amount, are flagged with a stage, an **elimination reason** and the **raw payload**, then written to an audit log and an elimination log. Valid events continue to permission validation.

### Cache Enrichment and Permission Checks
Events are enriched from a permissions cache (marketing-consent flags per customer). Events whose permissions fail are eliminated with a specific reason code. Only valid, permitted events move on.

### Listener → Cache Direct (Service-less)
Invoice-payment events update subscriber data **directly in the cache**, without a service hop, as well as through a service-mediated REST route. This shows both patterns side by side.

### Refill Aggregation
A windowed **event strategy** sums each subscriber's refill amounts in real time and emits an event as soon as the total crosses a threshold (800 in the demo). Subscribers with an unpaid invoice are handled separately. Results go to a result table, and marketable events trigger downstream Pega marketing events.

### Two-Event Correlation
Refill events and invoice-payment events are **correlated** through a decision strategy. This gives one combined signal that neither stream provides alone, feeding a second result table and marketing triggers.

### Journey Flows
Each filter rule spawns its own journey branch that writes to a dedicated target table:

- Payment → refill incentive
- City-based action routing
- Prepaid upsell for high-data-usage users
- Permission-gated endpoint calls
- Unpaid-invoice follow-up when the aggregated refill amount exceeds the debt

### Invoice Payments
After each invoice payment, the platform updates the **payment log**, the **subscriber record** (unpaid-invoice flag) and the **active-payer table**, and calls external REST services where needed.

---

## Customer Insight Cache (CIC)

Real-time decisions are only as fast as the data behind them. The CIC prepares customer data in four steps: **Load → Transform → Derive → Save**.

- **Load**: Pega integrates with existing systems of record, in batch or real time depending on the requirement.
- **Transform**: Data is restructured into a flat, denormalized, unified format with partitioned storage for fast access.
- **Derive**: Calculated fields, such as **segment priority** and **tariff upper/lower limits**, are computed ahead of time to cut resource use at execution.
- **Save**: Results are stored in the Decision Data Store (Cassandra) or in relational databases.

---

## Beyond Rules: Where the Platform Can Go Next

The PoC focused on rule execution, but the same backbone is designed to grow into a full decision engine. The proposal to Turkcell highlighted:

- **Self-learning adaptive models** that learn from every real-time response
- **Multi-level decisioning** at subscriber, account and household level
- **Simulations, What-If analysis, Value Finder, Predictor Finder and Impact Analyzer** to preview outcomes before going live
- **1:1 Operations Manager** for governed change
- **Agentic design and generative AI** capabilities

---

<h2>Tech Stack</h2>

<table>
  <thead>
    <tr>
      <th>Area</th>
      <th>Technologies</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><strong>Decisioning</strong></td>
      <td>Pega Customer Decision Hub, Next-Best-Action Designer, Decision Strategies, Event Strategies</td>
    </tr>
    <tr>
      <td><strong>Streaming</strong></td>
      <td>Apache Kafka (topics, streaming datasets), Pega Data Flows</td>
    </tr>
    <tr>
      <td><strong>Data</strong></td>
      <td>Cassandra (Customer Insight Cache, response and event summaries), PostgreSQL (subscriber model, audit, results)</td>
    </tr>
    <tr>
      <td><strong>Integration</strong></td>
      <td>REST/web services, stored procedures, file datasets</td>
    </tr>
    <tr>
      <td><strong>Delivery</strong></td>
      <td>SMS gateway, email, push</td>
    </tr>
  </tbody>
</table>

---

## My Role & Contributions

> **Edit this section to match your own work.** The presentation does not say which parts you personally built, so the bullets below are placeholders.

- Designed and built decision flows for the inbound scenarios (eligibility, contact and engagement policies, arbitration and channel-based limits).
- Implemented Kafka-based event-mediation data flows, including validation, enrichment, aggregation and correlation.
- Integrated live Turkcell services into decision flows, with parallel calls, null handling and failure handling.
- Presented the PoC to Turkcell stakeholders in July 2026.

---

## Outcome

The PoC demonstrated all 24 scenarios on a single platform. Each scenario's success criterion, an end-to-end decision chain that behaves as expected, was demonstrated in the presentation to Turkcell on **29 July 2026**.
