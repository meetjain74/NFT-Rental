import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Provider, createClient } from "wagmi";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";

import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/LandingPage/LandingPage";
import Lend from "./components/Lend/Lend";
import Rent from "./components/Rent/Rent";
// import Wishlist from "./components/Wishlist/Wishlist";

import type { FC } from "react";

const client = createClient({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({
      options: {
        shimDisconnect: true,
      },
    }),
    new WalletConnectConnector({
      options: {
        qrcode: true,
        chainId: 80001,
        clientMeta: {
          name: "NFT Rental",
          url: "https://example.com",
          icons: [""],
          description: "Rent NFTs",
        },
      },
    }),
    new CoinbaseWalletConnector({
      options: {
        appName: "NFT Rental",
        appLogoUrl: "",
        darkMode: true,
      },
    }),
  ],
});

const App: FC = () => {
  return (
    <>
      <Provider client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/lend" element={<Lend />} />
            <Route path="/rent" element={<Rent />} />
            {/* <Route path="/wishlist" element={<Wishlist />} /> */}
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </Provider>
    </>
  );
};

export default App;
