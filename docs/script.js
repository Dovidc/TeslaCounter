const apiToken = "Cp3RixO2C5GictJF1TBfteW8GXT9pjAB9DYwbw2V";
const stockSymbol = "TSLA";  // Hardcoded stock symbol
const purchasePrice = 150.00;  // Hardcoded purchase price

async function fetchStockPrice(TSLA) {
  const url = `https://api.stockdata.org/v1/data/quote?symbols=TSLA&api_token=Cp3RixO2C5GictJF1TBfteW8GXT9pjAB9DYwbw2V`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data && data.data && data.data.length > 0) {
      return data.data[0].price;
    } else {
      throw new Error("No data found for the given symbol.");
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    document.getElementById("result").textContent = "Could not fetch stock data. Please try again.";
  }
}

async function calculateGainLoss() {
  const currentPrice = await fetchStockPrice(stockSymbol);

  if (!currentPrice) {
    document.getElementById("result").textContent = "Error fetching current stock price.";
    return;
  }

  const gainLoss = currentPrice - purchasePrice;
  const gainLossPercent = ((gainLoss / purchasePrice) * 100).toFixed(2);

  document.getElementById("result").textContent = 
    gainLoss >= 0 
      ? `Gain: $${gainLoss.toFixed(2)} (${gainLossPercent}%)`
      : `Loss: $${Math.abs(gainLoss).toFixed(2)} (${gainLossPercent}%)`;
}

// Fetch and display data on each page load
window.addEventListener("load", calculateGainLoss);
