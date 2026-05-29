// content.js - Scraper & UI Engine for myFastM Product Selection Assistant

// Inject UI Styles into the page
const style = document.createElement("style");
style.textContent = `
  /* Premium Glassmorphism & Modern UI Styles */
  .myfastm-card {
    position: fixed;
    top: 100px;
    right: 20px;
    width: 320px;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    color: #f8fafc;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 20px;
    z-index: 999999;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .myfastm-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 12px;
    margin-bottom: 15px;
  }
  .myfastm-brand {
    font-weight: 700;
    font-size: 16px;
    background: linear-gradient(135deg, #38bdf8, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .myfastm-close {
    background: none;
    border: none;
    color: #94a3b8;
    font-size: 18px;
    cursor: pointer;
    padding: 2px;
  }
  .myfastm-close:hover {
    color: #f8fafc;
  }
  .myfastm-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 14px;
  }
  .myfastm-label {
    color: #94a3b8;
  }
  .myfastm-value {
    font-weight: 600;
    color: #f1f5f9;
  }
  .myfastm-score-box {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 12px;
    padding: 12px;
    margin-top: 15px;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .myfastm-score-title {
    font-size: 11px;
    color: #94a3b8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .myfastm-score-val {
    font-weight: 800;
    margin: 5px 0;
  }
  .myfastm-btn {
    display: block;
    width: 100%;
    background: linear-gradient(135deg, #0284c7, #0369a1);
    color: #ffffff;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-weight: 600;
    font-size: 14px;
    cursor: pointer;
    margin-top: 15px;
    transition: all 0.2s;
  }
  .myfastm-btn:hover {
    background: linear-gradient(135deg, #0369a1, #075985);
    transform: translateY(-1px);
  }
  .myfastm-btn-secondary {
    background: rgba(255, 255, 255, 0.1);
    color: #f1f5f9;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  .myfastm-btn-secondary:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  /* Floating trigger buttons */
  .myfastm-scan-btn {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background: linear-gradient(135deg, #f97316, #ea580c);
    color: #ffffff;
    border: none;
    border-radius: 50px;
    padding: 12px 24px;
    font-weight: 700;
    font-size: 15px;
    box-shadow: 0 5px 20px rgba(234, 88, 12, 0.4);
    cursor: pointer;
    z-index: 999998;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }
  .myfastm-scan-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(234, 88, 12, 0.5);
  }
  
  /* Modal Overlay Table */
  .myfastm-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 90%;
    max-width: 960px;
    max-height: 85vh;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
    z-index: 1000000;
    color: #f8fafc;
    font-family: system-ui, -apple-system, sans-serif;
    padding: 24px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .myfastm-modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding-bottom: 16px;
    margin-bottom: 16px;
  }
  .myfastm-modal-title {
    font-size: 20px;
    font-weight: 800;
    background: linear-gradient(135deg, #38bdf8, #f97316);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .myfastm-table-wrap {
    overflow-y: auto;
    flex-grow: 1;
    margin-bottom: 16px;
  }
  .myfastm-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    text-align: left;
  }
  .myfastm-table th {
    background: rgba(255, 255, 255, 0.05);
    padding: 12px;
    font-weight: 700;
    color: #94a3b8;
    position: sticky;
    top: 0;
  }
  .myfastm-table td {
    padding: 12px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }
  .myfastm-table tr:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  .myfastm-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.6);
    z-index: 999999;
  }
  .myfastm-filter-bar {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    background: rgba(255, 255, 255, 0.02);
    padding: 10px;
    border-radius: 8px;
    align-items: center;
  }
  .myfastm-input {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 6px;
    padding: 6px 12px;
    color: #ffffff;
    font-size: 13px;
  }
  
  /* Toast Notification system */
  .myfastm-toast {
    position: fixed;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(249, 115, 22, 0.4);
    border-radius: 12px;
    padding: 14px 24px;
    color: #f8fafc;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1);
    z-index: 10000005;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 90%;
    text-align: center;
  }
  .myfastm-toast.show {
    top: 30px;
  }
  .myfastm-toast-icon {
    font-size: 16px;
  }
  .myfastm-copyable {
    cursor: pointer;
    user-select: text !important;
    -webkit-user-select: text !important;
  }
  .myfastm-copyable:hover {
    color: #38bdf8 !important;
    text-decoration: underline;
  }
  .myfastm-th-sortable {
    cursor: pointer;
    user-select: none;
  }
  .myfastm-th-sortable:hover {
    color: #f8fafc !important;
    background: rgba(255, 255, 255, 0.08) !important;
  }
`;
document.head.appendChild(style);

// Safe wrapper for chrome.i18n.getMessage to prevent crashes if context is invalidated
function getMsg(key, fallback = "") {
  if (typeof chrome !== "undefined" && chrome.i18n && chrome.i18n.getMessage) {
    try {
      return chrome.i18n.getMessage(key) || fallback;
    } catch (e) {
      console.warn("myFastM: i18n getMessage failed", e);
    }
  }
  return fallback;
}

// Custom Glassmorphism Toast Notification to replace browser alert()
function showNotification(message, type = "warning") {
  // Avoid duplicate toast creation if the exact same warning is already visible
  const existing = Array.from(document.querySelectorAll(".myfastm-toast"));
  if (existing.some(t => t.textContent.includes(message))) return;

  const toast = document.createElement("div");
  toast.className = "myfastm-toast";
  
  if (type === "error") {
    toast.style.borderColor = "rgba(239, 68, 68, 0.4)";
    toast.innerHTML = `<span class="myfastm-toast-icon">❌</span> <span>${message}</span>`;
  } else if (type === "success") {
    toast.style.borderColor = "rgba(16, 185, 129, 0.4)";
    toast.innerHTML = `<span class="myfastm-toast-icon">✅</span> <span>${message}</span>`;
  } else {
    toast.style.borderColor = "rgba(249, 115, 22, 0.4)";
    toast.innerHTML = `<span class="myfastm-toast-icon">⚠️</span> <span>${message}</span>`;
  }
  
  document.body.appendChild(toast);
  
  // Slide down entry transition
  setTimeout(() => {
    toast.classList.add("show");
  }, 50);
  
  // Fade out auto-removal
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => {
      toast.remove();
    }, 450);
  }, 4000);
}

// Safe wrapper for chrome.runtime.sendMessage to prevent crashes if context is invalidated
function safeSendMessage(message, callback) {
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
    try {
      chrome.runtime.sendMessage(message, callback);
      return;
    } catch (e) {
      console.warn("myFastM: sendMessage failed, context likely invalidated", e);
    }
  }
  console.warn("myFastM: Extension context is invalid. Please refresh the page.");
  showNotification(getMsg("errorContextInvalidated", "The selection assistant has been updated or reloaded. Please refresh the current page to continue."), "error");
  if (callback) {
    callback({ success: false, error: "Context invalidated" });
  }
}


// ==========================================
// T005: Scraper Core Functions (Amazon Details Page)
// ==========================================

function getASIN() {
  const asinEl = document.querySelector("#ASIN") || document.querySelector("input[name='idxASIN']");
  if (asinEl && asinEl.value) return asinEl.value.trim();
  
  const href = window.location.href;
  const match = href.match(/\/([A-Z0-9]{10})(?:[/?]|$)/i);
  return match ? match[1].toUpperCase() : null;
}

function getProductTitle() {
  const titleEl = document.querySelector("#productTitle") || 
                  document.querySelector("h1[id='title']") ||
                  document.querySelector(".qa-title-text");
  return titleEl ? titleEl.textContent.trim() : "Unknown Product";
}

function getPrice() {
  const selectors = [
    ".a-price .a-offscreen",
    "#price_inside_buybox",
    "#priceblock_ourprice",
    "#priceblock_dealprice",
    ".apexPriceToPay .a-offscreen"
  ];
  for (const s of selectors) {
    const el = document.querySelector(s);
    if (el) {
      const match = el.textContent.match(/[\d.,]+/);
      if (match) return parseFloat(match[0].replace(/,/g, ""));
    }
  }
  return null;
}

function getBSRAndCategory() {
  const detailBullets = document.querySelector("#detailBulletsWrapper_feature_div");
  if (detailBullets) {
    const text = detailBullets.textContent;
    const match = text.match(/#([\d,]+)\s+in\s+([^\n(]+)/);
    if (match) {
      return {
        bsr: parseInt(match[1].replace(/,/g, "")),
        category: match[2].trim()
      };
    }
  }

  const prodDetails = document.querySelector("#prodDetails");
  if (prodDetails) {
    const text = prodDetails.textContent;
    const match = text.match(/#([\d,]+)\s+in\s+([^\n(]+)/);
    if (match) {
      return {
        bsr: parseInt(match[1].replace(/,/g, "")),
        category: match[2].trim()
      };
    }
  }

  return { bsr: null, category: "Other" };
}

function getReviewsCount() {
  const el = document.querySelector("#acrCustomerReviewText") ||
             document.querySelector("a[href*='#customerReviews'] span") ||
             document.querySelector(".qa-reviews-count");
  if (el) {
    const match = el.textContent.match(/[\d,]+/);
    return match ? parseInt(match[0].replace(/,/g, "")) : 0;
  }
  return 0;
}

function getRating() {
  const el = document.querySelector("#acrPopover") || 
             document.querySelector("i[class*='a-icon-star'] span.a-icon-alt") ||
             document.querySelector(".a-icon-alt");
  if (el) {
    const text = el.title || el.textContent || "";
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }
  return 0;
}

// ==========================================
// T006, T007: Overlay rendering for Single Product page
// ==========================================

function initSingleProductScorecard() {
  const asin = getASIN();
  if (!asin) return;
  
  if (window.location.href.includes("/zgbs/") || window.location.href.includes("/bestsellers/")) return;

  const title = getProductTitle();
  const price = getPrice();
  const rating = getRating();
  const reviewsCount = getReviewsCount();
  const { bsr, category } = getBSRAndCategory();
  
  const card = document.createElement("div");
  card.className = "myfastm-card";
  card.innerHTML = `
    <div class="myfastm-header">
      <span class="myfastm-brand">${getMsg("extName", "myFastM Assistant")}</span>
      <button class="myfastm-close" id="myfastmCloseBtn">&times;</button>
    </div>
    <div class="myfastm-row">
      <span class="myfastm-label">${getMsg("asin", "ASIN")}</span>
      <span class="myfastm-value">${asin}</span>
    </div>
    <div class="myfastm-row">
      <span class="myfastm-label">${getMsg("price", "Price")}</span>
      <span class="myfastm-value">${price ? "$" + price.toFixed(2) : "N/A"}</span>
    </div>
    <div class="myfastm-row">
      <span class="myfastm-label">${getMsg("rating", "Rating")}</span>
      <span class="myfastm-value">${rating ? rating + " ⭐" : "N/A"}</span>
    </div>
    <div class="myfastm-row">
      <span class="myfastm-label">${getMsg("reviews", "Reviews")}</span>
      <span class="myfastm-value">${reviewsCount.toLocaleString()}</span>
    </div>
    <div class="myfastm-row">
      <span class="myfastm-label">${getMsg("bsrRank", "BSR Rank")}</span>
      <span class="myfastm-value">${bsr ? "#" + bsr.toLocaleString() : "N/A"}</span>
    </div>
    <div class="myfastm-row">
      <span class="myfastm-label">${getMsg("category", "Category")}</span>
      <span class="myfastm-value" style="max-width: 150px; text-align: right; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;">${category}</span>
    </div>
    
    <div class="myfastm-score-box" style="display: flex; gap: 10px; justify-content: space-around; padding: 12px 6px;">
      <div>
        <div class="myfastm-score-title">${getMsg("estMonthlySales", "Est. Monthly")}</div>
        <div class="myfastm-score-val" id="myfastmEstSales" style="font-size: 20px; color: #38bdf8;">Loading...</div>
      </div>
      <div style="border-left: 1px solid rgba(255,255,255,0.1); padding-left: 10px;">
        <div class="myfastm-score-title">${getMsg("estWeeklySales", "Est. Weekly")}</div>
        <div class="myfastm-score-val" id="myfastmEstWeeklySales" style="font-size: 20px; color: #f97316;">Loading...</div>
      </div>
    </div>
    
    <button class="myfastm-btn" id="myfastmWatchBtn">${getMsg("addToWatchlist", "Add to Watchlist")}</button>
  `;
  
  document.body.appendChild(card);
  
  document.getElementById("myfastmCloseBtn").addEventListener("click", () => {
    card.remove();
  });
  
  safeSendMessage(
    { action: "CALCULATE_SALES", payload: { category, bsr } },
    (response) => {
      const salesValEl = document.getElementById("myfastmEstSales");
      const weeklySalesValEl = document.getElementById("myfastmEstWeeklySales");
      
      if (response && response.success) {
        const { estSales, estWeeklySales } = response.data;
        salesValEl.textContent = bsr ? estSales.toLocaleString() : "N/A";
        weeklySalesValEl.textContent = bsr ? estWeeklySales.toLocaleString() : "N/A";
        
        document.getElementById("myfastmWatchBtn").addEventListener("click", function() {
          const item = { asin, title, category, bsr, price, rating, reviewsCount, estSales, estWeeklySales };
          safeSendMessage({ action: "WATCHLIST_ADD", payload: item }, (res) => {
            if (res && res.success) {
              this.textContent = getMsg("saved", "Saved ✓");
              this.style.background = "linear-gradient(135deg, #10b981, #059669)";
              this.disabled = true;
            }
          });
        });
      } else {
        salesValEl.textContent = "Error";
        weeklySalesValEl.textContent = "Error";
      }
    }
  );
}

// ==========================================
// T008, T009, T010: Search page Niche bulk scanning (Monthly / Weekly)
// ==========================================

function initSearchPageScanner() {
  const isSearchPage = window.location.href.includes("/s?") || document.querySelector(".s-result-list");
  if (!isSearchPage || window.location.href.includes("/zgbs/") || window.location.href.includes("/bestsellers/")) return;
  
  const scanBtn = document.createElement("button");
  scanBtn.className = "myfastm-scan-btn";
  scanBtn.innerHTML = `
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
    </svg>
    ${getMsg("scanNiche", "Scan Niche")}
  `;
  document.body.appendChild(scanBtn);
  
  scanBtn.addEventListener("click", () => {
    const productCards = document.querySelectorAll(".s-result-item[data-asin]");
    const scannedItems = [];
    
    productCards.forEach((card, index) => {
      const asin = card.getAttribute("data-asin");
      if (!asin) return;
      
      const titleEl = card.querySelector("h2 a span") || 
                      card.querySelector(".a-size-medium.a-color-base.a-text-normal") || 
                      card.querySelector(".a-size-base-plus.a-color-base.a-text-normal") ||
                      card.querySelector("h2 a") || 
                      card.querySelector("h2");
      const title = titleEl ? titleEl.textContent.trim() : "Unknown Title";
      
      const priceWhole = card.querySelector(".a-price-whole");
      const priceFraction = card.querySelector(".a-price-fraction");
      let price = null;
      if (priceWhole) {
        price = parseFloat(priceWhole.textContent.replace(/,/g, "") + "." + (priceFraction ? priceFraction.textContent : "00"));
      }
      
      const reviewsEl = card.querySelector("a[href*='#customerReviews'] span.a-size-base") || 
                        card.querySelector("a[href*='#customerReviews'] span") ||
                        card.querySelector("a[href*='customerReviews'] span") ||
                        card.querySelector("a[href*='/product-reviews/'] span") ||
                        card.querySelector(".a-size-small a span.a-size-base") ||
                        card.querySelector(".s-item-have-n-reviews");
      let reviewsCount = 0;
      if (reviewsEl) {
        const match = reviewsEl.textContent.match(/[\d,]+/);
        reviewsCount = match ? parseInt(match[0].replace(/,/g, "")) : 0;
      }
      
      const ratingEl = card.querySelector("i.a-icon-star-small span.a-icon-alt") || 
                       card.querySelector("i.a-icon-star span.a-icon-alt") ||
                       card.querySelector("i[class*='a-icon-star'] span.a-icon-alt") ||
                       card.querySelector("i[class*='a-icon-star']") ||
                       card.querySelector("span.a-icon-alt");
      let rating = 0;
      if (ratingEl) {
        const ratingText = ratingEl.textContent || ratingEl.getAttribute("aria-label") || "";
        const match = ratingText.match(/[\d.]+/);
        rating = match ? parseFloat(match[0]) : 0;
      }
      
      scannedItems.push({ rank: index + 1, asin, title, price, rating, reviewsCount });
    });
    
    if (scannedItems.length === 0) {
      showNotification(getMsg("errorNoSearchProducts", "No products detected. Wait for the page to load completely."), "warning");
      return;
    }
    
    const promises = scannedItems.map(item => {
      return new Promise((resolve) => {
        safeSendMessage(
          { action: "CALCULATE_SALES", payload: { category: "Search Listing", bsr: item.rank } },
          (response) => {
            if (response && response.success) {
              item.estSales = response.data.estSales;
              item.estWeeklySales = response.data.estWeeklySales;
            } else {
              item.estSales = 0;
              item.estWeeklySales = 0;
            }
            resolve();
          }
        );
      });
    });
    
    Promise.all(promises).then(() => {
      const validPrices = scannedItems.filter(i => i.price !== null).map(i => i.price);
      const avgPrice = validPrices.length > 0 ? (validPrices.reduce((a, b) => a + b, 0) / validPrices.length) : 0;
      const avgReviews = scannedItems.reduce((sum, i) => sum + i.reviewsCount, 0) / scannedItems.length;
      
      let competitiveness = "Low";
      if (avgReviews > 1000) competitiveness = "High";
      else if (avgReviews > 300) competitiveness = "Medium";
      
      renderNicheModal(scannedItems, avgPrice, avgReviews, competitiveness);
    });
  });
}

function updateNicheTable(items, sortField = 'rank', sortOrder = 'asc') {
  const tableBody = document.getElementById("nicheTableBody");
  if (!tableBody) return;

  // Clone and sort items
  const sortedItems = [...items].sort((a, b) => {
    let valA, valB;
    if (sortField === 'price') {
      valA = a.price === null ? (sortOrder === 'asc' ? 999999 : -999999) : a.price;
      valB = b.price === null ? (sortOrder === 'asc' ? 999999 : -999999) : b.price;
    } else if (sortField === 'sales') {
      valA = a.estSales || 0;
      valB = b.estSales || 0;
    } else if (sortField === 'rating') {
      valA = a.rating || 0;
      valB = b.rating || 0;
    } else if (sortField === 'reviews') {
      valA = a.reviewsCount || 0;
      valB = b.reviewsCount || 0;
    } else {
      valA = a.rank || 0;
      valB = b.rank || 0;
    }

    if (sortOrder === 'asc') {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });

  // Re-render HTML
  let html = "";
  sortedItems.forEach(item => {
    const ratingDisplay = item.rating ? `${item.rating} ⭐` : "N/A";
    const reviewsDisplay = item.reviewsCount ? item.reviewsCount.toLocaleString() : "0";
    
    html += `
      <tr class="myfastm-tr-item" data-reviews="${item.reviewsCount}">
        <td style="font-weight: 700;">${item.asin}</td>
        <td class="myfastm-copyable myfastm-niche-title" data-asin="${item.asin}" style="max-width: 250px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${getMsg("copiedSuccess") || "Click to Copy"}">${item.title}</td>
        <td>${item.price ? "$" + item.price.toFixed(2) : "N/A"}</td>
        <td>${ratingDisplay}</td>
        <td>${reviewsDisplay}</td>
        <td style="font-weight: 700; color: #38bdf8;">${item.estSales.toLocaleString()} / <span style="color:#f97316;">${item.estWeeklySales.toLocaleString()}</span></td>
        <td><button class="myfastm-btn myfastm-btn-secondary table-save-btn" data-asin="${item.asin}" style="margin: 0; padding: 4px 8px; font-size: 11px;">${getMsg("watch", "Watch")}</button></td>
      </tr>
    `;
  });
  tableBody.innerHTML = html;

  // Re-bind save event
  tableBody.querySelectorAll(".table-save-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const targetAsin = this.getAttribute("data-asin");
      const matched = items.find(i => i.asin === targetAsin);
      if (matched) {
        const itemPayload = {
          asin: matched.asin,
          title: matched.title,
          category: "Search Page Scraped",
          bsr: matched.rank,
          price: matched.price,
          rating: matched.rating,
          reviewsCount: matched.reviewsCount,
          estSales: matched.estSales,
          estWeeklySales: matched.estWeeklySales
        };
        safeSendMessage({ action: "WATCHLIST_ADD", payload: itemPayload }, (res) => {
          if (res && res.success) {
            this.textContent = getMsg("saved", "Saved ✓");
            this.style.background = "#10b981";
            this.disabled = true;
          }
        });
      }
    });
  });

  // Re-bind title copy event
  tableBody.querySelectorAll(".myfastm-niche-title").forEach(td => {
    td.addEventListener("click", function() {
      const targetAsin = this.getAttribute("data-asin");
      const matched = items.find(i => i.asin === targetAsin);
      if (matched) {
        navigator.clipboard.writeText(matched.title).then(() => {
          showNotification(getMsg("copiedSuccess", "Title copied!"), "success");
        });
      }
    });
  });

  // Apply the review filters
  const filterInput = document.getElementById("reviewFilterInput");
  if (filterInput && filterInput.value) {
    const maxVal = parseInt(filterInput.value);
    const rows = tableBody.querySelectorAll(".myfastm-tr-item");
    rows.forEach(row => {
      const val = parseInt(row.getAttribute("data-reviews"));
      if (isNaN(maxVal) || val <= maxVal) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  }
}

function renderNicheModal(items, avgPrice, avgReviews, competitiveness) {
  const backdrop = document.createElement("div");
  backdrop.className = "myfastm-backdrop";
  
  const modal = document.createElement("div");
  modal.className = "myfastm-modal";
  
  modal.innerHTML = `
    <div class="myfastm-modal-header">
      <span class="myfastm-modal-title">${getMsg("nicheScanResults", "Niche Scan Results")}</span>
      <button class="myfastm-close" id="myfastmModalCloseBtn">&times;</button>
    </div>
    
    <div style="display: flex; gap: 30px; margin-bottom: 20px;">
      <div>
        <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">${getMsg("averagePrice", "Average Price")}</div>
        <div style="font-size: 20px; font-weight: 700; color: #38bdf8;">$${avgPrice.toFixed(2)}</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">${getMsg("averageReviews", "Average Reviews")}</div>
        <div style="font-size: 20px; font-weight: 700; color: #f97316;">${Math.round(avgReviews).toLocaleString()}</div>
      </div>
      <div>
        <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase;">${getMsg("competitiveness", "Competitiveness")}</div>
        <div style="font-size: 20px; font-weight: 700; color: ${competitiveness === "High" ? "#ef4444" : competitiveness === "Medium" ? "#f59e0b" : "#10b981"};">${competitiveness}</div>
      </div>
    </div>
    
    <div class="myfastm-filter-bar">
      <span style="font-size: 13px; color: #94a3b8;">${getMsg("filterReviews", "Filter Reviews:")}</span>
      <input type="number" class="myfastm-input" id="reviewFilterInput" placeholder="${getMsg("maxReviewsPlaceholder", "Max reviews")}">
    </div>
    
    <div class="myfastm-table-wrap">
      <table class="myfastm-table">
        <thead>
          <tr>
            <th>${getMsg("asin", "ASIN")}</th>
            <th>${getMsg("title", "Title")}</th>
            <th class="myfastm-th-sortable" id="nicheSortPrice" data-order="none">${getMsg("price", "Price")} <span class="sort-indicator"></span></th>
            <th class="myfastm-th-sortable" id="nicheSortRating" data-order="none">${getMsg("rating", "Rating")} <span class="sort-indicator"></span></th>
            <th class="myfastm-th-sortable" id="nicheSortReviews" data-order="none">${getMsg("reviews", "Reviews")} <span class="sort-indicator"></span></th>
            <th class="myfastm-th-sortable" id="nicheSortSales" data-order="none">${getMsg("estSalesMoWk", "Est. Sales (Mo / Wk)")} <span class="sort-indicator"></span></th>
            <th>${getMsg("action", "Action")}</th>
          </tr>
        </thead>
        <tbody id="nicheTableBody">
          <!-- Populated dynamically -->
        </tbody>
      </table>
    </div>
  `;
  
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);
  
  // Initial render
  updateNicheTable(items);
  
  const destroy = () => {
    backdrop.remove();
    modal.remove();
  };
  backdrop.addEventListener("click", destroy);
  document.getElementById("myfastmModalCloseBtn").addEventListener("click", destroy);
  
  const filterInput = document.getElementById("reviewFilterInput");
  filterInput.addEventListener("input", () => {
    const maxVal = parseInt(filterInput.value);
    const rows = document.querySelectorAll(".myfastm-tr-item");
    rows.forEach(row => {
      const val = parseInt(row.getAttribute("data-reviews"));
      if (isNaN(maxVal) || val <= maxVal) {
        row.style.display = "";
      } else {
        row.style.display = "none";
      }
    });
  });

  // Set up sorting logic
  let currentSort = { field: 'rank', order: 'asc' };
  const priceHeader = document.getElementById("nicheSortPrice");
  const salesHeader = document.getElementById("nicheSortSales");
  const ratingHeader = document.getElementById("nicheSortRating");
  const reviewsHeader = document.getElementById("nicheSortReviews");

  function resetHeaderIndicators() {
    priceHeader.querySelector(".sort-indicator").textContent = "";
    salesHeader.querySelector(".sort-indicator").textContent = "";
    ratingHeader.querySelector(".sort-indicator").textContent = "";
    reviewsHeader.querySelector(".sort-indicator").textContent = "";
  }

  priceHeader.addEventListener("click", () => {
    if (currentSort.field === 'price') {
      currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.field = 'price';
      currentSort.order = 'desc';
    }
    resetHeaderIndicators();
    priceHeader.querySelector(".sort-indicator").textContent = currentSort.order === 'asc' ? " ▲" : " ▼";
    updateNicheTable(items, 'price', currentSort.order);
  });

  salesHeader.addEventListener("click", () => {
    if (currentSort.field === 'sales') {
      currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.field = 'sales';
      currentSort.order = 'desc';
    }
    resetHeaderIndicators();
    salesHeader.querySelector(".sort-indicator").textContent = currentSort.order === 'asc' ? " ▲" : " ▼";
    updateNicheTable(items, 'sales', currentSort.order);
  });

  ratingHeader.addEventListener("click", () => {
    if (currentSort.field === 'rating') {
      currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.field = 'rating';
      currentSort.order = 'desc';
    }
    resetHeaderIndicators();
    ratingHeader.querySelector(".sort-indicator").textContent = currentSort.order === 'asc' ? " ▲" : " ▼";
    updateNicheTable(items, 'rating', currentSort.order);
  });

  reviewsHeader.addEventListener("click", () => {
    if (currentSort.field === 'reviews') {
      currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.field = 'reviews';
      currentSort.order = 'desc';
    }
    resetHeaderIndicators();
    reviewsHeader.querySelector(".sort-indicator").textContent = currentSort.order === 'asc' ? " ▲" : " ▼";
    updateNicheTable(items, 'reviews', currentSort.order);
  });
}

// ==========================================
// T016, T017, T018, T019: Category Trends Scraper & SVG Line Chart Engine (Monthly / Weekly)
// ==========================================

function generateSVGChart(items) {
  const activeItems = items.filter(item => item.checked);
  
  const width = 800;
  const height = 180;
  const paddingLeft = 70;
  const paddingRight = 40;
  const paddingTop = 25;
  const paddingBottom = 35;
  
  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  if (activeItems.length === 0) {
    return `
      <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="background: rgba(0,0,0,0.3); border-radius: 12px; border: 1px solid rgba(255,255,255,0.05);">
        <text x="50%" y="50%" fill="#94a3b8" font-size="14" dominant-baseline="middle" text-anchor="middle">No products selected for graph</text>
      </svg>
    `;
  }
  
  const salesVals = activeItems.map(i => i.estSales);
  const maxSales = Math.max(...salesVals, 100);
  const minSales = Math.min(...salesVals, 0);
  const salesRange = maxSales - minSales;
  
  const points = activeItems.map((item, index) => {
    const x = paddingLeft + (index / (activeItems.length - 1 || 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((item.estSales - minSales) / salesRange) * chartHeight;
    return { x, y, item };
  });
  
  let pathD = `M ${points[0].x} ${points[0].y}`;
  let areaD = `M ${points[0].x} ${points[0].y}`;
  
  for (let i = 1; i < points.length; i++) {
    pathD += ` L ${points[i].x} ${points[i].y}`;
    areaD += ` L ${points[i].x} ${points[i].y}`;
  }
  
  areaD += ` L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;
  
  let pointsHTML = "";
  points.forEach((pt) => {
    pointsHTML += `
      <g class="chart-point-node">
        <circle cx="${pt.x}" cy="${pt.y}" r="5" fill="#38bdf8" stroke="#0f172a" stroke-width="2" />
        <text x="${pt.x}" y="${pt.y - 10}" fill="#f1f5f9" font-size="10" font-weight="700" text-anchor="middle">${Math.round(pt.item.estSales).toLocaleString()} / <tspan fill="#f97316">${Math.round(pt.item.estWeeklySales).toLocaleString()}</tspan></text>
        <text x="${pt.x}" y="${paddingTop + chartHeight + 18}" fill="#94a3b8" font-size="9" text-anchor="middle">#${pt.item.rank}</text>
        <text x="${pt.x}" y="${paddingTop + chartHeight + 28}" fill="#64748b" font-size="8" text-anchor="middle">${pt.item.asin}</text>
      </g>
    `;
  });
  
  const svg = `
    <svg width="100%" height="${height}" viewBox="0 0 ${width} ${height}" style="background: rgba(30, 41, 59, 0.4); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08); box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);">
      <defs>
        <linearGradient id="chartAreaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.35"/>
          <stop offset="100%" stop-color="#38bdf8" stop-opacity="0"/>
        </linearGradient>
      </defs>
      
      <line x1="${paddingLeft}" y1="${paddingTop}" x2="${width - paddingRight}" y2="${paddingTop}" stroke="rgba(255,255,255,0.04)" />
      <line x1="${paddingLeft}" y1="${paddingTop + chartHeight / 2}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight / 2}" stroke="rgba(255,255,255,0.04)" stroke-dasharray="4" />
      <line x1="${paddingLeft}" y1="${paddingTop + chartHeight}" x2="${width - paddingRight}" y2="${paddingTop + chartHeight}" stroke="rgba(255,255,255,0.12)" />
      
      <path d="${areaD}" fill="url(#chartAreaGrad)" />
      
      <path d="${pathD}" fill="none" stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      
      <text x="15" y="${paddingTop + 4}" fill="#94a3b8" font-size="9" font-family="monospace">${Math.round(maxSales).toLocaleString()}</text>
      <text x="15" y="${paddingTop + chartHeight + 4}" fill="#94a3b8" font-size="9" font-family="monospace">${Math.round(minSales).toLocaleString()}</text>
      <text x="12" y="${paddingTop + chartHeight / 2}" fill="#64748b" font-size="9" transform="rotate(-90 12 ${paddingTop + chartHeight / 2})" text-anchor="middle" letter-spacing="0.05em">${getMsg("estSalesMoWk", "EST. SALES (MO/WK)")}</text>
      
      ${pointsHTML}
    </svg>
  `;
  return svg;
}

function scanCategoryProducts() {
  let productNodes = [];
  
  // Try modern grid container selector first (specific category pages)
  const gridRoot = document.getElementById("gridItemRoot");
  if (gridRoot) {
    productNodes = Array.from(gridRoot.querySelectorAll(".zg-grid-general-faceout, [role='listitem'], .a-cardui, div[data-asin], .zg-item"));
    if (productNodes.length === 0) {
      // Fallback to direct child elements of the grid container
      productNodes = Array.from(gridRoot.children).filter(child => child.tagName === "DIV" || child.tagName === "LI");
    }
  }
  
  // If no nodes found via grid root (e.g., we are on the Best Sellers landing page containing carousels),
  // query globally for product wrappers or data-asin containers.
  if (productNodes.length === 0) {
    productNodes = Array.from(document.querySelectorAll(
      ".zg-item-immersion, li.zg-item, .zg-grid-general-faceout, .zg-carousel-general-faceout, .a-carousel-card, .p13n-grid-content, div.a-cardui, [data-asin]"
    )).filter(node => {
      // Filter out non-product nodes with data-asin (like search forms, inputs, scripts)
      const tagName = node.tagName.toLowerCase();
      return tagName !== "script" && tagName !== "style" && tagName !== "input" && tagName !== "form";
    });
  }
  
  const items = [];
  const seenAsins = new Set();
  
  productNodes.forEach((node) => {
    if (items.length >= 10) return;
    
    // Support data-asin directly or link extraction
    let asin = node.getAttribute("data-asin");
    if (!asin || !/^[A-Z0-9]{10}$/i.test(asin)) {
      const link = node.querySelector("a[href*='/dp/'], a[href*='/gp/product/']");
      if (link) {
        const match = link.href.match(/\/(?:dp|gp\/product)\/([A-Z0-9]{10})(?:[/?]|$)/i);
        if (match) asin = match[1].toUpperCase();
      }
    }
    
    // Skip empty or duplicate ASINs
    if (!asin || seenAsins.has(asin)) return;
    seenAsins.add(asin);
    
    let rank = items.length + 1;
    const badgeEl = node.querySelector(".zg-badge-text, .zg-badge-text-line, span.zg-badge-text, .zg-rank-number, .zg-badge-body");
    if (badgeEl) {
      const match = badgeEl.textContent.match(/\d+/);
      if (match) rank = parseInt(match[0]);
    }
    
    // Fallback title selectors
    const titleEl = node.querySelector("div.p13n-sc-truncate-desktop-type2") ||
                    node.querySelector("div[class*='p13n-sc-css-line-clamp']") ||
                    node.querySelector(".p13n-sc-truncated") || 
                    node.querySelector("h2") || 
                    node.querySelector("div._cDE42_title_254n-") ||
                    node.querySelector(".p13n-sc-word-break") ||
                    node.querySelector("a.a-link-normal span div") ||
                    node.querySelector(".p13n-sc-truncate") ||
                    node.querySelector(".p13n-sc-unconfigured");
    let title = "Bestseller Item #" + rank;
    if (titleEl) {
      title = titleEl.textContent.trim();
    } else {
      const img = node.querySelector("img");
      if (img && img.alt) {
        title = img.alt.trim();
      }
    }
    
    // Fallback price logic for full or split elements
    let price = null;
    const priceEl = node.querySelector(".p13n-sc-price, .a-color-price, span.a-price");
    if (priceEl) {
      const match = priceEl.textContent.match(/[\d.,]+/);
      if (match) price = parseFloat(match[0].replace(/,/g, ""));
    }
    
    if (price === null) {
      const priceWhole = node.querySelector(".a-price-whole");
      const priceFraction = node.querySelector(".a-price-fraction");
      if (priceWhole) {
        const wholeText = priceWhole.textContent.replace(/[^0-9]/g, "");
        const fractionText = priceFraction ? priceFraction.textContent.replace(/[^0-9]/g, "") : "00";
        price = parseFloat(wholeText + "." + fractionText);
      }
    }
    
    // Reviews count selectors
    const reviewsEl = node.querySelector("a[href*='productReviews'] span, a[href*='/product-reviews/'] span, a[href*='customerReviews'] span, a[href*='reviews'] span, a[href*='Reviews'] span") ||
                      node.querySelector(".a-size-small a span.a-size-base") ||
                      node.querySelector("span.a-size-small") ||
                      node.querySelector(".a-size-small");
    let reviewsCount = 0;
    if (reviewsEl) {
      const match = reviewsEl.textContent.match(/[\d,]+/);
      reviewsCount = match ? parseInt(match[0].replace(/,/g, "")) : 0;
    }
    
    // Star rating selectors
    const ratingEl = node.querySelector("i.a-icon-star-small span.a-icon-alt") || 
                     node.querySelector("i.a-icon-star span.a-icon-alt") ||
                     node.querySelector("i[class*='a-icon-star'] span.a-icon-alt") ||
                     node.querySelector("i[class*='a-icon-star']") ||
                     node.querySelector("span.a-icon-alt") ||
                     node.querySelector(".a-icon-row i");
    let rating = 0;
    if (ratingEl) {
      const ratingText = ratingEl.textContent || ratingEl.getAttribute("aria-label") || "";
      const match = ratingText.match(/[\d.]+/);
      rating = match ? parseFloat(match[0]) : 0;
    }
    
    items.push({
      rank,
      asin,
      title,
      price,
      rating,
      reviewsCount,
      checked: true
    });
  });
  
  return items;
}

function initCategoryPageScanner() {
  const isCategoryPage = /\/(?:zgbs|bestsellers)(?:\/|$)/i.test(window.location.href) || 
                         document.querySelector("#zg_left_col2, #zg-right-col, #gridItemRoot");
  if (!isCategoryPage) return;
  
  const scanBtn = document.createElement("button");
  scanBtn.className = "myfastm-scan-btn";
  scanBtn.innerHTML = `
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
    </svg>
    ${getMsg("scanCategory", "Scan Category Trends")}
  `;
  document.body.appendChild(scanBtn);
  
  scanBtn.addEventListener("click", () => {
    const rawItems = scanCategoryProducts();
    if (rawItems.length === 0) {
      showNotification(getMsg("errorNoBestsellers", "No bestseller products identified. Make sure page loaded."), "warning");
      return;
    }
    
    const categoryHeader = document.querySelector("#zg-right-col h1, h1.zg-banner-text");
    const category = categoryHeader ? categoryHeader.textContent.replace(/Best Sellers in/i, "").trim() : "Best Sellers";
    
    const promises = rawItems.map(item => {
      return new Promise((resolve) => {
        safeSendMessage(
          { action: "CALCULATE_SALES", payload: { category, bsr: item.rank } },
          (response) => {
            if (response && response.success) {
              item.estSales = response.data.estSales;
              item.estWeeklySales = response.data.estWeeklySales;
            } else {
              item.estSales = Math.max(1, 10000 - item.rank * 950);
              item.estWeeklySales = Math.max(1, Math.round(item.estSales / 4.3));
            }
            resolve();
          }
        );
      });
    });
    
    Promise.all(promises).then(() => {
      renderCategoryTrendsModal(rawItems, category);
    });
  });
}

function updateCategoryTable(items, category, sortField = 'rank', sortOrder = 'asc') {
  const tableBody = document.getElementById("categoryTableBody");
  if (!tableBody) return;

  // Clone and sort items
  const sortedItems = [...items].sort((a, b) => {
    let valA, valB;
    if (sortField === 'price') {
      valA = a.price === null ? (sortOrder === 'asc' ? 999999 : -999999) : a.price;
      valB = b.price === null ? (sortOrder === 'asc' ? 999999 : -999999) : b.price;
    } else if (sortField === 'sales') {
      valA = a.estSales || 0;
      valB = b.estSales || 0;
    } else {
      valA = a.rank || 0;
      valB = b.rank || 0;
    }

    if (sortOrder === 'asc') {
      return valA - valB;
    } else {
      return valB - valA;
    }
  });

  let html = "";
  sortedItems.forEach(item => {
    const isChecked = item.checked ? "checked" : "";
    html += `
      <tr class="myfastm-tr-item">
        <td>
          <input type="checkbox" class="trend-toggle-checkbox" data-asin="${item.asin}" ${isChecked} style="cursor: pointer; width: 16px; height: 16px;">
        </td>
        <td style="font-weight: 700; color: #38bdf8;">#${item.rank}</td>
        <td style="font-weight: 600;">${item.asin}</td>
        <td class="myfastm-copyable myfastm-category-title" data-asin="${item.asin}" style="max-width: 260px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;" title="${getMsg("copiedSuccess") || "Click to Copy"}">${item.title}</td>
        <td>${item.price ? "$" + item.price.toFixed(2) : "N/A"}</td>
        <td style="font-weight: 700; color: #38bdf8;">${item.estSales.toLocaleString()} / <span style="color:#f97316;">${item.estWeeklySales.toLocaleString()}</span></td>
        <td><button class="myfastm-btn myfastm-btn-secondary table-save-btn" data-asin="${item.asin}" style="margin: 0; padding: 4px 8px; font-size: 11px;">${getMsg("watch", "Watch")}</button></td>
      </tr>
    `;
  });
  tableBody.innerHTML = html;

  // Re-bind SVG update check
  const svgContainer = document.getElementById("myfastmSvgContainer");
  tableBody.querySelectorAll(".trend-toggle-checkbox").forEach(cb => {
    cb.addEventListener("change", function() {
      const targetAsin = this.getAttribute("data-asin");
      const matched = items.find(i => i.asin === targetAsin);
      if (matched) {
        matched.checked = this.checked;
        svgContainer.innerHTML = generateSVGChart(items);
      }
    });
  });

  // Re-bind save event
  tableBody.querySelectorAll(".table-save-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      const targetAsin = this.getAttribute("data-asin");
      const matched = items.find(i => i.asin === targetAsin);
      if (matched) {
        const itemPayload = {
          asin: matched.asin,
          title: matched.title,
          category: category,
          bsr: matched.rank,
          price: matched.price,
          rating: matched.rating,
          reviewsCount: matched.reviewsCount,
          estSales: matched.estSales,
          estWeeklySales: matched.estWeeklySales
        };
        safeSendMessage({ action: "WATCHLIST_ADD", payload: itemPayload }, (res) => {
          if (res && res.success) {
            this.textContent = getMsg("saved", "Saved ✓");
            this.style.background = "#10b981";
            this.disabled = true;
          }
        });
      }
    });
  });

  // Re-bind title copy event
  tableBody.querySelectorAll(".myfastm-category-title").forEach(td => {
    td.addEventListener("click", function() {
      const targetAsin = this.getAttribute("data-asin");
      const matched = items.find(i => i.asin === targetAsin);
      if (matched) {
        navigator.clipboard.writeText(matched.title).then(() => {
          showNotification(getMsg("copiedSuccess", "Title copied!"), "success");
        });
      }
    });
  });
}

function renderCategoryTrendsModal(items, category) {
  const backdrop = document.createElement("div");
  backdrop.className = "myfastm-backdrop";
  
  const modal = document.createElement("div");
  modal.className = "myfastm-modal";
  
  modal.innerHTML = `
    <div class="myfastm-modal-header">
      <span class="myfastm-modal-title">${getMsg("categoryTrends", "Category Trends")}: ${category} (Top 10)</span>
      <button class="myfastm-close" id="myfastmModalCloseBtn">&times;</button>
    </div>
    
    <div id="myfastmSvgContainer" style="margin-bottom: 20px;"></div>
    
    <div class="myfastm-table-wrap">
      <table class="myfastm-table">
        <thead>
          <tr>
            <th style="width: 40px;">${getMsg("plot", "Plot")}</th>
            <th style="width: 50px;">${getMsg("rank", "Rank")}</th>
            <th style="width: 90px;">${getMsg("asin", "ASIN")}</th>
            <th>${getMsg("title", "Title")}</th>
            <th class="myfastm-th-sortable" id="catSortPrice" data-order="none">${getMsg("price", "Price")} <span class="sort-indicator"></span></th>
            <th class="myfastm-th-sortable" id="catSortSales" data-order="none">${getMsg("estSalesMoWk", "Est. Sales (Mo / Wk)")} <span class="sort-indicator"></span></th>
            <th>${getMsg("action", "Action")}</th>
          </tr>
        </thead>
        <tbody id="categoryTableBody">
          <!-- Populated dynamically -->
        </tbody>
      </table>
    </div>
  `;
  
  document.body.appendChild(backdrop);
  document.body.appendChild(modal);
  
  const svgContainer = document.getElementById("myfastmSvgContainer");
  svgContainer.innerHTML = generateSVGChart(items);
  
  // Initial render
  updateCategoryTable(items, category);
  
  const destroy = () => {
    backdrop.remove();
    modal.remove();
  };
  backdrop.addEventListener("click", destroy);
  document.getElementById("myfastmModalCloseBtn").addEventListener("click", destroy);

  // Set up sorting logic
  let currentSort = { field: 'rank', order: 'asc' };
  const priceHeader = document.getElementById("catSortPrice");
  const salesHeader = document.getElementById("catSortSales");

  function resetHeaderIndicators() {
    priceHeader.querySelector(".sort-indicator").textContent = "";
    salesHeader.querySelector(".sort-indicator").textContent = "";
  }

  priceHeader.addEventListener("click", () => {
    if (currentSort.field === 'price') {
      currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.field = 'price';
      currentSort.order = 'desc';
    }
    resetHeaderIndicators();
    priceHeader.querySelector(".sort-indicator").textContent = currentSort.order === 'asc' ? " ▲" : " ▼";
    updateCategoryTable(items, category, 'price', currentSort.order);
  });

  salesHeader.addEventListener("click", () => {
    if (currentSort.field === 'sales') {
      currentSort.order = currentSort.order === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.field = 'sales';
      currentSort.order = 'desc';
    }
    resetHeaderIndicators();
    salesHeader.querySelector(".sort-indicator").textContent = currentSort.order === 'asc' ? " ▲" : " ▼";
    updateCategoryTable(items, category, 'sales', currentSort.order);
  });
}

// ==========================================
// Initialization logic
function initAll() {
  initSingleProductScorecard();
  initSearchPageScanner();
  initCategoryPageScanner();
}

if (document.readyState === "complete" || document.readyState === "interactive") {
  initAll();
} else {
  window.addEventListener("load", initAll);
}

