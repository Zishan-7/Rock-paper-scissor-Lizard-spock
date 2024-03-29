"use client";

import React, { useState } from "react";
import Moves from "./Moves";
import Button from "./Button";
import { startGame } from "@/services/contractServices";
import Loading from "./Loading";
import { useEstimateFeesPerGas } from "wagmi";
import { sepolia } from "wagmi/chains";
interface Player1ViewI {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const Player1View: React.FC<Player1ViewI> = ({ setStage }) => {
  const [stake, setStake] = useState<string>("0");
  const [player1Move, setPlayer1Move] = useState<number>(0);
  const [isLoading, setisLoading] = useState<boolean>(false);

  const { data } = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });

  const initializeGame = async () => {
    try {
      if (parseFloat(stake) <= 0) {
        alert("Stake must be greater than zero");
        return;
      }
      if (player1Move === 0) {
        alert("Please select your move");
        return;
      }

      setisLoading(true);
      if (data) {
        await startGame(
          stake,
          player1Move,
          data.maxPriorityFeePerGas,
          data.maxFeePerGas
        );
        setStage(2);
      }
    } catch {
      alert("Some error occured");
    } finally {
      setisLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-black flex flex-col w-full px-10">
      <h2 className="text-2xl mt-6 font-bold">Player 1 turn </h2>

      <div className="flex items-center mt-4">
        <p>How much ETH do you want to stake?</p>
        <input
          value={stake}
          onChange={(e) => setStake(e.target.value)}
          type="number"
          className="border-[1px] border-black rounded-md ml-4 py-1 px-3"
        />
      </div>

      <h2 className="text-xl mt-6 font-semibold">Select your move</h2>

      <Moves playerMove={player1Move} setPlayerMove={setPlayer1Move} />

      <span className="mt-6 w-1/2 flex justify-center items-center">
        <Button
          isSelected
          className="w-56"
          text="Submit"
          onClick={initializeGame}
        />
      </span>
    </div>
  );
};

export default Player1View;
