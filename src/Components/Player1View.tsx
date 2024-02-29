"use client";

import React, { useState } from "react";
import Moves from "./Moves";
import Button from "./Button";

interface Player1ViewI {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}

const Player1View: React.FC<Player1ViewI> = ({ setStage }) => {
  const [stake, setStake] = useState<string>("0");
  const [player1Move, setPlayer1Move] = useState<number>(0);

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
        <Button isSelected className="w-56" text="Submit" />
      </span>
    </div>
  );
};

export default Player1View;
