import Redis from "ioredis";
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { Bracket } from "../../components/Bracket";

export const getStaticPaths: GetStaticPaths = async () => {
  const REDIS_PASSWORD = process.env.REDIS_PASS;
  const REDIS_ENDPOINT = process.env.REDIS_HOST;
  const REDIS_PORT = process.env.REDIS_PORT;
  const redis = new Redis(
    `redis://:${REDIS_PASSWORD}@${REDIS_ENDPOINT}:${REDIS_PORT}`
  );
  const keys = await redis.keys("*");
  const paths = keys.map((key) => {
    return {
      params: {
        id: key.split("/"),
      },
    };
  });
  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context: any) => {
  const REDIS_PASSWORD = process.env.REDIS_PASS;
  const REDIS_ENDPOINT = process.env.REDIS_HOST;
  const REDIS_PORT = process.env.REDIS_PORT;
  const redis = new Redis(
    `redis://:${REDIS_PASSWORD}@${REDIS_ENDPOINT}:${REDIS_PORT}`
  );
  const key = context.params.id.join("/");
  let data: any = await redis.get(key);
  data = JSON.parse(data);
  return {
    props: {
      data,
    },
  };
};

const Result: NextPage = ({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter();
  const { id } = router.query;

  let league = id![0];
  let tournament = id![1];
  let date = id![2];
  let color = "";
  let wincolor = "";
  let hovercolor = "";

  if (tournament == "us-open") {
    tournament = "US Open";
    date = `Played on August ${date}`;
    color = "bg-blue-700";
    wincolor = "#2563eb";
    hovercolor = "#1d4ed8";
  } else if (tournament == "wimbledon") {
    tournament = "Wimbledon";
    date = `Played on June ${date}`;
    color = "bg-green-500";
    wincolor = "#4ade80";
    hovercolor = "#22c55e";
  } else if (tournament == "roland-garros") {
    tournament = "Roland Garros";
    date = `Played on May ${date}`;
    color = "bg-orange-500";
    wincolor = "#fb923c";
    hovercolor = "#f97316";
  } else if (tournament == "australian-open") {
    tournament = "Australian Open";
    date = `Played on January ${date}`;
    color = "bg-sky-500";
    wincolor = "#38bdf8";
    hovercolor = "#0ea5e9";
  }

  return (
    <div className="p-4 flex flex-col gap-14">
      <div className="flex flex-col items-left">
        <h1 className="text-5xl font-semibold mb-4">
          {league.toUpperCase()} Grandslam
        </h1>
        <div className="flex flex-row items-center gap-2">
          <h2 className={`p-2 ${color} text-white font-semibold`}>
            Tournament: {tournament}
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

export default Result;
