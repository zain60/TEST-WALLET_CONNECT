import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { getContract } from "@wagmi/core";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import CustomButton from "./CustomButton";
import { useAccount } from "wagmi";
import abi from "../src/abi.js";
import { useState } from "react";

export default function HomePage() {
  const { address } = useAccount();
  const [name, setName] = useState("");
  console.log("Address", address);

  const contractAddress = "0x03aC27567b55022e6fB915B95131F2f2f44e44FE";

  const contract = getContract({
    address: contractAddress,
    abi: abi,
  });
  const getName = async () => {
    const name1 = await contract.read.name();
    setName(name1);
  };

  const { data, isLoading, isSuccess, write } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "mint",
    args: ["0xbd8e62a8f8ae0e016ff1e940ea22ac73c764de9a", "http://xyz"],
  });

  return (
    <>
      <Web3Button
        connectedWalletId
        icon="show"
        label="Connect Wallet"
        balance="show"
      />
      <div>
        {" "}
        <Web3NetworkSwitch />
      </div>
      <div color="blue">
        {" "}
        <h2> Connect walletbusing your own UI </h2>
        <CustomButton />
      </div>
      <div>
        <h1>Call smart contract read functions</h1>

        <h3>
          {" "}
          <button onClick={() => getName()}>getName</button>name of contract :
          {name}
        </h3>
        <button onClick={() => write()}>Mint Token</button>
        {isLoading && <div> please wait vand Check Wallet</div>}
        {isSuccess && <div>Transaction hash: {JSON.stringify(data)}</div>}
      </div>
    </>
  );
}
