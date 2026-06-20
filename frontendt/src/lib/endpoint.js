export const endpoints = [
     {
    id: 0,
    method: "BASE",
    endpoint: "/",
    title: "Birrify API Base",
    description:
      "Welcome to Birrify API. This API provides Ethiopian bank exchange rates in a simple, developer-friendly format. Select an endpoint to get started.",

    example: "https://brrify-api.onrender.com/",

    response: {
      status: "success",
      message: "Base API loaded. Choose an endpoint to continue."
    }
  },
  {
    id: 1,
    method: "GET",
    endpoint: "/",
    title: "Get All Exchange Rates",
    description: "Returns the latest exchange rates from all supported banks.",

    example: "https://brrify-api.onrender.com/",

    response: [
      {
        bank_name: "cbe",
        currency_code: "USD",
        buy: 151.25,
        sell: 154.60,
        created_at: "2026-06-18"
      }
    ]
  },

  {
    id: 2,
    method: "GET",
    endpoint: "/high-low/{currency}",
    title: "Find Highest and Lowest Rate",
    description:
      "Finds which bank has the highest buying rate and lowest selling rate for a currency.",

    example: "https://brrify-api.onrender.com/high-low/USD",

    response: {
      highest: {
        bank_name: "dashen",
        buy: 152.5
      },
      lowest: {
        bank_name: "cbe",
        sell: 153.4
      }
    }
  },

  {
    id: 3,
    method: "GET",
    endpoint: "/average/{currency}",
    title: "Get Average Exchange Rate",
    description:
      "Calculates the average buy and sell rates across banks.",

    example: "https://brrify-api.onrender.com/average/USD",

    response: {
      average_buy: 151.8,
      average_sell: 154.1
    }
  }
];