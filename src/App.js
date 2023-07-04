import { WagmiConfig, createConfig, configureChains } from "wagmi";
import {
  polygonMumbai,
  sepolia,
  avalancheFuji,
  bscTestnet,
} from "wagmi/chains";
import { Profile } from "./Profile";
import HomePage from "../src/Home.js";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import { InjectedConnector } from "wagmi/connectors/injected";

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
    // new CoinbaseWalletConnector({
    //   chains,
    //   options: {
    //     projectId: "87764b77f1d0fdcff18687e178ef5fcd",
    //   },
    // }),
    // new WalletConnectConnector({
    //   chains,
    //   options: {
    //     projectId: "87764b77f1d0fdcff18687e178ef5fcd",
    //   },
    // }),
    new InjectedConnector({
      autoConnect: false,
      chains,
      options: {
        projectId: "87764b77f1d0fdcff18687e178ef5fcd",
        shimDisconnect: true,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

// Pass config to React Context Provider
export default function App() {
  return (
    <WagmiConfig config={config}>
      <Profile />
      <HomePage />
    </WagmiConfig>
  );
}
