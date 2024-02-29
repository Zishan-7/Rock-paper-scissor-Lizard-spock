import React, { useState } from "react";
import Moves from "./Moves";
import Button from "./Button";

interface Player2ViewI {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const Player2View: React.FC<Player2ViewI> = ({ setStage }) => {
  const [player2Move, setPlayer2Move] = useState<number>(0);
  return (
    <div className="text-black flex flex-col w-full px-10">
      <h2 className="text-2xl mt-6 font-bold">Player 2 turn</h2>
      <h2 className="text-xl mt-6 font-semibold">Select your move</h2>
      <Moves playerMove={player2Move} setPlayerMove={setPlayer2Move} />
      <span className="mt-6 w-1/2 flex flex-col justify-center items-center">
        <Button isSelected className="w-56" text="Submit" />
        <p className="mt-4">
          Player 2 not responding?
          <span className="underline cursor-pointer">Click here</span>
        </p>
      </span>
    </div>
  );
};

export default Player2View;
