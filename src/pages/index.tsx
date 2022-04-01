import type { NextPage } from "next";
import { Bracket } from "../components/Bracket";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Hello World!</h1>
      <Bracket />
    </div>
  );
};

export default Home;
