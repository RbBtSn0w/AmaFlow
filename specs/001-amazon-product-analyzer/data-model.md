# Data Model: Amazon Product Selection Analyzer

**Purpose**: Define the structure of data processed, persisted, and exported by the Chrome/Safari extension.

## Entities

### 1. ProductRecord

Represents a single scraped Amazon product listing page.

| Field | Type | Description | Validation |
| :--- | :--- | :--- | :--- |
| `asin` | String | 10-character Amazon Standard Identification Number | Regex: `^[A-Z0-9]{10}$` |
| `title` | String | Title of the product listing | Non-empty |
| `category` | String | Primary high-level category (e.g., "Home & Kitchen") | Non-empty |
| `bsr` | Integer | Best Sellers Rank (BSR) in the primary category | `>= 0` (or `null` if unranked) |
| `price` | Number | Active purchase price in USD or GBP | `>= 0.00` |
| `rating` | Number | Star rating from 1.0 to 5.0 | `1.0 <= rating <= 5.0` |
| `reviewsCount`| Integer | Total review count of the listing | `>= 0` |
| `estSales` | Integer | Calculated estimated monthly sales volume | `>= 0` |
| `scrapedAt` | String | ISO Timestamp of extraction | YYYY-MM-DDTHH:mm:ssZ |

### 2. NicheAnalysis

Represents the aggregated analysis from an Amazon search results page.

| Field | Type | Description |
| :--- | :--- | :--- |
| `keyword` | String | The search query analyzed |
| `timestamp` | String | ISO Timestamp of the batch scan |
| `avgPrice` | Number | Mathematical average of scanned listing prices |
| `avgReviews` | Number | Mathematical average of scanned listing review counts |
| `competitiveness`| String | Niche rating: `"Low"`, `"Medium"`, or `"High"` based on review distributions |
| `itemsCount` | Integer | Total listings parsed on the current page |
| `listings` | Array | Collection of summarized `ProductRecord` objects |

### 3. WatchlistItem

Represents a product item saved by the user in the extension workspace storage.

| Field | Type | Description |
| :--- | :--- | :--- |
| `asin` | String | Unique 10-character key mapping to a saved product |
| `addedAt` | String | ISO Timestamp of when the product was watchlisted |
| `notes` | String | Optional user-written note about supplier links or pricing |

## Storage Schema (chrome.storage.local)

Data is saved locally under the following storage keys:

```json
{
  "watchlist": {
    "B08N5WRWNW": {
      "asin": "B08N5WRWNW",
      "addedAt": "2026-05-29T05:37:00Z",
      "notes": "Good profit margin, need supplier check."
    }
  },
  "settings": {
    "targetMarketplace": "us",
    "defaultMarginRequirement": 0.30
  }
}
```
