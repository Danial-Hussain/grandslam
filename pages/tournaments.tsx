import Head from "next/head";
import type { NextPage } from "next";
import Tournament from "../components/Tournament";

const Tournaments: NextPage = () => {
  return (
    <>
      <Head>
        <title>Tournaments</title>
      </Head>
      <div className="p-4 flex flex-col gap-y-14">
        <div className="flex flex-col items-left">
          <h1 className="text-5xl font-semibold mb-4">
            Grand Slam Tournaments
          </h1>
        </div>
        <Tournament
          image={"/wimbledon.jpg"}
          name={"Wimbledon"}
          tournament_url={"wimbledon"}
          location={"London, England"}
          year={"1877"}
        />
        <Tournament
          image={"/us-open.jpg"}
          name={"US Open"}
          tournament_url={"us-open"}
          location={"New York, United States"}
          year={"1881"}
        />
        <Tournament
          image={"/roland-garros.jpg"}
          name={"Roland Garros"}
          tournament_url={"roland-garros"}
          location={"Paris, France"}
          year={"1891"}
        />
        <Tournament
          image={"/australian-open.jpg"}
          name={"Australian Open"}
          tournament_url={"australian-open"}
          location={"Melbourne, Australia"}
          year={"1905"}
        />
      </div>
    </>
  );
};

export default Tournaments;
