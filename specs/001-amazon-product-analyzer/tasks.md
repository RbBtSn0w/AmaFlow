# Tasks: Amazon Product Selection Analyzer

**Input**: Design documents from `/specs/001-amazon-product-analyzer/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/message-protocol.md

**Tests**: Tests are OPTIONAL for this lightweight pure-client browser extension project. Verification will rely on loading the unpackaged extension in Google Chrome and performing UI sanity checks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: Standard extension directories are created in `src/` at the repository root.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic extension boilerplate configuration

- [x] T001 Create project file layout and source assets directories in `src/`
- [x] T002 Configure standard chrome Manifest V3 browser extension metadata in `src/manifest.json`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core calculation engines and message-passing protocols blocking all UI/page logic

- [x] T003 Implement BSR-to-Sales static correlation tables and estimator functions in `src/background.js`
- [x] T004 Setup asynchronous runtime message port listeners to handle UI requests in `src/background.js`

---

## Phase 3: User Story 1 - Single Product Quick Analysis (Priority: P1) 🎯 MVP

**Goal**: Extract data from active Amazon product page and render a quick selection overlay analysis scorecard

**Independent Test**: Load the unpacked extension, visit a product page (e.g., `amazon.com/dp/B08N5WRWNW`), and verify that a scorecard box overlays the page showing ASIN, Category, BSR, and estimated monthly sales.

### Implementation for User Story 1

- [x] T005 [US1] Implement DOM scraping parsing algorithms for Amazon US/UK product listings in `src/content.js`
- [x] T006 [US1] Create floating overlay selection scorecard panel container and Inject logic in `src/content.js`
- [x] T007 [US1] Integrate overlay scorecard with background script sales estimation message-passing contracts in `src/content.js`

---

## Phase 4: User Story 2 - Batch Scan on Search Results Page (Priority: P2)

**Goal**: Allow sellers to trigger bulk DOM scanner to generate a Niche comparison matrix table on Amazon search pages

**Independent Test**: Search for a query on Amazon, click the "Analyze Niche" button, and verify that a modal table is rendered listing all organic products with average prices and aggregate reviews.

### Implementation for User Story 2

- [x] T008 [US2] Implement iterative DOM query scraper to batch parse listing details in `src/content.js`
- [x] T009 [US2] Implement niche statistics calculations (averages, competitiveness rankings) in `src/content.js`
- [x] T010 [US2] Build scrollable modal comparison table UI layer overlay in `src/content.js`

---

## Phase 5: User Story 3 - Selection Workspace & Export (Priority: P3)

**Goal**: Save target products to a local watchlist and export them to Excel-compatible CSV spreadsheets

**Independent Test**: Add 2 items to the watchlist, open the extension action popup from the toolbar, confirm items exist, and download a CSV file with correct product columns.

### Implementation for User Story 3

- [x] T011 [US3] Implement Chrome Local Storage repository CRUD functions (watchlist add/remove) in `src/background.js`
- [x] T012 [P] [US3] Build watchlist items interactive listing interface in `src/popup.html` and `src/popup.js`
- [x] T013 [US3] Implement Excel-compatible CSV string generation and local download pipelines in `src/background.js`

---

## Phase 6: User Story 4 - Category Trends Analysis (Priority: P2)

**Goal**: Scrape Best Sellers and Category list pages, showcase Top 10 rankings, and render an interactive, checkbox-toggled SVG trend chart for sales/price.

**Independent Test**: Load the extension, navigate to an Amazon Best Sellers page, click "Scan Category", select/deselect checkboxes, and check if the SVG line graph dynamically recalculates and redraws.

### Implementation for User Story 4

- [x] T016 [US4] Implement Best Sellers & Category list DOM scraper in `src/content.js`
- [x] T017 [US4] Build SVG line chart drawing engine with dynamic scaling in `src/content.js`
- [x] T018 [US4] Implement multi-select checkboxes on category table with SVG redraw callbacks in `src/content.js`
- [x] T019 [US4] Build Top 10 Best Sellers display layout in `src/content.js`
- [x] T020 [US4] Re-run Safari extension converter command in shell

---

## Phase 7: User Story 5 - Multi-Language Internationalization (Priority: P2)

**Goal**: Support localization (i18n) for English and Chinese, translating all panels, overlay scorecard, tables, and popups.

**Independent Test**: Load the extension, change browser language to Chinese/English, and verify all texts translate accordingly.

### Implementation for User Story 5

- [x] T021 [US5] Create standard _locales definitions for en and zh_CN in src/_locales/
- [x] T022 [US5] Implement chrome.i18n string replacement pipeline in src/manifest.json and popup pages
- [x] T023 [US5] Update content.js overlay UI to retrieve dynamic localized strings via chrome.i18n.getMessage
- [x] T024 [US5] Re-run Safari extension converter command in shell

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: General styling Polish, edge case safety checks, and Safari compatibility conversions

- [x] T014 Polish CSS overlay scorecard and modal visual styling using glassmorphism in `src/popup.css`
- [x] T015 Perform Safari browser converter conversion command `xcrun safari-web-extension-converter` in command shell

---
## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - starts immediately.
- **Foundational (Phase 2)**: Depends on Setup completion. Blocks UI injections.
- **User Stories (Phases 3-7)**: All depend on Foundational completion. 
  - US1 can start immediately after Phase 2.
  - US2/US4/US5 can run in parallel.
- **Polish (Phase 8)**: Depends on completion of all user story implementations.
