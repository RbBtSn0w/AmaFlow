# Research: Amazon Product Selection Analyzer

**Purpose**: Research and document technical decisions for browser extension architecture and offline sales estimation.

## Decision 1: Cross-Browser Capability (Chrome & Safari)

- **Decision**: Build the extension using the standard W3C WebExtensions API framework, compliant with Manifest V3.
- **Rationale**: 
  - Standard W3C WebExtensions APIs (like `chrome.runtime`, `chrome.storage.local`, and `chrome.tabs`) are natively supported by Google Chrome, MS Edge, and Apple Safari (Safari 15.4+). 
  - Writing the code in standard JavaScript without vendor-specific frameworks allows one codebase to serve both Chrome and Safari.
  - For Safari packaging and distribution on the Mac App Store, we can run Apple's command-line tool `xcrun safari-web-extension-converter` directly on macOS to wrap the WebExtension files into an Xcode project with minimal overhead.
- **Alternatives Considered**: 
  - **Standalone Native macOS App + Safari App Extension**: (Rejected). High development cost, requires Swift/Objective-C knowledge, and prevents reuse of Chrome extension logic.
  - **Paid Third-Party Hybrid Frameworks**: (Rejected). Adds unnecessary complexity and costs.

## Decision 2: Cost-Free Sales Estimation (BSR to Sales Correlation)

- **Decision**: Implement a local category-aware BSR-to-Sales correlation model.
- **Rationale**: 
  - Amazon Best Sellers Rank (BSR) values correlate logarithmically to monthly sales velocity, but the curve varies drastically by category (e.g., Toy & Games BSR 10,000 represents higher sales volume than Industrial & Scientific BSR 10,000).
  - The tool will bundle a static BSR-to-Sales mapping lookup table for major Amazon categories (Home & Kitchen, Beauty, Toys, Electronics, Clothing, etc.). 
  - Polynomial interpolation will be calculated locally inside the content or background script to output estimated sales instantaneously and offline.
- **Alternatives Considered**:
  - **Keepa API / Rainforest API**: (Rejected). Requires paid subscription key, which violates the user's "low-cost investment" constraint.
  - **Server-side scrapers for sales metrics**: (Rejected). High proxy cost and easily blocked by Amazon's security endpoints.
