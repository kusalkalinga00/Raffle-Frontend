import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants/constants";
import { CONTRACT_ABI } from "@/constants/constants";

function LastWinner() {
  const [recentWinner, setRecentWinner] = useState(null);

  const {
    data: lastWinner,
    isError: lastWinnerError,
    isLoading: lastWinnerLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getRecentWinner",
  });

  useEffect(() => {
    if (lastWinner) {
      setRecentWinner(lastWinner);
    }
  }, [lastWinner]);

  return (
    <div className="flex justify-center sm:mt-1">
      <div className="flex justify-center items-center text-[20px] text-white p-5 backdrop-blur bg-white/10 mt-5 m-5 rounded-xl sm:w-[800px] w-[350px] ">
        <div className="text-center">Last Winner</div>
        <div className="ml-[10px] truncate ...">
          {recentWinner ? recentWinner : "No Winner Yet"}
        </div>
      </div>
    </div>
  );
}

export default LastWinner;
