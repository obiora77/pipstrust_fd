// "use client"

// export default function CryptoMarquee() {
//   const coins = [
//     { symbol: "BTC", name: "Bitcoin", price: "$94,280", change: "+5.2%", color: "text-orange-500" },
//     { symbol: "ETH", name: "Ethereum", price: "$3,445", change: "+3.8%", color: "text-blue-500" },
//     { symbol: "BNB", name: "BNB", price: "$612", change: "+2.1%", color: "text-yellow-500" },
//     { symbol: "SOL", name: "Solana", price: "$187", change: "+6.5%", color: "text-purple-500" },
//     { symbol: "XRP", name: "Ripple", price: "$2.45", change: "+1.2%", color: "text-blue-400" },
//     { symbol: "ADA", name: "Cardano", price: "$0.95", change: "+4.3%", color: "text-blue-600" },
//     { symbol: "DOGE", name: "Dogecoin", price: "$0.38", change: "+8.1%", color: "text-yellow-600" },
//     { symbol: "LINK", name: "Chainlink", price: "$28.50", change: "+3.9%", color: "text-blue-700" },
//   ]

//   return (
//     <div className="py-6 mt-16 bg-gradient-to-r from-primary/5 to-accent/5 border-y border-border overflow-hidden">
//       <style jsx>{`
//         @keyframes scroll {
//           from {
//             transform: translateX(0);
//           }
//           to {
//             transform: translateX(-50%);
//           }
//         }
//         .marquee {
//           animation: scroll 30s linear infinite;
//         }
//         .marquee:hover {
//           animation-play-state: paused;
//         }
//       `}</style>
//       <div className="flex gap-8 marquee">
//         {[...coins, ...coins].map((coin, i) => (
//           <div key={i} className="flex items-center gap-3 whitespace-nowrap px-4">
//             <div className={`text-sm font-bold ${coin.color}`}>{coin.symbol}</div>
//             <div className="text-sm text-muted-foreground">{coin.price}</div>
//             <div className="text-sm text-green-500 font-medium">{coin.change}</div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

"use client";

import Script from "next/script";

export default function CryptoMarquee() {
  return (
    <div
      className="shadow-sm mt-16 rounded-lg overflow-hidden"
      style={{ backgroundColor: "#4d7de6" }}
    >
      {/* Load CoinGecko widget script */}
      <Script
        src="https://widgets.coingecko.com/coingecko-coin-price-marquee-widget.js"
        strategy="afterInteractive"
      />

      {/* Widget */}
      <coingecko-coin-price-marquee-widget
        coin-ids="bitcoin,ethereum,eos,ripple,litecoin"
        currency="usd"
        background-color="#ffffff"
        locale="en"
        font-color="#333333"
      ></coingecko-coin-price-marquee-widget>
    </div>
  );
}