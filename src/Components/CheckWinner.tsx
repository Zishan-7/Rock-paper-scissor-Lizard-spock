import React, { useState } from "react";
import Button from "./Button";
import {
  getLastAction,
  player1Timeout,
  solveGame,
} from "@/services/contractServices";
import Loading from "./Loading";

interface CheckWinnerI {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const CheckWinner: React.FC<CheckWinnerI> = ({ setStage }) => {
  const [isLoading, setisLoading] = useState(false);
  const [winner, setWinner] = useState<number>();

  const handleSolveGame = async () => {
    try {
      setisLoading(true);
      const res = await solveGame();
      setWinner(res);
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
      await player1Timeout();
      alert("Congrats!! Player 2 Won");
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
    <div className="flex gap-x-5 w-full justify-center items-center">
      <div className="text-black flex flex-col  w-1/2">
        {winner && (
          <h2 className="text-2xl mt-6 font-bold">
            {winner === 0 ? "Game tied!" : ` Congrats! Player ${winner} won`}
          </h2>
        )}
        <span className="mt-6 w-full flex-col flex justify-center items-center">
          <Button
            isSelected
            className="w-56"
            text="Check Result"
            onClick={handleSolveGame}
          />

          <p className="text-sm mt-2">
            Please switch to the first account before submitting
          </p>

          {!winner && (
            <p className="mt-4 text-xl">
              Player 1 not responding?{" "}
              <span
                onClick={handleTimeout}
                className="underline cursor-pointer"
              >
                Click here
              </span>
            </p>
          )}
        </span>
      </div>
    </div>
  );
};

export default CheckWinner;
