"use client";

import Script from "next/script";

export default function CurrencyCompare() {
  return (
    <div
      className=" p-4 rounded-lg mt-6 bg-emerald-300"
    >
      <div className="uppercase text-sm font-bold text-black">
        CRYPTOCURRENCY PRICES
      </div>

      <div id="crypto-widget" className="mt-2"></div>

      <Script
        id="cryptocompare-widget"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function () {
              var baseUrl = "https://widgets.cryptocompare.com/";
              var appName = encodeURIComponent(window.location.hostname);

              if (appName === "") {
                appName = "local";
              }

              var s = document.createElement("script");
              s.type = "text/javascript";
              s.async = true;

              var theUrl =
                baseUrl +
                "serve/v3/coin/chart?fsym=BTC&tsyms=USD,EUR,CNY,GBP";

              s.src =
                theUrl +
                (theUrl.indexOf("?") >= 0 ? "&" : "?") +
                "app=" +
                appName;

              document.getElementById("crypto-widget").appendChild(s);
            })();
          `,
        }}
      />
    </div>
  );
}