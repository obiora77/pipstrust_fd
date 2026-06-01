"use client"

import Script from "next/script"

export default function ForexWidget() {
  return (
      <Script
         src="https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js"
         strategy="lazyOnload"
      >
         {`
            {
               "width": "100%",
               "height": "500",
               "currencies": [
                  "EUR",
                  "USD",
                  "JPY",
                  "GBP",
                  "CHF",
                  "AUD",
                  "CAD",
                  "BTC",
                  "ETH"
               ],  
               "isTransparent": false,
               "colorTheme": "light",
               "locale": "en"
            }
         `}
      </Script>
  )
}