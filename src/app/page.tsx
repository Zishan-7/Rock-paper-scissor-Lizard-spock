"use client";

import CheckWinner from "@/Components/CheckWinner";
import ConnectWalletPage from "@/Components/ConnectWalletPage";
import Player1View from "@/Components/Player1View";
import Player2View from "@/Components/Player2View";
import { useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const [stage, setStage] = useState(1);
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectWalletPage />;
  }

  if (stage === 1) return <Player1View setStage={setStage} />;

  if (stage === 2) return <Player2View setStage={setStage} />;

  return <CheckWinner setStage={setStage} />;
}
