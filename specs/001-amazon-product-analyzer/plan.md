# Implementation Plan: Amazon Product Selection Analyzer

**Branch**: `001-amazon-product-analyzer` | **Date**: 2026-05-29 | **Spec**: [spec.md](file:///Users/snow/Documents/GitHub/myFastM/specs/001-amazon-product-analyzer/spec.md)

**Input**: Feature specification from `/specs/001-amazon-product-analyzer/spec.md`

## Summary

Build a client-side Chrome/Safari WebExtension to scrape listing data directly from active Amazon tabs (listing detail, search lists, and Best Sellers lists) and perform quick product selection analytics using local static BSR-to-sales estimation curves. Includes an interactive SVG-based sales/price charting engine in the Category Analyzer overlay that dynamically scales and redraws as products are selected/deselected in the comparison list. All watchlisted items are persisted locally in `chrome.storage.local`.

## Technical Context

**Language/Version**: JavaScript (ES6) / CSS3 / HTML5

**Primary Dependencies**: None (Vanilla JS to prevent extension footprint overhead and cross-browser incompatibilities)

**Storage**: `chrome.storage.local` (Local extension storage sandboxed in browser)

**Testing**: Jest (Unit testing background estimators), Mocked Chrome Extension API for integration tests

**Target Platform**: Google Chrome (Manifest V3) only. Safari support is suspended/not maintained by default to focus development on Chrome.

**Project Type**: Google Chrome Extension (Manifest V3)

**Performance Goals**: Data extraction on listing pages < 1.0 second; Overlay rendering < 1.5 seconds from DOM load; Search listing scanner processing < 4.0 seconds for 50 listings.

**Constraints**: Local computation only (No external server APIs or proxy lists utilized, 100% cost-free).

**Scale/Scope**: Focuses exclusively on Amazon US (`amazon.com`) and Amazon UK (`amazon.co.uk`) marketplaces for v1.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Library-First**: Does this feature start as a standalone library/module (e.g., modular scraping logic)?
- [x] **Interface & Message Passing**: Are communication channels decoupled (e.g. port messaging) and using structured JSON?
- [x] **Test-First**: Are test plans/cases written alongside or before logic code, ensuring independent story testing?
- [x] **Integration Testing**: Are page parsing DOMs and data extractions validated via automated integration tests?
- [x] **Simplicity & Low-Cost (YAGNI)**: Are external servers, proxies, or paid APIs avoided to control technical and hosting costs?

## Project Structure

### Documentation (this feature)

```text
specs/001-amazon-product-analyzer/
├── plan.md              # This file
├── research.md          # Browser extension cross-platform research
├── data-model.md        # Storage structure definitions
├── quickstart.md        # Extension installation & conversion guide
├── contracts/
│   └── message-protocol.md # Content script <=> background communication contract
└── tasks.md             # Implementation tasks (to be generated)
```

### Source Code (repository root)

```text
src/
├── manifest.json        # Extension Manifest V3 configuration
├── background.js        # Background worker for local storage & calculation API
├── content.js           # Content Script injecting DOM parser & floating ScoreCard
├── popup.html           # Dropdown watchlist popup structure
├── popup.js             # Controller for watchlist popup
├── popup.css            # Styling for watchlist popup
└── icons/               # Brand assets (16x16, 48x48, 128x128 png)
```

**Structure Decision**: Browser WebExtension layout with separate entry scripts (`content.js`, `background.js`) to adhere to Manifest V3 standard format.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

*(No violations exist. The implementation strictly adheres to local sandbox rules and low-cost principles.)*
