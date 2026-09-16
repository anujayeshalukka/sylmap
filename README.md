# Sylmap - India's AI-Powered Academic Intelligence Platform

Sylmap provides a unified intelligent search and exploration experience for higher education curricula in India.

## Product Architecture v7 & Single Search Input Experience

Sylmap features **ONE shared primary search space** under two top-level sections:
> **Tab 1: Search & Explore** - *Unified Academic Search & Discovery (Default)*  
> **Tab 2: Compare** - *Compare Institutions & Curricula*

Shared Input Placeholder:
> `"Search or ask anything about academic curricula…"`

### Key Design & Architecture Decisions
- **ONE SEARCH SPACE, MULTIPLE INTELLIGENT OUTCOMES**: Students use a single search field. They do not have to decide in advance whether a query is keyword search, filter lookup, natural-language question, or comparison.
- **Ask Sylmap as a Response Type**: "Ask Sylmap" is NOT a separate tab or search entry. When the application-layer Intent Router (`src/lib/intentRouter.ts`) identifies an academic question, the grounded AI response card is visually labeled with **Ask Sylmap** above the response.
- **Comparison Handling**: Comparisons can be launched via the `Compare` section UI or by typing comparison requests (e.g. `"Compare VTU and KTU CSE"`) directly into the single Search & Explore input bar.
- **0 Database Changes**: Intent Router resides 100% in the application layer. The 39-table MVP ERD remains untouched.
- **Phase 1 NL Interpretation**: Natural-language query interpretation operates in Phase 1 without database schema modifications.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
