import React from "react";
import Button from "./Button";

interface CheckWinnerI {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const CheckWinner: React.FC<CheckWinnerI> = ({ setStage }) => {
  return (
    <div className="flex gap-x-5 w-full justify-center items-center">
      <div className="text-black flex flex-col  w-1/2">
        <span className="mt-6 w-full flex-col flex justify-center items-center">
          <Button isSelected className="w-56" text="Check Result" />
          <p className="mt-4">
            Player 1 not responding?{" "}
            <span className="underline cursor-pointer">Click here</span>
          </p>
        </span>
      </div>
    </div>
  );
};

export default CheckWinner;
