import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { getContract } from "@wagmi/core";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { useAccount } from "wagmi";
import abi from "../src/abi.js";
import { useEffect, useState } from "react";
import { getNetwork } from "@wagmi/core";
import { switchNetwork } from "@wagmi/core";

export default function Netwoks() {
  const { address } = useAccount();
  const [name, setName] = useState("");
  const [chainId, setChainId] = useState();
  console.log("Address", address);
  const { chain, chains } = getNetwork();
  console.log({ chains });

  // const changeNetwork = async (option) => {
  //   if (option === 1) {
  //     await addNetwork({
  //       chainId: 80001,
  //       chainName: "Mumbai Testnet",
  //       rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
  //       blockExplorerUrls: ["https://explorer-mumbai.maticvigil.com"],
  //     });
  //     let network = await switchNetwork({ chainId: 80001 });
  //   } else if (option === 2) {
  //     let network = await switchNetwork({ chainId: 97 });
  //   } else if (option === 3) {
  //     let network = await switchNetwork({ chainId: 43113 });
  //   } else if (option === 4) {
  //     let network = await switchNetwork({ chainId: 11155111 });
  //   }
  // };

  // ...

  const changeNetwork = async (option) => {
    const { chainId } = getNetwork();

    if (option === 1 && chainId !== "80001") {
      await switchNetwork({ chainId: "80001" }); // Switch to Mumbai Testnet
    } else if (option === 2 && chainId !== "0x61") {
      await switchNetwork({ chainId: "0x61" }); // Switch to BSC Testnet
    } else if (option === 3 && chainId !== "0xa99") {
      await switchNetwork({ chainId: "0xa99" }); // Switch to Avalanche Fuji
    } else if (option === 4 && chainId !== "0xababcd") {
      await switchNetwork({ chainId: "0xababcd" }); // Switch to Sepolia
    }
  };

  return (
    <>
      <div>
        <h1>select Network</h1>
        <div>
          <button onClick={() => changeNetwork(1)}>Mumbai Testnet</button>
          <button onClick={() => changeNetwork(2)}>bscTestnet</button>
          <button onClick={() => changeNetwork(3)}>avalancheFuji</button>
          <button onClick={() => changeNetwork(4)}>sepolia</button>
        </div>
      </div>
    </>
  );
}
