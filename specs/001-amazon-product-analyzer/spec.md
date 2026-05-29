# Feature Specification: Amazon Product Selection Analyzer

**Feature Branch**: `001-amazon-product-analyzer`

**Created**: 2026-05-29

**Status**: Ready

**Input**: User description: " need a cross-border e-commerce tool to help with product selection, for example, scraping data directly from Amazon and analyzing conclusions. Should we choose a browser extension style, or something else? As a non-technical cross-border seller, I don't know much about the technology and need a complete solution."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Single Product Quick Analysis on Amazon Listing (Priority: P1)

A seller browsing a specific product on Amazon wants to instantly evaluate its viability for sourcing without manually copy-pasting numbers into spreadsheets.

**Why this priority**: It is the core loop of product selection. Users must be able to evaluate individual items easily and directly.

**Independent Test**: Install the helper, visit an Amazon product detail page (e.g., `amazon.com/dp/B08N5WRWNW`), and check if the helper displays a "Selection ScoreCard" overlay with Price, estimated monthly sales, review count, and a final scoring index.

**Acceptance Scenarios**:

1. **Given** a standard Amazon product page is loaded, **When** the seller triggers the analyzer, **Then** the system MUST extract ASIN, Title, Category, BSR, Price, Reviews count, and Star Rating within 2 seconds.
2. **Given** the extracted data, **When** the seller views the overlay panel, **Then** the system MUST show a "Recommended/Caution" status based on profit margin estimators and BSR trends.

---

### User Story 2 - Batch Scan on Search Results Page (Priority: P2)

A seller searching for a keyword (e.g., "wireless charger") wants to see a comparison matrix of all search results on the page to identify low-competition niches.

**Why this priority**: Speeds up niche selection by highlighting search trends and average competition.

**Independent Test**: Perform a search on Amazon, click "Analyze Niche" in the tool panel, and verify that a data table is generated listing all products on the first page, sorting them by average rating, revenue potential, and seller count.

**Acceptance Scenarios**:

1. **Given** the seller is on an Amazon search result page, **When** they click "Niche Analysis", **Then** the system MUST scan up to 50 listings on the current page, showing average price, average reviews, and niche competitiveness index.
2. **Given** the niche data table, **When** the seller applies a filter (e.g., "reviews < 100"), **Then** the table MUST filter out high-competition listings in real time.

---

### User Story 3 - Selection Workspace & Export (Priority: P3)

A seller wants to save interesting products found during research and export them to a spreadsheet for deeper suppliers comparison.

**Why this priority**: Bridges the gap between initial discovery and vendor sourcing.

**Independent Test**: Mark 3 products as "Watchlisted" during listing scan, open the workspace panel, verify the 3 products are listed, and click "Export to CSV" to download a clean spreadsheet containing all selected data.

**Acceptance Scenarios**:

1. **Given** a list of analyzed products, **When** the seller clicks "Add to Workspace", **Then** the system MUST persist these items locally.
2. **Given** the workspace view, **When** the seller clicks "Export CSV", **Then** a browser download of a CSV file containing columns for ASIN, Title, Category, Price, BSR, and Est. Sales MUST be initiated.

---

### User Story 4 - Category Trends Analysis & Dynamic Visual Comparison (Priority: P2)

A seller browsing Amazon Best Sellers or category list pages wants to visually identify sales trends and contrast the performance of top items instantly.

**Why this priority**: Directly serves the user's need to understand niche dynamics, identifying market capture thresholds before committing capital.

**Independent Test**: Load the extension, navigate to an Amazon Best Sellers page (e.g. `amazon.com/Best-Sellers/zgbs`), click the "Scan Category" button, verify the Top 10 list compiles, select/deselect specific items in the list, and check if the SVG line graph dynamically recalculates the trend lines for price and sales.

**Acceptance Scenarios**:

1. **Given** the seller is on a Best Sellers listing page, **When** they trigger "Scan Category", **Then** the system MUST extract the ranks (#1-#10) and titles, and query the background estimator to compile an SVG trend chart.
2. **Given** the visual trend chart, **When** the seller unchecks #2 and #5 products in the comparison list, **Then** the SVG trend path MUST redraw in real time, excluding those items from the sales/price curves.

### Edge Cases

- **Page Structure Mismatch**: When Amazon updates its DOM layout and a field (like Price) cannot be located, the system MUST show an "unsupported page version" notice instead of breaking the entire UI.
- **CAPTCHA / Bot Detection**: When Amazon redirects to a CAPTCHA page, the tool MUST pause extraction and instruct the user to complete verification in their browser.
- **Missing Data Fields**: If a product has no BSR (Best Sellers Rank) or no Ratings yet, the scoring logic MUST substitute a null marker and warn that sales estimation is unavailable.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST scrape Amazon product details (ASIN, Title, Category, BSR, Price, Star Rating, Reviews Count) from active browser tabs without requiring API tokens from Amazon.
- **FR-002**: The system MUST support parsing both US (`amazon.com`) and UK (`amazon.co.uk`) marketplace domains.
- **FR-003**: The system MUST compute an estimated monthly sales volume based on the product's BSR (Best Sellers Rank) and category tables.
- **FR-004**: The system MUST render an embedded overlay UI on the product detail page, displaying critical selection indicators (e.g. margin score, review velocity).
- **FR-005**: The system MUST run entirely as a client-side Chrome Extension (Manifest V3), persisting tracked items locally via the chrome.storage API and allowing direct CSV export without requiring central backend servers.
- **FR-006**: The system MUST estimate monthly sales volume locally using mathematical BSR-to-sales correlation curves tailored per major category, avoiding third-party paid database dependencies.
- **FR-007**: The system MUST handle CAPTCHA page blocks gracefully by notifying the user to complete the verification before continuing analysis.
- **FR-008**: The system MUST detect Amazon Best Sellers and Category lists and scrape top-ranked product details including ranks, titles, prices, ratings, and reviews.
- **FR-009**: The system MUST render an interactive SVG-based trend chart inside the Category Analyzer overlay that dynamically scales and redraws whenever products are toggled in the checklist.
- **FR-010**: The system MUST support standard multi-language internationalization (i18n) for both English (en) and Simplified Chinese (zh_CN), translating all visual elements, overlay scorecards, search niche tables, and CSV headers based on browser locale.

### Success Criteria

- **SC-001**: 95% of active listing pages can be parsed and analysed within 2 seconds.
- **SC-002**: The data extraction success rate on non-CAPTCHA pages must be above 98%.
- **SC-003**: Average niche analysis compilation time for a search page containing 48 listings must be under 5 seconds.
- **SC-004**: The generated CSV export must be fully compatible with Microsoft Excel and Google Sheets without encoding glitches.

## Assumptions

- The primary user persona is a non-technical Amazon merchant looking for private label or arbitrage opportunities.
- Scraping will rely on client-side DOM parsing to bypass IP blocks that affect server-side crawlers.
- Standard Amazon page layouts (US and UK) are target platforms; changes to Amazon's frontend DOM might require patch updates.
- No external paid database API (like Keepa API) is integrated in the core version unless the user selects it.
