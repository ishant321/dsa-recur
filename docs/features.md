# 🔁 DSA Recur — Feature Documentation

---

## 🧠 Overview

DSA Recur is a structured revision system designed to help users organize topics, revisit important questions, store notes, and reinforce learning through intelligent insights and random recall.

Unlike traditional trackers, DSA Recur focuses on **what needs to be revisited**, not just what is solved.

---

## 🎯 Core Idea

**Organize → Track → Revisit → Improve → Repeat**

The system helps users:

* Structure their DSA preparation
* Identify weak areas based on revision patterns
* Reinforce memory through repeated revision

---

## 📂 1. Topic & Subtopic System

### Description

Users can organize their preparation using a hierarchical structure of topics and subtopics.

### Features

* Create topics
* Create subtopics under a topic
* Nested parent-child relationship
* Delete topics

### Example

Arrays
├── Sliding Window
├── Prefix Sum

---

## ❓ 2. Question Management

### Description

Users can add and manage questions under specific topics or subtopics.

### Features

* Add question with:

  * Title
  * Link (LeetCode, etc.)
  * Difficulty (Easy, Medium, Hard)
  * Notes
* Edit question
* Delete question
* Assign to topic/subtopic

---

## 🔁 3. Revision Tracking

### Description

Tracks how frequently a question is revisited.

### Fields

* visitedCount
* lastVisitedAt

### Behavior

* Each time a user revisits a question:

  * visitedCount increments
  * lastVisitedAt updates

### Purpose

* Identify frequently revised (difficult) questions
* Identify ignored questions
* Support data-driven revision decisions

---

## 📝 4. Notes System

### Description

Each question supports personal notes.

### Features

* Add/edit notes
* Store approaches, mistakes, and optimizations

### Purpose

* Reinforce learning
* Avoid repeating mistakes

---

## 🎲 5. Random Revision System

### Description

Encourages active recall using randomness.

### Features

#### 🔹 Random Question

* Returns a random question
* Can prioritize weak topics (future enhancement)

#### 🔹 Random Theory

* Returns a random theory concept

### Purpose

* Avoid biased revision
* Improve retention

---

## 📚 6. Theory Reservoir

### Description

Stores important DSA concepts and patterns.

### Features

* Add theory items
* Can be associated with a topic or exist independently

### Examples

* Sieve of Eratosthenes
* Binary Search Pattern
* Sliding Window Template

---

## 📊 7. Dashboard System

### Description

The dashboard is the intelligence layer of the system and provides actionable, data-driven insights to guide effective revision.

---o

### 🔹 7.1 Quick Stats

* Total Questions
* Total Visits
* Topics Covered
* Notes Count

---

### 🔹 7.2 Today's Revision

* Random Question
* Random Theory

**Purpose:** Encourage daily revision

---

### 🔹 7.3 Weak Topic Detection

**Logic:**

* Topics with low visit count
* Topics with many questions but low interaction

**Output:**

* List of weak topics

---

### 🔹 7.4 Most Revised Questions

* Top questions based on visitedCount

**Purpose:**

* Identify difficult problems

---

### 🔹 7.5 Least Visited Questions

* Questions with low visitedCount

**Purpose:**

* Identify ignored areas

---

### 🔹 7.6 Activity Tracking

* Daily visit count
* Trend over time

---

### 🔹 7.7 Charts

* 📊 Pie Chart → Topic distribution
* 📊 Bar Chart → Visits per topic
* 📈 Line Chart → Activity over time

---

### 🔹 7.8 Random Practice Action

* Button: "Give me a question"
* Returns a random question (can prioritize weak topics)

---

### 🎯 Dashboard Value

The dashboard helps answer:

* What should I revise today?
* Which topics need more focus?
* Am I consistent?

---

## 🧭 User Flow

Login
→ Dashboard
→ Topics
→ Questions
→ Open Question
→ Revisit
→ Update tracking
→ View insights

---

## 🔥 Key Differentiators

* Revision-first system (not solved tracking)
* Visit-based learning insights
* Theory + question integration
* Random recall mechanism
* Weak topic detection

---

## 💯 Conclusion

DSA Recur is a **learning reinforcement system**, not just a tracking tool.

It focuses on improving memory retention and guiding users toward effective revision.
