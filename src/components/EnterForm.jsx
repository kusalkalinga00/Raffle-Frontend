import React, { useEffect, useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useContractRead,
} from "wagmi";
import { CONTRACT_ADDRESS } from "@/constants/constants";
import { CONTRACT_ABI } from "@/constants/constants";
import { utils } from "ethers";

function EnterForm() {
  const [fee, setFee] = useState("0");
  const [trxLoading, setTrxLoading] = useState(false);

  const {
    data: entranceFee,
    error: entranceFeeError,
    isLoading: entranceFeeLoading,
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "getEntranceFee",
  });

  useEffect(() => {
    if (entranceFee) {
      console.log(entranceFee.toString());
      setFee(entranceFee.toString());
    }
  }, [entranceFee]);

  const {
    config: enterRaffleConfig,
    isLoading: enterRaffleLoading,
    error: enterRaffleError,
  } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: "enterRaffle",
    overrides: {
      value: fee,
    },
  });

  const { writeAsync: enterRaffleWrite } = useContractWrite(enterRaffleConfig);

  const handleRaffleEnter = async () => {
    try {
      setTrxLoading(true);
      const response = await enterRaffleWrite();
      const result = await response.wait();
      console.log(result);
      alert("Successfully Entered !");
      setTrxLoading(false);
    } catch (error) {
      console.log(error);
      alert(error.message);
      setTrxLoading(false);
    }
  };

  //error handling
  useEffect(() => {
    if (enterRaffleError) {
      console.log("enterRaffleError : ", enterRaffleError);
    }
  });

  return (
    <div className="flex justify-center sm:mt-[50px]">
      <div className="backdrop-blur-sm bg-white/10 p-9 mt-[40px] rounded-xl">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold sm:text-[30px]">
            {`Entrance Fee ${utils.formatEther(fee)}`}
          </div>
          <div className="ml-2 text-white font-bold sm:text-[30px]">ETH</div>
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="text-white border-2 rounded-xl px-9 py-2 "
            onClick={handleRaffleEnter}
            disabled={entranceFeeLoading || enterRaffleLoading || trxLoading}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

export default EnterForm;
