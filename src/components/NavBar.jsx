import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

function NavBar() {
  return (
    <div className="flex justify-center p-5 backdrop-blur-sm bg-white/10">
      <div className="flex justify-between items-center w-full sm:w-[1240px]">
        <div>
          <Link href="/">
            <h1 className="sm:text-[40px] text-[30px] font-bold text-white">
              Raffle
            </h1>
          </Link>
        </div>
        <div>
          <ConnectButton label="Connect" />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
