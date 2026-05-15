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

## 1. user_activity_daily

| Field Name        | Type   | Description |
|------------------|--------|-------------|
| id               | UUID   | Primary key |
| user_id          | UUID   | User reference |
| date             | DATE   | Activity date |
| total_visits     | INT    | Total interactions that day |
| topic_visits     | INT    | Topic page visits |
| question_visits  | INT    | Question page visits |
| theory_visits    | INT    | Theory page visits |
| note_visits      | INT    | Notes page visits |
| created_at       | TIMESTAMP | Record creation time |
| updated_at       | TIMESTAMP | Last update time |

---

## 2. user_entity_activity

| Field Name        | Type   | Description |
|------------------|--------|-------------|
| id               | UUID   | Primary key |
| user_id          | UUID   | User reference |
| entity_type      | STRING | "TOPIC" or "QUESTION" |
| entity_id        | UUID   | Topic ID or Question ID |
| visit_count      | INT    | Number of times accessed |
| revision_count   | INT    | Number of revisions |
| last_visited_at  | TIMESTAMP | Last interaction time |
| created_at       | TIMESTAMP | Record creation time |
| updated_at       | TIMESTAMP | Last update time |

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

# 🔄 EVENT FLOW (Kafka)

Core Service publishes events like:

- USER_VISITED_QUESTION
- USER_REVISED_QUESTION
- USER_VISITED_TOPIC
- USER_VIEWED_THEORY

Dashboard Service consumes these events and updates analytics tables.

---

# 🎯 FINAL MODEL IDEA

CORE = What happened  
DASHBOARD = What it means  
