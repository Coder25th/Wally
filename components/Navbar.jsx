import React from "react";
import Link from "next/link";

function Navbar() {
  return (
    <div className="flex items-center gap-x-10 w-full justify-center m-6">
      <Link href="/upload">
        <button className="relative cursor-pointer text-white text-lg rounded-lg p-[1px] border border-gray-300 bg-[radial-gradient(circle_60px_at_80%_-10%,_#ffffff,_#181b1b)]">
          <div className="absolute w-[50px] h-full rounded-lg bottom-0 left-0 bg-[radial-gradient(circle_40px_at_0%_100%,_#3fe9ff,_#0000ff80,_transparent)] shadow-[-8px_8px_20px_#0051ff2d]"></div>
          <div className="relative z-10 px-4 py-2 rounded-md bg-[radial-gradient(circle_60px_at_80%_-50%,_#777777,_#0f1111)]">
            Upload
          </div>
          <div className="absolute top-0 right-0 w-[60%] h-[55%] rounded-[100px] shadow-[0_0_15px_#ffffff38] z-[-1]"></div>
        </button>
      </Link>
      <Link href="/">
        <button className="relative cursor-pointer text-white text-lg rounded-lg p-[1px] border border-gray-300 bg-[radial-gradient(circle_60px_at_80%_-10%,_#ffffff,_#181b1b)]">
          <div className="absolute w-[50px] h-full rounded-lg bottom-0 left-0 bg-[radial-gradient(circle_40px_at_0%_100%,_#3fe9ff,_#0000ff80,_transparent)] shadow-[-8px_8px_20px_#0051ff2d]"></div>
          <div className="relative z-10 px-4 py-2 rounded-md bg-[radial-gradient(circle_60px_at_80%_-50%,_#777777,_#0f1111)]">
            Download
          </div>
          <div className="absolute top-0 right-0 w-[60%] h-[55%] rounded-[100px] shadow-[0_0_15px_#ffffff38] z-[-1]"></div>
        </button>
      </Link>
    </div>
  );
}

export default Navbar;
