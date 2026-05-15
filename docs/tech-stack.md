# ⚙️ Tech Stack — DSA Recur

---

## 🧠 Overview

This document defines the technology stack used to build DSA Recur.

The selection is based on:
- scalability
- industry relevance
- resume strength
- system design best practices
- event-driven architecture readiness

---

## 🖥️ Frontend

**React + TypeScript**

### Why
- Industry standard for frontend development
- Strong ecosystem and community support
- Type safety improves maintainability
- Works well for dashboard-based applications

---

## 🔧 Backend Architecture

### 🧩 Microservices

The system is split into two backend services:

### 1. Core Service (Main Service)
**Spring Boot (Java)**

#### Responsibilities
- Authentication (JWT-based)
- Topic management
- Question management
- Notes & theory
- Revision tracking
- Core business logic

---

### 2. Dashboard Service (Analytics Service)
**Spring Boot (Java)**

#### Responsibilities
- Analytics processing
- Streak calculations
- Heatmaps
- Progress tracking
- Dashboard metrics
- Aggregated reports

---

## 📨 Event Streaming

**Apache Kafka**

### Why Kafka
- Enables asynchronous communication between services
- Decouples Core Service from Dashboard Service
- Ensures reliable event delivery
- Supports scalable analytics processing

### Event Flow Example
- QUESTION_SOLVED
- TOPIC_CREATED
- REVISION_COMPLETED

---

## 🗄️ Databases

### Core Database (PostgreSQL)
Owned by Core Service:
- users
- topics
- questions
- notes
- theory
- revisions

### Dashboard Database (PostgreSQL)
Owned by Dashboard Service:
- daily_stats
- weekly_stats
- streaks
- heatmaps
- analytics_cache

---

## 🔐 Authentication

**JWT (JSON Web Token)**

### Why
- Stateless authentication
- Scales across microservices
- Each service validates token independently
- No session dependency

---

## 📊 Charts & Visualization

**Recharts**

### Why
- Easy integration with React
- Suitable for dashboard analytics
- Lightweight and flexible

---

## 🚀 Deployment

### Frontend
- Vercel

### Backend Services
- Render / Railway

### Databases
- Supabase / Neon (PostgreSQL)

### Kafka (Development)
- Local Docker setup
- Confluent Cloud (optional for production)

---

## 🧱 Architecture Style

- Microservices Architecture
- Event-Driven Architecture (Kafka)
- Database-per-service pattern
- Stateless authentication (JWT)

---

## 💯 Conclusion

This stack ensures:
- scalable distributed system design
- clean separation of concerns
- real-world microservices architecture
- strong backend + system design portfolio value
- industry-aligned event-driven system using Kafka