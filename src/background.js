// background.js - Background Service Worker for myFastM

// T003: Local Category-aware BSR-to-Sales Correlation Estimator
function estimateMonthlySales(category, bsr) {
  if (!bsr || bsr <= 0) return 0;
  
  // Default coefficients based on average marketplace distributions (Sales = A * BSR^B)
  let A = 100000;
  let B = -0.55;
  
  const curves = {
    "Home & Kitchen": { A: 125000, B: -0.58 },
    "Beauty & Personal Care": { A: 95000, B: -0.52 },
    "Toys & Games": { A: 85000, B: -0.54 },
    "Electronics": { A: 160000, B: -0.63 },
    "Clothing, Shoes & Jewelry": { A: 110000, B: -0.56 },
    "Tools & Home Improvement": { A: 78000, B: -0.53 },
    "Sports & Outdoors": { A: 82000, B: -0.54 },
    "Health & Household": { A: 105000, B: -0.55 }
  };
  
  // Find matching category
  const normalizedCategory = category.toLowerCase();
  for (const key of Object.keys(curves)) {
    if (normalizedCategory.includes(key.toLowerCase())) {
      A = curves[key].A;
      B = curves[key].B;
      break;
    }
  }
  
  const rawSales = A * Math.pow(bsr, B);
  return Math.max(1, Math.round(rawSales));
}

// T013: Compile Excel-compatible CSV string from watchlist
function compileCSV(watchlist) {
  // Add UTF-8 Byte Order Mark (BOM) to prevent Excel display glitches
  let csvContent = "\ufeffASIN,Title,Category,Price,BSR,Est. Monthly Sales,Est. Weekly Sales,Added Date\n";
  
  Object.values(watchlist).forEach(item => {
    // Escape double quotes in titles
    const cleanTitle = (item.title || "").replace(/"/g, '""');
    const cleanCategory = (item.category || "").replace(/"/g, '""');
    const priceStr = item.price !== null && item.price !== undefined ? item.price : "N/A";
    const bsrStr = item.bsr ? item.bsr : "N/A";
    const estSalesStr = item.estSales ? item.estSales : "0";
    const estWeeklySalesStr = item.estWeeklySales ? item.estWeeklySales : "0";
    const addedAt = item.addedAt || "";
    
    csvContent += `"${item.asin}","${cleanTitle}","${cleanCategory}",${priceStr},${bsrStr},${estSalesStr},${estWeeklySalesStr},"${addedAt}"\n`;
  });
  
  return csvContent;
}

// T004: Central Asynchronous Message Listener
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  const { action, payload } = message;
  
  if (action === "CALCULATE_SALES") {
    const { category, bsr } = payload;
    const estSales = estimateMonthlySales(category, bsr);
    const estWeeklySales = Math.max(1, Math.round(estSales / 4.3));
    sendResponse({ success: true, data: { estSales, estWeeklySales } });
  } 
  
  else if (action === "WATCHLIST_GET") {
    chrome.storage.local.get({ watchlist: {} }, (result) => {
      sendResponse({ success: true, data: result.watchlist });
    });
    return true; // Keeps channel open for async response
  } 
  
  else if (action === "WATCHLIST_ADD") {
    const item = payload;
    chrome.storage.local.get({ watchlist: {} }, (result) => {
      const watchlist = result.watchlist;
      watchlist[item.asin] = {
        ...item,
        addedAt: new Date().toISOString()
      };
      chrome.storage.local.set({ watchlist }, () => {
        sendResponse({ success: true, message: "Added to Watchlist." });
      });
    });
    return true;
  } 
  
  else if (action === "WATCHLIST_REMOVE") {
    const { asin } = payload;
    chrome.storage.local.get({ watchlist: {} }, (result) => {
      const watchlist = result.watchlist;
      if (watchlist[asin]) {
        delete watchlist[asin];
        chrome.storage.local.set({ watchlist }, () => {
          sendResponse({ success: true, message: "Removed from Watchlist." });
        });
      } else {
        sendResponse({ success: false, message: "Item not found." });
      }
    });
    return true;
  } 
  
  else if (action === "EXPORT_WATCHLIST") {
    chrome.storage.local.get({ watchlist: {} }, (result) => {
      const csvString = compileCSV(result.watchlist);
      const fileName = `myFastM-export-${new Date().toISOString().slice(0, 10)}.csv`;
      sendResponse({ success: true, data: { csvString, fileName } });
    });
    return true;
  }
  
  return false;
});
