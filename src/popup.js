// popup.js - Interactive workspace manager for myFastM

let currentSortType = "none"; // "none", "sales", "price", "rating", "reviews"
let currentSortOrder = "none"; // "none", "asc", "desc"

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

  // Set up sorting buttons
  document.getElementById("sortSalesBtn").addEventListener("click", () => {
    handleSortChange("sales");
  });
  document.getElementById("sortPriceBtn").addEventListener("click", () => {
    handleSortChange("price");
  });
  document.getElementById("sortRatingBtn").addEventListener("click", () => {
    handleSortChange("rating");
  });
  document.getElementById("sortReviewsBtn").addEventListener("click", () => {
    handleSortChange("reviews");
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

// Handle sorting configuration change
function handleSortChange(type) {
  if (currentSortType === type) {
    // Cycle: desc -> asc -> none
    if (currentSortOrder === "desc") {
      currentSortOrder = "asc";
    } else if (currentSortOrder === "asc") {
      currentSortOrder = "none";
      currentSortType = "none";
    }
  } else {
    currentSortType = type;
    currentSortOrder = "desc";
  }
  
  updateSortButtonsUI();
  renderWatchlist();
}

// Update the active state and icons of sort buttons
function updateSortButtonsUI() {
  const salesBtn = document.getElementById("sortSalesBtn");
  const priceBtn = document.getElementById("sortPriceBtn");
  const ratingBtn = document.getElementById("sortRatingBtn");
  const reviewsBtn = document.getElementById("sortReviewsBtn");
  
  const salesIcon = salesBtn.querySelector(".sort-icon");
  const priceIcon = priceBtn.querySelector(".sort-icon");
  const ratingIcon = ratingBtn.querySelector(".sort-icon");
  const reviewsIcon = reviewsBtn.querySelector(".sort-icon");
  
  salesBtn.classList.remove("active");
  priceBtn.classList.remove("active");
  ratingBtn.classList.remove("active");
  reviewsBtn.classList.remove("active");
  
  salesIcon.textContent = "";
  priceIcon.textContent = "";
  ratingIcon.textContent = "";
  reviewsIcon.textContent = "";
  
  if (currentSortType === "sales") {
    salesBtn.classList.add("active");
    salesIcon.textContent = currentSortOrder === "desc" ? "↓" : "↑";
  } else if (currentSortType === "price") {
    priceBtn.classList.add("active");
    priceIcon.textContent = currentSortOrder === "desc" ? "↓" : "↑";
  } else if (currentSortType === "rating") {
    ratingBtn.classList.add("active");
    ratingIcon.textContent = currentSortOrder === "desc" ? "↓" : "↑";
  } else if (currentSortType === "reviews") {
    reviewsBtn.classList.add("active");
    reviewsIcon.textContent = currentSortOrder === "desc" ? "↓" : "↑";
  }
}

// Render the watchlist cards
function renderWatchlist() {
  const container = document.getElementById("watchlistList");
  const countBadge = document.getElementById("watchlistCount");
  const sortBar = document.getElementById("sortBar");
  
  chrome.runtime.sendMessage({ action: "WATCHLIST_GET" }, (response) => {
    if (response && response.success) {
      const watchlist = response.data;
      let items = Object.values(watchlist);
      
      // Update count
      countBadge.textContent = items.length;
      
      if (items.length === 0) {
        sortBar.style.display = "none";
        container.innerHTML = `
          <div class="empty-state">
            <p>${chrome.i18n.getMessage("noProductsSaved")}</p>
            <p class="sub">${chrome.i18n.getMessage("browseAmazonPrompt")}</p>
          </div>
        `;
        return;
      }
      
      // Show sort bar when items exist
      sortBar.style.display = "flex";
      
      // Apply sorting
      if (currentSortType !== "none" && currentSortOrder !== "none") {
        items.sort((a, b) => {
          let valA = 0;
          let valB = 0;
          
          if (currentSortType === "sales") {
            valA = a.estSales || 0;
            valB = b.estSales || 0;
          } else if (currentSortType === "price") {
            valA = a.price || 0;
            valB = b.price || 0;
          } else if (currentSortType === "rating") {
            valA = a.rating || 0;
            valB = b.rating || 0;
          } else if (currentSortType === "reviews") {
            valA = a.reviewsCount || 0;
            valB = b.reviewsCount || 0;
          }
          
          if (currentSortOrder === "asc") {
            return valA - valB;
          } else {
            return valB - valA;
          }
        });
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
            <h4 class="item-title" data-title="${item.title.replace(/"/g, '&quot;')}" title="${chrome.i18n.getMessage("copiedSuccess") || "Click to Copy"}">${cleanTitle}</h4>
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
      
      // Bind copy event to title elements
      document.querySelectorAll(".item-title").forEach(titleEl => {
        titleEl.addEventListener("click", function() {
          const fullTitle = this.getAttribute("data-title");
          navigator.clipboard.writeText(fullTitle).then(() => {
            showCopyToast();
          });
        });
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

// Show micro copy-status toast notification
function showCopyToast() {
  const existing = document.querySelector(".copy-toast");
  if (existing) existing.remove();
  
  const toast = document.createElement("div");
  toast.className = "copy-toast";
  toast.textContent = chrome.i18n.getMessage("copiedSuccess") || "Copied success!";
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.remove();
  }, 1500);
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
