import WalletConnectProvider from "@walletconnect/web3-provider";
import { ethers } from "ethers";

const provider = new WalletConnectProvider({
  infuraId: "INFURA_ID",
});

const connectWalletConnect = async () => {
  const ethersProvider = new ethers.providers.Web3Provider(provider);
  await provider.enable();
  provider.on("accountsChanged", (accounts) => {
    // you can access the accounts here
    console.log(accounts);
  });
  provider.on("disconnect", (code, reason) => {
    //fired when disconnecting WalletConnect
    console.log(code, reason);
  });
};
