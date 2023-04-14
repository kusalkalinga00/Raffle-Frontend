import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants/constants";
import { CONTRACT_ABI } from "@/constants/constants";

function Participants() {
  const [players, setPlayers] = useState("");
  const {
    data: numberOfPlayers,
    isError: numberOfPlayersError,
    isLoading: numberOfPlayersLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getNumberOfPlayers",
    watch: true,
  });

  useEffect(() => {
    if (numberOfPlayers) {
      setPlayers(numberOfPlayers.toString());
    }
  }, [numberOfPlayers]);

  return (
    <div className="text-[40px] text-white font-medium capitalize text-center px-[3px] sm:mt-5 sm:pb-5">
      {`Currently ${players}  participants playing..!`}
    </div>
  );
}

export default Participants;
