# 🔁 DSA Recur — Data Model Documentation (UUID Version)

---

## 🧠 Overview

DSA Recur uses a relational data model to support structured learning, revision tracking, and intelligent insights.

The system is designed around:

User → Topics/Subtopics → Questions/Theory → Revision Behavior → Insights

The model prioritizes **revision behavior over completion tracking** to improve long-term retention.

---

## 🟢 1. User

| Field | Type | Description |
|------|------|------------|
| id | UUID | Primary key |
| name | String | User name |
| email | String (unique) | User email |
| password | String | Hashed password |
| createdAt | Timestamp | Account creation time |

---

## 🔵 2. Topic

| Field | Type | Description |
|------|------|------------|
| id | UUID | Primary key |
| name | String | Topic name |
| parentId | UUID (nullable) | Parent topic (null = main topic) |
| userId | UUID | Owner user |
| createdAt | Timestamp | Creation time |

---

## 🟡 3. Question

| Field | Type | Description |
|------|------|------------|
| id | UUID | Primary key |
| title | String | Question title |
| link | String | External link |
| difficulty | Enum (EASY, MEDIUM, HARD) | Difficulty level |
| topicId | UUID | Associated topic/subtopic |
| visitedCount | Integer | Number of revisions |
| lastVisitedAt | Timestamp (nullable) | Last revision time |
| createdAt | Timestamp | Creation time |

---

## 🟣 4. Note

| Field | Type | Description |
|------|------|------------|
| id | UUID | Primary key |
| questionId | UUID | Associated question |
| content | Text | Note content (supports multiline / markdown) |
| createdAt | Timestamp | Creation time |
| updatedAt | Timestamp (optional) | Last update time |

---

## 🔴 5. Theory

| Field | Type | Description |
|------|------|------------|
| id | UUID | Primary key |
| title | String | Theory title |
| content | Text (Markdown) | Markdown-formatted content |
| topicId | UUID (nullable) | Optional topic association |
| createdAt | Timestamp | Creation time |

---

## 🔗 Relationships

- User 1 → many Topics  
- Topic 1 → many Subtopics  
- Topic 1 → many Questions  
- Question 1 → many Notes  
- Topic 1 → many Theory items  

---

## 🧩 ER Structure

User  
 └── Topic  
      ├── Topic (Subtopic)  
      ├── Question  
      │     └── Note  
      └── Theory  

---

## 📊 Dashboard Data Mapping

| Feature | Data Used |
|--------|----------|
| Total Questions | Question count |
| Total Revisions | Sum of visitedCount |
| Topics Covered | Topic count |
| Notes Count | Note count |
| Weak Topics | Question count vs visits |
| Most Revised Questions | High visitedCount |
| Least Visited Questions | Low visitedCount |
| Activity Over Time | lastVisitedAt |
| Random Question | Question table |
| Random Theory | Theory table |

---

## 💯 Conclusion

This data model is normalized, scalable, and supports a revision-first learning system using UUID-based identifiers.