# 🔁 DSA Recur — Full Data Model (Core + Dashboard)

---

# 🟦 CORE SERVICE — DOMAIN DATA (SOURCE OF TRUTH)

This service stores actual user content and learning structure.

---

## 🟢 User
| Field Name   | Type      | Description |
|-------------|----------|-------------|
| id          | UUID     | Unique identifier for the user (primary key). |
| name        | STRING   | Name of the user. |
| email       | STRING   | Unique email address of the user. |
| password    | STRING   | Hashed password for authentication. |
| createdAt   | TIMESTAMP | Timestamp when user was created. |

---

## 🔵 Topic
| Field Name   | Type      | Description |
|-------------|----------|-------------|
| id          | UUID     | Unique identifier for the topic (primary key). |
| name        | STRING   | Name of the topic. |
| parentId    | UUID     | Parent topic reference (nullable for root topics). |
| userId      | UUID     | Owner of the topic. |
| createdAt   | TIMESTAMP | Timestamp when topic was created. |

---

## 🟡 Question
| Field Name     | Type      | Description |
|---------------|----------|-------------|
| id            | UUID     | Unique identifier for the question (primary key). |
| title         | STRING   | Title or name of the question. |
| link          | STRING   | External or internal reference link. |
| difficulty    | ENUM     | Difficulty level (EASY / MEDIUM / HARD). |
| topicId       | UUID     | Associated topic ID. |
| visitedCount  | INT      | Number of times question was visited. |
| lastVisitedAt | TIMESTAMP | Last time question was accessed. |
| createdAt     | TIMESTAMP | Timestamp when question was created. |

---

## 🟣 Note
| Field Name   | Type      | Description |
|-------------|----------|-------------|
| id          | UUID     | Unique identifier for the note (primary key). |
| questionId  | UUID     | Associated question ID. |
| content     | TEXT     | Markdown or rich text note content. |
| createdAt   | TIMESTAMP | Timestamp when note was created. |
| updatedAt   | TIMESTAMP | Last update timestamp. |

---

## 🔴 Theory
| Field Name   | Type      | Description |
|-------------|----------|-------------|
| id          | UUID     | Unique identifier for theory content. |
| title       | STRING   | Title of the theory topic. |
| content     | TEXT     | Markdown or explanation content. |
| topicId     | UUID     | Related topic (nullable). |
| createdAt   | TIMESTAMP | Timestamp when created. |

---

# 🟩 DASHBOARD SERVICE — ANALYTICS DATA (DERIVED STATE)

This service stores only derived analytics from user behavior.

---

# 📌 1. user_activity_daily

## Purpose
Stores daily user activity for:
- activity graphs
- streak calculation
- daily engagement tracking

## Schema

| Field Name        | Type      | Description |
|------------------|----------|-------------|
| id               | UUID     | Primary key |
| user_id          | UUID     | User reference |
| activity_date    | DATE     | Activity date |
| revision_count   | INT      | Total revisions done that day |
| topic_visits     | INT      | Topic page visits |
| question_visits  | INT      | Question page visits |
| theory_visits    | INT      | Theory page visits |
| note_visits      | INT      | Notes page visits |
| created_at       | TIMESTAMP | Record creation time |
| updated_at       | TIMESTAMP | Last update time |

---

## Used For

- GET /dashboard/activity
- current streak calculation
- today revision count
- activity heatmaps

---

# 📌 2. user_content_activity

## Purpose
Stores per-entity user behavior:
- revision tracking
- weak topics
- most/least revised questions
- summary analytics

---

## Schema

| Field Name        | Type      | Description |
|------------------|----------|-------------|
| id               | UUID     | Primary key |
| user_id          | UUID     | User reference |
| entity_type      | ENUM     | QUESTION / TOPIC / THEORY / NOTE |
| entity_id        | UUID     | Reference ID of entity |
| topic_id         | UUID     | Topic reference |
| revision_count   | INT      | Number of revisions |
| visit_count      | INT      | Number of visits |
| last_interacted_at | TIMESTAMP | Last interaction time |
| created_at       | TIMESTAMP | Record creation time |
| updated_at       | TIMESTAMP | Last update time |

---

## Used For

- GET /dashboard/summary
- GET /dashboard/weak-topics
- GET /dashboard/most-revised
- GET /dashboard/least-visited

---

# 🧠 Design Summary

## Separation of Concerns

| Table | Responsibility |
|------|---------------|
| user_activity_daily | Time-based analytics |
| user_content_activity | Entity-based analytics |

---

## Event Flow (Kafka)

Core Service emits events:

- USER_VISITED_TOPIC
- USER_VISITED_QUESTION
- USER_REVISED_QUESTION
- USER_VIEWED_THEORY
- USER_VIEWED_NOTE

Dashboard Service consumes these events and updates analytics tables.

---

# 🧠 ARCHITECTURE RULES

## Core Service
- stores real user data
- handles all CRUD operations
- source of truth

## Dashboard Service
- stores only computed analytics
- builds insights from events
- never modifies core data

---

# 🎯 FINAL MODEL IDEA

CORE = What happened  
DASHBOARD = What it means  
