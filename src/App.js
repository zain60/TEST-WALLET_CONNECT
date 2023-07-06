import { WagmiConfig, createConfig, configureChains } from "wagmi";
import {
  polygonMumbai,
  sepolia,
  avalancheFuji,
  bscTestnet,
} from "wagmi/chains";
// import { Profile } from "./Profile";
import HomePage from "./Home.js";
import { Web3Modal } from "@web3modal/react";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import {
  EthereumClient,
  w3mConnectors,
} from "@web3modal/ethereum";

import { NetworkSwitcher } from "./Networkswitcher";

const projectId = "304a5eb05d33ef9727d03d70ea493eb6";
const apiKey = "_8PhvTy6Fmssg4aO-98l8WqQMTl_eyig"

const { chains, publicClient } = configureChains(
  [polygonMumbai, sepolia, avalancheFuji, bscTestnet],
  [
    alchemyProvider({ apiKey }),
    publicProvider(),
  ]
);


const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});
const ethereumClient = new EthereumClient(wagmiConfig, chains);

// Pass config to React Context Provider
export default function App() {
  return (
    <>
    {wagmiConfig && 
    <>
     <WagmiConfig config={wagmiConfig}>
        {/* <Profile /> */}
        <HomePage />
        {/* <Netwoks /> */}
        <NetworkSwitcher />
      </WagmiConfig>
      <Web3Modal
        projectId={"87764b77f1d0fdcff18687e178ef5fcd"}
        ethereumClient={ethereumClient}
        enableExplorer={true}
      />
    </>
    }
     
    </>
  );
}
