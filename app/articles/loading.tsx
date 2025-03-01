import React from "react";

const loading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen dark:bg-gray-900 bg-white dark:text-white text-black">
      <div className="relative w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin flex items-center justify-center" style={{
        borderImage: "linear-gradient(45deg, #ff0000, #ff7300, #ffeb00, #47ff00, #00ffee, #0000ff, #7a00ff, #ff00ff) 1"
      }}>
        <span className="text-2xl">✋</span>
      </div>
      <p className="mt-4 text-lg font-semibold">Loading Article...</p>
      <p className="mt-2 text-sm text-gray-400">While we prepare your Article</p>
    </div>
  );
};

export default loading;