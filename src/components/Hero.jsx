import React, { useEffect, useState } from "react";
import EnterForm from "./EnterForm";
import LastWinner from "./LastWinner";
import Participants from "./Participants";
import { useBalance, useContractRead } from "wagmi";
import { utils } from "ethers";

import { CONTRACT_ABI, CONTRACT_ADDRESS } from "@/constants/constants";

function Hero() {
  const [raffleBlance, setRaffleBlance] = useState("0");
  const [preDraw, setPreDraw] = useState("");
  const {
    data: contractBalance,
    isError: contractBalanceError,
    isLoading: contractBalanceLoading,
  } = useBalance({
    address: CONTRACT_ADDRESS,
    watch: true,
  });

  const {
    data: latestDraw,
    error: latestDrawError,
    isLoading: latestDrawLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getLastTimeStamp",
    watch: true,
  });

  useEffect(() => {
    if (latestDraw) {
      const unixTimestamp = parseInt(latestDraw.toString());
      const date = new Date(unixTimestamp * 1000);

      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const second = date.getSeconds();

      const formattedDateTime = `${year}-${month
        .toString()
        .padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
        .toString()
        .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second
        .toString()
        .padStart(2, "0")}`;

      console.log(formattedDateTime);
      setPreDraw(formattedDateTime);
    }
  }, [latestDraw]);

  useEffect(() => {
    if (contractBalance) {
      setRaffleBlance(utils.formatEther(contractBalance?.value.toString()));
    }
  }, [contractBalance]);

  return (
    <div>
      <div>
        <EnterForm />
      </div>
      <div className="mt-2 flex justify-center">
        <h1 className="text-white text-[15px] font-bold">{`Last draw was at ${preDraw}`}</h1>
      </div>
      <div className="mt-10 flex justify-center">
        <h1 className="sm:text-[65px] text-[#27E1C1] font-bold text-center ">
          A New Winner In Every Hour !!!
        </h1>
      </div>

      <div>
        {raffleBlance === "0.0" ? (
          <div className="flex justify-center">
            <h1 className=" sm:text-[35px] capitalize font-semibold text-[#0EA293]  ">
              Enter Now !!!
            </h1>
          </div>
        ) : (
          <div className="flex justify-center mt-2 sm:text-[65px] text-[40px] text-[#27E1C1] font-bold text-center ">{`${raffleBlance} ETH In The Pot`}</div>
        )}
      </div>
      <div>
        <LastWinner />
      </div>
      <div>{raffleBlance === "0.0" ? <></> : <Participants />}</div>
    </div>
  );
}

export default Hero;
