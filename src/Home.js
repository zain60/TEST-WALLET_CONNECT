import { Web3Button, Web3NetworkSwitch } from "@web3modal/react";
import { getContract } from "@wagmi/core";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { connect } from "@wagmi/core";

import CustomButton from "./CustomButton";
import { useAccount } from "wagmi";
import abi from "../src/abi.js";
import { useEffect, useState } from "react";
import { getNetwork } from "@wagmi/core";
import { switchNetwork } from "@wagmi/core";

export default function HomePage() {
  const { address } = useAccount();
  const [id, setId] = useState();
  const [chainId, setChainId] = useState();
  console.log("Address", address);
  const { chain } = getNetwork();

  const changeNetwork = async () => {
    let network = await switchNetwork({ chainId: 80001 });
  };

  useEffect(() => {
    if (
      chainId === undefined ||
      (chainId !== 80001 &&
        chainId !== 11155111 &&
        chainId !== 43113 &&
        chainId !== 97)
    ) {
      changeNetwork();
    }
  }, [chainId, address]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { chain } = getNetwork();
      setChainId(chain?.id);
    }, 2000); // 2 seconds interval
    return () => clearInterval(interval);
  }, []);

  const contractAddress = "0x03aC27567b55022e6fB915B95131F2f2f44e44FE";
  //  instance to call
  const contract = getContract({
    address: contractAddress,
    abi: abi,
  });

  console.log({ contract });
  //  read contract name
  const getName = async () => {
    const name1 = await contract.read.totalSupply();
    console.log(name1);
    setId(name1);
  };

  // mint a token

  const {
    write: mint,
    isLoading: mintIsLoading,
    isSuccess: mintIsSuccess,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "mint",
    args: ["0xbd8e62a8f8ae0e016ff1e940ea22ac73c764de9a", "http://xyz"],
  });

  const {
    write: approve,
    isLoading: approveIsLoading,
    isSuccess: approveIsSuccess,
  } = useContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "approve",
    args: ["0x50F3D0Dd9D4A1FFb835EA2eea8395F86eD832048", 49],
  });

  const handleMint = async () => {
    try {
      await mint();
      console.log("Mint transaction sent");
    } catch (error) {
      console.error("Failed to mint:", error);
    }
  };

  const handleClaim = async () => {
    try {
      await approve();
      console.log("Claim transaction sent");
    } catch (error) {
      console.error("Failed to claim:", error);
    }
  };

  return (
    <>
      <div>
        <Web3Button /> <Web3NetworkSwitch />
      </div>

      <div>
        <h1>Call smart contract read functions</h1>

        <h3>
          {" "}
          <button onClick={() => getName()}>getTotal Supply </button> Total
          supply :{Number(id)}
          {console.log("..", id)}
        </h3>
        <button onClick={handleMint} disabled={mintIsLoading || mintIsSuccess}>
          Mint
        </button>
        <button
          onClick={handleClaim}
          disabled={approveIsLoading || approveIsSuccess}
        >
          approve
        </button>
        {/* <button onClick={() => write()}>Mint Token</button>
        {isLoading && <div> please wait vand Check Wallet</div>}
        {isSuccess && <div>Transaction hash: {JSON.stringify(data)}</div>} */}
      </div>
    </>
  );
}
