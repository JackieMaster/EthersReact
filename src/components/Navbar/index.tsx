import React from "react";

export default function NavBar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <img
                  src="https://assets.coingecko.com/coins/images/12271/thumb/512x512_Logo_no_chop.png?1606986688"
                  alt="Logo"
                  className="h-8 w-8 mr-2"
                />
                <span className="font-semibold text-gray-500 text-lg">
                  SushiRoll
                </span>
              </a>
            </div>
          </div>

          <div className=" flex items-center space-x-3 ">
            <a
              href=""
              className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300"
            >
              Connect Wallet
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
