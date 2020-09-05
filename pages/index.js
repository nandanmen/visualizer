import React from "react";

import algorithms from "../algorithms/sliding-window";
import { Algorithm } from "../components/Algorithm";
import { SlidingWindow } from "../screens/SlidingWindow";

function Home() {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <main style={{ minWidth: "50vw" }}>
        <Algorithm algorithms={algorithms} title="Sliding Window">
          <SlidingWindow />
        </Algorithm>
      </main>
    </div>
  );
}

export default Home;
