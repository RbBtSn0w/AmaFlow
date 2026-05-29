# Message Protocol Contract: Amazon Product Selection Analyzer

**Purpose**: Define standard request/response messaging schemas exchanged between Content Scripts (injected into Amazon DOM) and the Background Service Worker.

## Protocol Formats

All extension messages MUST follow this envelope structure:

```typescript
interface ExtensionMessage<T = any> {
  action: string;
  payload: T;
}
```

---

### 1. Sales Estimation Request

**Sender**: Content Script  
**Receiver**: Background Service Worker  
**Trigger**: When a listing page is loaded and BSR needs to be converted into estimated monthly sales.

#### Request Payload (`action: "CALCULATE_SALES"`)

```json
{
  "action": "CALCULATE_SALES",
  "payload": {
    "category": "Home & Kitchen",
    "bsr": 12500
  }
}
```

#### Response Payload

```json
{
  "success": true,
  "data": {
    "estSales": 450,
    "confidence": "Medium"
  }
}
```

---

### 2. Add To Watchlist Request

**Sender**: Content Script (Overlay UI)  
**Receiver**: Background Service Worker  
**Trigger**: When user clicks the "Watchlist" button in the injected scorecard.

#### Request Payload (`action: "WATCHLIST_ADD"`)

```json
{
  "action": "WATCHLIST_ADD",
  "payload": {
    "asin": "B08N5WRWNW",
    "title": "Example Wireless Earbuds",
    "category": "Electronics",
    "bsr": 450,
    "price": 29.99,
    "rating": 4.5,
    "reviewsCount": 182,
    "estSales": 1200
  }
}
```

#### Response Payload

```json
{
  "success": true,
  "message": "Product successfully added to watchlist."
}
```

---

### 3. CSV Export Request

**Sender**: Extension Popup Page  
**Receiver**: Background Service Worker  
**Trigger**: When user clicks "Export CSV" inside the browser action menu.

#### Request Payload (`action: "EXPORT_WATCHLIST"`)

```json
{
  "action": "EXPORT_WATCHLIST",
  "payload": null
}
```

#### Response Payload

```json
{
  "success": true,
  "data": {
    "csvString": "ASIN,Title,Category,Price,BSR,Est. Sales\nB08N5WRWNW,\"Example Wireless Earbuds\",Electronics,29.99,450,1200\n",
    "fileName": "myFastM-export-20260529.csv"
  }
}
```
