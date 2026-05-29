// popup.js - Interactive workspace manager for myFastM

// Load watchlist and localize page on popup open
document.addEventListener("DOMContentLoaded", () => {
  localizePage();
  renderWatchlist();
  
  // Set up export handler
  document.getElementById("exportBtn").addEventListener("click", () => {
    chrome.runtime.sendMessage({ action: "EXPORT_WATCHLIST" }, (response) => {
      if (response && response.success) {
        const { csvString, fileName } = response.data;
        triggerFileDownload(csvString, fileName);
      }
    });
  });
});

// T022: Localize static elements in HTML
function localizePage() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translation = chrome.i18n.getMessage(key);
    if (translation) {
      el.textContent = translation;
    }
  });
}

// Render the watchlist cards
function renderWatchlist() {
  const container = document.getElementById("watchlistList");
  const countBadge = document.getElementById("watchlistCount");
  
  chrome.runtime.sendMessage({ action: "WATCHLIST_GET" }, (response) => {
    if (response && response.success) {
      const watchlist = response.data;
      const items = Object.values(watchlist);
      
      // Update count
      countBadge.textContent = items.length;
      
      if (items.length === 0) {
        container.innerHTML = `
          <div class="empty-state">
            <p>${chrome.i18n.getMessage("noProductsSaved")}</p>
            <p class="sub">${chrome.i18n.getMessage("browseAmazonPrompt")}</p>
          </div>
        `;
        return;
      }
      
      // Clear empty states
      container.innerHTML = "";
      
      // Build cards
      items.forEach(item => {
        const card = document.createElement("div");
        card.className = "watchlist-item";
        
        const priceDisplay = item.price ? `$${item.price.toFixed(2)}` : "N/A";
        const salesDisplay = item.estSales ? `${item.estSales.toLocaleString()} /mo` : "0 /mo";
        const weeklySalesDisplay = item.estWeeklySales ? `${item.estWeeklySales.toLocaleString()} /wk` : "0 /wk";
        const cleanTitle = item.title.length > 40 ? item.title.slice(0, 40) + "..." : item.title;
        
        // Retrieve dynamic localized labels
        const labelAsin = chrome.i18n.getMessage("asin") || "ASIN";
        const labelPrice = chrome.i18n.getMessage("price") || "Price";
        const labelMonthly = chrome.i18n.getMessage("estMonthlySales") || "Est. Monthly";
        const labelWeekly = chrome.i18n.getMessage("estWeeklySales") || "Est. Weekly";
        
        card.innerHTML = `
          <div class="item-info">
            <h4 class="item-title" title="${item.title}">${cleanTitle}</h4>
            <div class="item-meta">
              <span>${labelAsin}: <strong>${item.asin}</strong></span>
              <span>${labelPrice}: <strong>${priceDisplay}</strong></span>
              <span>${labelMonthly}/${labelWeekly}: <strong class="item-metric">${salesDisplay} / <span style="color:#f97316;">${weeklySalesDisplay}</span></strong></span>
            </div>
          </div>
          <div class="item-actions">
            <button class="btn-remove" data-asin="${item.asin}" title="Remove Item">
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
          </div>
        `;
        container.appendChild(card);
      });
      
      // Bind delete events
      document.querySelectorAll(".btn-remove").forEach(btn => {
        btn.addEventListener("click", function() {
          const targetAsin = this.getAttribute("data-asin");
          chrome.runtime.sendMessage({ action: "WATCHLIST_REMOVE", payload: { asin: targetAsin } }, (res) => {
            if (res && res.success) {
              renderWatchlist();
            }
          });
        });
      });
    }
  });
}

// Trigger browser Blob download pipeline
function triggerFileDownload(csvString, fileName) {
  const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
