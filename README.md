# Sylmap - India's AI-Powered Academic Intelligence Platform

Sylmap provides a unified intelligent search and exploration experience for higher education curricula in India.

## Product Architecture v7 & 2-Tab Unified Intent Routing

Sylmap uses **ONE shared primary search input** below **2 top-level tabs**:
> **Tab 1: Search & Explore** - *Find & discover academic information*  
> **Tab 2: Ask Sylmap** - *Ask about verified academic data*

Input Placeholder:
> `"Search or ask anything about academic curricula…"`

Students do not have to decide in advance whether their query belongs to search, comparison, or AI question mode. The **Compare** mode has been removed as a separate top-level tab and is now seamlessly handled as a result action by the Intent Router.

An application-layer **Intent Router** (`src/lib/intentRouter.ts`) automatically classifies query intent and routes to:
1. **Search & Discovery (`SEARCH_DISCOVERY`)**: Driven by Meilisearch for structured catalog lookups (universities, programmes, subjects, filters).
2. **Academic Question / Comparison (`ACADEMIC_QUESTION_AIE`)**: Driven by Academic Intelligence Engine (AIE) for grounded natural language answers and curriculum comparisons with verified citations.
3. **Ambiguous (`AMBIGUOUS`)**: Triggers interactive clarification cards for terms like `"AI"`, `"CSE"`, or `"Semester 5"`.

### Key Architectural Specifications
- **Pure Application Logic**: The Intent Router resides 100% in the application layer. No database changes or extra tables are added to the approved **39-table MVP ERD**.
- **Phase 1 NL Interpretation**: Natural-language query interpretation operates in Phase 1 without database schema modifications.
- **Verified Sylmap Data**: AIE answers strictly rely on verified Sylmap curriculum data with source citations. Unverified/out-of-scope queries return a clear downstream "Information not available in Sylmap" response.
- **Fallback**: Automatically falls back to keyword catalog search if natural language interpretation is unavailable.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
