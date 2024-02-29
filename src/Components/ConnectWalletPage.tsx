"use client";

import React from "react";
import Button from "./Button";
import { useConnect } from "wagmi";
import { wagmiConfig } from "@/utils/wagmiConfig";

const ConnectWalletPage = () => {
  const { connect } = useConnect({
    config: wagmiConfig,
  });
  return (
    <div className=" w-screen flex flex-col justify-center items-center">
      <Button
        isSelected
        text="Connect wallet"
        onClick={() => connect({ connector: wagmiConfig.connectors[0] })}
      />
      <p className="mt-4 text-black">Connect two accounts to play the game</p>
    </div>
  );
};

export default ConnectWalletPage;
