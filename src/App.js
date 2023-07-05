import { WagmiConfig, createConfig, configureChains } from "wagmi";
import {
  polygonMumbai,
  sepolia,
  avalancheFuji,
  bscTestnet,
} from "wagmi/chains";
import { Profile } from "./Profile";
import HomePage from "../src/Home.js";
import { Web3Modal } from "@web3modal/react";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { InjectedConnector } from "wagmi/connectors/injected";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "@wagmi/core/connectors/metaMask";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";

import Netwoks from "./Networks";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygonMumbai, sepolia, avalancheFuji, bscTestnet],
  [
    alchemyProvider({ apiKey: "_8PhvTy6Fmssg4aO-98l8WqQMTl_eyig" }),
    publicProvider(),
  ]
);

// Set up wagmi config
const config = createConfig({
  autoConnect: true,
  connectors: [
    new CoinbaseWalletConnector({
      chains,
      options: {
        projectId: "87764b77f1d0fdcff18687e178ef5fcd",
      },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "87764b77f1d0fdcff18687e178ef5fcd",
      },
    }),
    new InjectedConnector({
      autoConnect: false,
      chains,
      options: {
        projectId: "87764b77f1d0fdcff18687e178ef5fcd",
        shimDisconnect: true,
      },
    }),
    new MetaMaskConnector({
      options: {
        shimDisconnect: true,
        UNSTABLE_shimOnConnectSelectAccount: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

const projectId = "304a5eb05d33ef9727d03d70ea493eb6";

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
      <WagmiConfig config={config}>
        <Profile />
        <HomePage />
        <Netwoks />
      </WagmiConfig>
      {/* <Web3Modal
        projectId={"87764b77f1d0fdcff18687e178ef5fcd"}
        ethereumClient={ethereumClient}
        enableExplorer={true}
      /> */}
    </>
  );
}
