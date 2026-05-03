

# 🔧 Common API Conventions — DSA Recur

---

## 🧠 Overview

This section defines common conventions used across all APIs in DSA Recur.

---

## 🔐 Authentication

All protected APIs require JWT authentication.

### Header

```http
Authorization: Bearer <token>
```

---

## 📦 Request & Response Format

### Success Response

```json
{
 "data": {} / [] / null,
 "message": "Success"
}
```
**Each API must return a strictly consistent data type in its response.**

### Error Response

```json
{
 "data": null,
 "message": "Error message",
 "status": 400,
 "error": "BAD_REQUEST"
}
```

---

## 📊 Status Codes

| Code | Meaning |
|------|--------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🧾 Pagination (Future Use)

### Query Params

```text
?page=1&limit=10
```

---

### Response Example

```json
{
 "data": [],
 "meta": {
   "page": 1,
   "limit": 10,
   "total": 100
 }
}
```

---

## 🔍 Filtering & Query

Example:

```text
GET /questions?topicId={topicId}
GET /theory?topicId={topicId}
```

---

## 🧠 Validation Rules

- Required fields must be present
- UUIDs must be valid format
- Enums must match allowed values
- Strings should be trimmed

---

## 🔄 Timestamps

- All timestamps should be in ISO format

Example:

```text
2026-05-03T10:30:00Z
```

---

## ⚠️ Security Rules

- A user can only access their own data
- Always validate ownership using userId from token
- Never trust client-provided IDs without verification

---

## 💯 Notes

- Backend is responsible for:
 - ID generation
 - timestamps
 - authentication validation
- Frontend should only send required input fields
- Keep APIs RESTful and consistent

--

# 1. Auth APIs

## 🧠 Overview

Auth APIs handle user registration and login.

After successful login, a JWT token is returned. This token must be included in all protected API requests.

---

## 📌 1. Register User

### Endpoint

POST /auth/register

### Request Body

```json
{
 "name": "Ishant",
 "email": "ishant@example.com",
 "password": "password123"
}
```

### Response

#### 201 Created

```json
{
 "data": null,
 "message": "User registered successfully"
}
```

#### 400 Bad Request

```json
{
 "data": null,
 "message": "Email already exists"
}
```

---

## 📌 2. Login User

### Endpoint

POST /auth/login

### Request Body

```json
{
 "email": "ishant@example.com",
 "password": "password123"
}
```

### Response

#### 200 OK

```json
{
 "data": {
   "token": "jwt_token_here"
 },
 "message": "Login successful"
}
```

#### 401 Unauthorized

```json
{
 "data": null,
 "message": "Invalid email or password"
}
```

---

## 🔐 Authentication Usage

Include the JWT token in all protected API requests:

```http
Authorization: Bearer <token>
```

---

## 🧠 Notes

- Password must be securely hashed, for example using BCrypt.
- JWT token should contain the userId.
- All non-auth APIs must require authentication.
- Token validation should be handled using a middleware/filter.

# 📂 2. Topic APIs

---

## 🧠 Overview

Topic APIs are used to manage topics and subtopics.

Topics support a hierarchical structure using `parentId`.

---

## 📌 1. Create Topic

### Endpoint

POST /topics

### Request Body

```json
{
 "name": "Arrays",
 "parentId": null
}
```

### Notes

- `parentId = null` → main topic 
- `parentId = topicId` → subtopic 

---

### Response

#### 201 Created

```json
{
   "data": {
       "id": "generated-uuid",
       "name": "Arrays",
       "parentId": null
   },
   "message": "Topics created successfully"
}
```

---

## 📌 2. Get All Topics

### Endpoint

GET /topics

### Description

Returns all topics and subtopics for the logged-in user.

---

### Response

#### 200 OK

```json
{
    "data": [
        {
            "id": "uuid-1",
            "name": "Arrays",
            "parentId": null
        },
        {
            "id": "uuid-2",
            "name": "Sliding Window",
            "parentId": "uuid-1"
        }
    ],
    "message": "Topics list fetched successfully."
}

```

---

## 📌 3. Update Topic

### Endpoint

PUT /topics/{topicId}

### Request Body

```json
{
 "name": "Two Pointers"
}
```

---

### Response

#### 200 OK

```json
{
 "data": null,
 "message": "Topic updated successfully"
}
```

---

## 📌 4. Delete Topic

### Endpoint

DELETE /topics/{topicId}

---

### Response

#### 200 OK

```json
{
 "data": null,
 "message": "Topic deleted successfully"
}
```

---

## ⚠️ Notes

- Deleting a topic should also handle:
 - subtopics
 - questions
 - notes 
 (decide cascade behavior in implementation)

- All APIs require authentication

- Topics must always belong to the logged-in user

# ❓ 3. Question APIs — DSA Recur

---

## 🧠 Overview

Question APIs are used to manage revision questions under topics or subtopics.

Each question belongs to one topic/subtopic and tracks revision behavior using `visitedCount` and `lastVisitedAt`.

---

## 📌 1. Create Question

### Endpoint

POST /questions

### Request Body

```json
{
 "title": "Longest Substring Without Repeating Characters",
 "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
 "difficulty": "MEDIUM",
 "topicId": "topic-uuid"
}
```

### Response

#### 201 Created

```json
{
    "data": {
        "id": "generated-uuid",
        "title": "Longest Substring Without Repeating Characters",
        "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        "difficulty": "MEDIUM",
        "topicId": "topic-uuid",
        "visitedCount": 0,
        "lastVisitedAt": null
    },
    "message": "Question created successfully"
}

```

---

## 📌 2. Get Questions by Topic

### Endpoint

GET /questions?topicId={topicId}

### Response

#### 200 OK

```json
{ "data": [
        {
            "id": "question-uuid",
            "title": "Longest Substring Without Repeating Characters",
            "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
            "difficulty": "MEDIUM",
            "topicId": "topic-uuid",
            "visitedCount": 3,
            "lastVisitedAt": "2026-05-03T10:30:00"
        }
    ],
  "message": "Question list fetched successfully" 
}

```

---

## 📌 3. Get Question by ID

### Endpoint

GET /questions/{questionId}

### Response

#### 200 OK

```json
{
    "data": {
        "id": "question-uuid",
        "title": "Longest Substring Without Repeating Characters",
        "link": "https://leetcode.com/problems/longest-substring-without-repeating-characters/",
        "difficulty": "MEDIUM",
        "topicId": "topic-uuid",
        "visitedCount": 3,
        "lastVisitedAt": "2026-05-03T10:30:00"
    },
    "message": "Question fetched successfully"
}
```

---

## 📌 4. Update Question

### Endpoint

PUT /questions/{questionId}

### Request Body

```json
{
 "title": "Updated Question Title",
 "link": "https://leetcode.com/problems/example/",
 "difficulty": "HARD",
 "topicId": "topic-uuid"
}
```

### Response

#### 200 OK

```json
{
 "data": null,
 "message": "Question updated successfully"
}
```

---

## 📌 5. Delete Question

### Endpoint

DELETE /questions/{questionId}

### Response

#### 200 OK

```json
{
 "data": null,
 "message": "Question deleted successfully"
}
```

---

## 📌 6. Mark Question as Revisited

### Endpoint

POST /questions/{questionId}/visit

### Description

Updates revision tracking for a question.

Each time this API is called:

- `visitedCount` increments by 1
- `lastVisitedAt` updates to current timestamp

### Response

#### 200 OK

```json
{
 "data": {
    "visitedCount": 4,
    "lastVisitedAt": "2026-05-03T10:45:00"
 },
 "message": "Question visit updated successfully"
}
```

---

## ⚠️ Notes

- All APIs require authentication.
- A user can only access questions that belong to their own topics.
- `id`, `visitedCount`, `lastVisitedAt`, and `createdAt` are managed by the backend.
- Deleting a question should also delete its related notes.

# 📝 4. Note APIs — DSA Recur

---

## 🧠 Overview

Note APIs are used to manage multiple notes for a question.

Each note belongs to one question, and one question can have many notes.

---

## 📌 1. Create Note

### Endpoint

POST /questions/{questionId}/notes

### Request Body

```json
{
 "content": "Use sliding window with hashmap. Remember to shrink from the left when duplicate appears."
}
```

### Response

#### 201 Created

```json
{
    "data": {
        "id": "generated-uuid",
        "questionId": "question-uuid",
        "content": "Use sliding window with hashmap. Remember to shrink from the left when duplicate appears.",
        "createdAt": "2026-05-03T10:30:00",
        "updatedAt": null
    },
    "message": "note added successfully"
}

```

---

## 📌 2. Get Notes for Question

### Endpoint

GET /questions/{questionId}/notes

### Response

#### 200 OK

```json
{
    "data": [
        {
            "id": "note-uuid",
            "questionId": "question-uuid",
            "content": "Use sliding window.",
            "createdAt": "2026-05-03T10:30:00",
            "updatedAt": null
        }
    ],
    "message": "Note fetched successfully"
}

```

---

## 📌 3. Update Note

### Endpoint

PUT /notes/{noteId}

### Request Body

```json
{
 "content": "Updated note content with better explanation."
}
```

### Response

#### 200 OK

```json
{
 "data": null,
 "message": "Note updated successfully"
}
```

---

## 📌 4. Delete Note

### Endpoint

DELETE /notes/{noteId}

### Response

#### 200 OK

```json
{
 "data": null,
 "message": "Note deleted successfully"
}
```

---

## ⚠️ Notes

- All APIs require authentication.
- A user can only access notes that belong to their own questions.
- `id`, `questionId`, `createdAt`, and `updatedAt` are managed by the backend.
- Note content can support multiline text or markdown.

# 📚 5. Theory APIs — DSA Recur

---

## 🧠 Overview

Theory APIs are used to manage theoretical concepts for revision.

Each theory item can optionally be linked to a topic or exist independently.

---

## 📌 1. Create Theory

### Endpoint

POST /theory

### Request Body

```json
{
    "data": {
        "title": "Sieve of Eratosthenes",
        "content": "### Approach\nUse a boolean array to mark primes.\nTime Complexity: O(n log log n)",
        "topicId": "topic-uuid-or-null"
    },
    "message": "Theory created successfully"
}

```

### Notes

- `topicId` can be `null` for independent theory items

---

### Response

#### 201 Created

```json
{
    "data": {
        "id": "generated-uuid",
        "title": "Sieve of Eratosthenes",
        "content": "### Approach\nUse a boolean array to mark primes.\nTime Complexity: O(n log log n)",
        "topicId": "topic-uuid-or-null",
        "createdAt": "2026-05-03T10:30:00"
    },
    "message": "Theory created successfully."
}

```

---

## 📌 2. Get All Theory

### Endpoint

GET /theory

### Optional Query

```text
GET /theory?topicId={topicId}
```

---

### Response

#### 200 OK

```json
{
    "data": [
        {
            "id": "theory-uuid",
            "title": "Sieve of Eratosthenes",
            "content": "Markdown content...",
            "topicId": "topic-uuid",
            "createdAt": "2026-05-03T10:30:00"
        }
    ],   
    "message": "Theory fetched succssfully"
}

```

---

## 📌 3. Get Random Theory

### Endpoint

GET /theory/random

---

### Response

#### 200 OK

```json
{
    "data": {
        "id": "theory-uuid",
        "title": "Binary Search Pattern",
        "content": "Markdown content...",
        "topicId": null,
        "createdAt": "2026-05-03T10:30:00"
    },
    "message": "Random theory fetched successfully"
}

```

---

## 📌 4. Get Theory by ID

### Endpoint

GET /theory/{theoryId}

---

### Response

#### 200 OK

```json
{
    "data": {
        "id": "theory-uuid",
        "title": "Sieve of Eratosthenes",
        "content": "Markdown content...",
        "topicId": "topic-uuid",
        "createdAt": "2026-05-03T10:30:00"
    },
    "message": "Theory fetched successfully"
}

```

---

## 📌 5. Update Theory

### Endpoint

PUT /theory/{theoryId}

### Request Body

```json
{
 "title": "Updated Title",
 "content": "Updated markdown content...",
 "topicId": "topic-uuid-or-null"
}
```

---

### Response

#### 200 OK

```json
{
 "data": null,
 "message": "Theory updated successfully"
}
```

---

## 📌 6. Delete Theory

### Endpoint

DELETE /theory/{theoryId}

---

### Response

#### 200 OK

```json
{
 "message": "Theory deleted successfully"
}
```

---

## ⚠️ Notes

- All APIs require authentication
- Theory content supports Markdown rendering
- A user can only access their own theory items
- `id`, `createdAt` are managed by backend

# 📊 6. Dashboard APIs — DSA Recur

---

## 🧠 Overview

Dashboard APIs provide **data-driven insights** based on user revision behavior.

These endpoints power:
- summary stats
- weak topic detection
- most/least revised questions
- activity trends

---

## 📌 1. Get Dashboard Summary

### Endpoint

GET /dashboard/summary

---

### Response

#### 200 OK

```json
{
  "data": {
    "totalQuestions": 120,
    "totalRevisions": 340,
    "topicsCovered": 12,
    "notesCount": 45
  },
  "message": "Success"
}
```

---

## 📌 2. Get Weak Topics

### Endpoint

GET /dashboard/weak-topics

### Description

Returns topics where **revision activity is low relative to number of questions**.

---

### Response

#### 200 OK

```json
{
  "data": [
    {
      "topicId": "topic-uuid",
      "topicName": "Graph",
      "questionCount": 20,
      "totalRevisions": 5
    }
  ],
  "message": "Success"
}
```

---

## 📌 3. Get Most Revised Questions

### Endpoint

GET /dashboard/most-revised

---

### Response

#### 200 OK

```json
{
    "data": [
        {
            "questionId": "question-uuid",
            "title": "Longest Substring",
            "visitedCount": 12
        }
    ],
    "message": "most visited data successfully fetched"
}

```

---

## 📌 4. Get Least Visited Questions

### Endpoint

GET /dashboard/least-visited

---

### Response

#### 200 OK

```json
{
    "data": [
        {
            "questionId": "question-uuid",
            "title": "Binary Search",
            "visitedCount": 0
        }
    ],
    "message": "least visited data successfully fetched"
}

```

---

## 📌 5. Get Activity Over Time

### Endpoint

GET /dashboard/activity

---

### Response

#### 200 OK

```json
{
  "data": [
    {
      "date": "2026-05-01",
      "revisions": 5
    }
  ],
  "message": "Success"
}
```

---

## 📌 6. Get Random Question

### Endpoint

GET /questions/random

---

### Response

#### 200 OK

```json
{
  "data": {
    "id": "question-uuid",
    "title": "Two Sum",
    "difficulty": "EASY",
    "topicId": "topic-uuid"
  },
  "message": "Success"
}
```

---

## ⚠️ Notes

- All APIs require authentication
- All data is filtered by logged-in user
- Weak topics are calculated using:
 - number of questions
 - total revisions
- Activity data may be approximated using `lastVisitedAt` in v1
- Random endpoints can later be enhanced to prioritize weak topics

