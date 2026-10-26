# Pocketwise

Local-only personal expense tracker. Data is stored only in your browser, so export JSON backups regularly.

## Setup

`npm install` then `npm run dev`.

Scripts: `npm run build`, `npm test`, and `npm run lint`.

## Structure

- `src/components` reusable UI and layout
- `src/pages` routed screens
- `src/store` persisted Zustand state
- `src/storage` safe local browser storage boundary
- `src/lib` pure money, date, budget, and CSV logic
- `src/types` domain types
