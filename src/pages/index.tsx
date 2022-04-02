import type { NextPage, GetStaticProps, InferGetStaticPropsType } from "next";
import { Bracket } from "../components/Bracket";
import Redis from "ioredis";
import { tournamentParams } from "../utils/utils";

const Home: NextPage = ({
  data,
  league,
  wincolor,
  hovercolor,
  tournament,
  date,
  color,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="p-4 flex flex-col gap-14">
      <div className="flex flex-col items-left">
        <h1 className="text-5xl font-semibold mb-4">Most Recent Tournament</h1>
        <div className="flex flex-row items-center gap-2">
          <h2 className={`p-2 ${color} text-white font-semibold`}>
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
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const REDIS_PASSWORD = process.env.REDIS_PASS;
  const REDIS_ENDPOINT = process.env.REDIS_HOST;
  const REDIS_PORT = process.env.REDIS_PORT;
  const redis = new Redis(
    `redis://:${REDIS_PASSWORD}@${REDIS_ENDPOINT}:${REDIS_PORT}`
  );

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
      color,
    },
  };
};

export default Home;
