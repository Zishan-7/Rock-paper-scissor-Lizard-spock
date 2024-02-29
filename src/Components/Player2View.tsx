import React, { useState } from "react";
import Moves from "./Moves";
import Button from "./Button";
import {
  Player2Move,
  getLastAction,
  player2Timeout,
} from "@/services/contractServices";
import Loading from "./Loading";
import { useEstimateFeesPerGas } from "wagmi";
import { sepolia } from "wagmi/chains";

interface Player2ViewI {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const Player2View: React.FC<Player2ViewI> = ({ setStage }) => {
  const { data } = useEstimateFeesPerGas({
    chainId: sepolia.id,
  });
  const [player2Move, setPlayer2Move] = useState<number>(0);

  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      if (player2Move === 0) {
        alert("Please select your move");
        return;
      }
      if (data) {
        setisLoading(true);
        await Player2Move(
          player2Move,
          data.maxPriorityFeePerGas,
          data.maxFeePerGas
        );
        setStage(3);
      }
    } catch {
      alert("Some error occured");
    } finally {
      setisLoading(false);
    }
  };

  const handleTimeout = async () => {
    try {
      const lastAction = getLastAction();

      lastAction.setMinutes(getLastAction().getMinutes() + 5);

      if (lastAction > new Date()) {
        alert(
          "Timeout funtion can only be called after 5 minutes of inactivity"
        );
        return;
      }
      setisLoading(true);
      await player2Timeout();
      alert("Congrats!! Player 1 Won");
      setStage(1);
    } catch (e) {
      alert(e);
    }
    setisLoading(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="text-black flex flex-col w-full px-10">
      <h2 className="text-2xl mt-6 font-bold">Player 2 turn</h2>
      <h2 className="text-xl mt-6 font-semibold">Select your move</h2>
      <Moves playerMove={player2Move} setPlayerMove={setPlayer2Move} />
      <span className="mt-6 w-1/2 flex flex-col justify-center items-center">
        <Button
          isSelected
          className="w-56"
          text="Submit"
          onClick={handleSubmit}
        />

        <p className="text-sm mt-2">
          Please switch to the second account before submitting
        </p>

        <p className="mt-4 text-xl">
          Player 2 not responding?
          <span
            onClick={handleTimeout}
            className="underline cursor-pointer ml-2"
          >
            Click here
          </span>
        </p>
      </span>
    </div>
  );
};

export default Player2View;
