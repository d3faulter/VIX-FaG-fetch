// Existing code to fetch the VIX data
let vixUrl = "https://cdn.cboe.com/api/global/us_indices/daily_prices/VIX_History.csv";
let vixReq = new Request(vixUrl);
let csv = await vixReq.loadString();

// Parse CSV
let rows = csv.split("\n").filter(row => row.length > 0);
let lastRow = rows[rows.length - 1].split(",");

// Extract the date and VIX value
let date = lastRow[0];
let vixValue = lastRow[4];

// Fetch the Fear and Greed Index from RapidAPI
let fgiUrl = "https://fear-and-greed-index.p.rapidapi.com/v1/fgi";
let fgiReq = new Request(fgiUrl);
fgiReq.headers = {
  "x-rapidapi-key": "RAPID-API-KEY",
  "x-rapidapi-host": "fear-and-greed-index.p.rapidapi.com",
  "Accept": "application/json",
  "Content-Type": "application/json"
};

let fgiResponse = await fgiReq.loadJSON();

// Log the full response to see its structure
console.log("Full FGI Response:", JSON.stringify(fgiResponse));

// Extract the Fear and Greed Index value
let fgiValue;
if (fgiResponse && fgiResponse.fgi && fgiResponse.fgi.now) {
    fgiValue = fgiResponse.fgi.now.value;
} else {
    console.error("Error: Could not extract Fear and Greed Index value from the response");
    fgiValue = "N/A";  // Set a fallback value if extraction fails
}

// Combine both VIX and Fear & Greed Index data
let result = {
  "date": date,
  "VIX_value": vixValue,
  "Fear_and_Greed_Index": fgiValue
};

// Convert result to string and log it
let resultStr = JSON.stringify(result);
console.log(resultStr)

return result;

Script.complete();
