import type { NextPage } from "next";
import { Bracket } from "../components/Bracket";
import nodeData from "../public/data.json";

const Home: NextPage = () => {
  return (
    <div className="p-4 flex flex-col gap-14">
      <div className="flex flex-col items-left">
        <h1 className="text-5xl font-semibold mb-4">Most Recent Tournament</h1>
        <div className="flex flex-row items-center gap-2">
          <h2 className="p-2 bg-green-500 text-white font-semibold">
            Grandslam: Wimbledon
          </h2>
          <h2 className="p-[6.2px] border-2 border-gray-500">
            Played on January 2020
          </h2>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Bracket nodeData={nodeData} />
      </div>
    </div>
  );
};

export default Home;
