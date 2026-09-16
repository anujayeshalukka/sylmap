# Sylmap - India's AI-Powered Academic Intelligence Platform

Sylmap provides a unified intelligent search and exploration experience for higher education curricula in India.

## Product Architecture v7 & Single Unified Search Panel

Sylmap features **ONE primary unified search experience** without tabbed mode selectors:
> **Location Context**: `Explore in: [ Karnataka ▾ ]` *(Supports geographic expansion: All India, Karnataka, Kerala, Tamil Nadu, Telangana, Maharashtra)*  
> **Search Input**: `"Search or ask anything about academic curricula…"`

### Key Design & Architecture Decisions
- **ONE PRIMARY INTERACTION**: Students use a single search field. They do not need to select Search vs Compare or Ask Sylmap in advance.
- **Dark Navy/Blue Foundation**: Built using the dark navy/blue glassmorphism panel style with cyan/teal glowing search accents and CTA.
- **Application-Layer Intent Router**: `src/lib/intentRouter.ts` automatically routes input to:
  - `SEARCH_DISCOVERY` (e.g. `"VTU CSE syllabus"`, `"AI subjects in Semester 5"`)
  - `ACADEMIC_QUESTION_AIE` (e.g. `"Which universities teach AI in Semester 5?"`, `"What is AI in CSE?"`)
  - `COMPARISON` (e.g. `"Compare VTU and KTU CSE"`)
  - `AMBIGUOUS` (e.g. `"AI"`, `"CSE"`)
- **"Ask Sylmap" as a Response Badge**: When an academic question is answered, the response card is visually labeled with the **Ask Sylmap** / **Grounded AI Answer** badge.
- **0 Database Changes**: 100% application-layer routing logic. The 39-table MVP ERD remains untouched.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
