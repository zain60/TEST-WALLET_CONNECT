import "./App.css";
import HomePage from "../src/Home.js";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { mainnet, polygonMumbai, sepolia } from "wagmi/chains";

const chains = [mainnet, polygonMumbai, sepolia];
const projectId = "304a5eb05d33ef9727d03d70ea493eb6";

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);
console.log({ ethereumClient });

function App() {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        {" "}
        <HomePage />
      </WagmiConfig>
      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        enableExplorer={true}
      />
    </>
  );
}

export default App;
