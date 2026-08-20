## 1. Intent and Temporal Rule Engine

- [x] 1.1 Implement Chilean snow intent classifier (`SEARCHING_RIDE`, `OFFERING_RIDE`, `TICKET_SALES`, `OTHER`) in `scripts/facebook/classifier-rules.ts`
- [x] 1.2 Implement relative date parser and future validity calculator in `scripts/facebook/temporal-parser.ts`

## 2. CLI Classifier Pipeline

- [x] 2.1 Implement `scripts/facebook/classify-trips.ts` to process `recent-posts.json`, filter valid future leads, and save `classified-trips.json`
- [x] 2.2 Add `fb:classify` to `package.json` and test against real extracted posts

