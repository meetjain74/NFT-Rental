import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

import Dashboard from "./components/Dashboard/Dashboard";
import LandingPage from "./components/LandingPage/LandingPage";
import Lend from "./components/Lend/Lend";
import Rent from "./components/Rent/Rent";

import type { FC } from "react";

const { chains, provider } = configureChains(
  [chain.polygon],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [new InjectedConnector({ chains })],
});

const App: FC = () => {
  return (
    <>
      <WagmiConfig client={client}>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/lend" element={<Lend />} />
            <Route path="/rent" element={<Rent />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </WagmiConfig>
    </>
  );
};

export default App;
