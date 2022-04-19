import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Bracket } from "../components/Bracket";
import { tournamentParams } from "../utils/utils";
import redis from "../utils/redis";
import Head from "next/head";

const Home: NextPage = ({
  data,
  league,
  wincolor,
  hovercolor,
  tournament,
  date,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Grandslam Bracket Home</title>
      </Head>
      <div className="p-4 flex flex-col gap-14">
        <div className="flex flex-col items-left">
          <h1 className="text-5xl font-semibold mb-4">
            Most Recent Grand Slam
          </h1>
          <div className="flex flex-row items-center gap-2">
            <h2 className="p-2 bg-emerald-700 text-white font-semibold">
              Grandslam: {tournament}
            </h2>
            <h2 className="p-[6.2px] border-2 border-gray-500">{date}</h2>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <Bracket
            nodeData={data}
            league={league}
            wincolor={wincolor}
            hovercolor={hovercolor}
          />
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const year = new Date().getUTCFullYear();
  const month = new Date().getUTCMonth() + 1;
  let key = "";

  if (month < 3) {
    key = `atp/us-open/${year - 1}`;
  } else if (month < 7) {
    key = `atp/australian-open/${year}`;
  } else if (month < 8) {
    key = `atp/roland-garros/${year}`;
  } else if (month < 10) {
    key = `atp/wimbledon/${year}`;
  } else {
    key = `atp/us-open/${year}`;
  }

  let data: any = await redis.get(key);
  data = JSON.parse(data);

  let i_league = key.split("/")[0];
  let i_tournament = key.split("/")[1];
  let i_date = key.split("/")[2];

  let { color, wincolor, hovercolor, date, tournament, league } =
    tournamentParams(i_league, i_tournament, i_date);

  return {
    props: {
      data,
      league,
      wincolor,
      hovercolor,
      tournament,
      date,
    },
  };
};

export default Home;
