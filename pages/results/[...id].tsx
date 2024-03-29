import Head from "next/head";
import redis from "../../utils/redis";
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from "next";
import { useRouter } from "next/router";
import { Bracket } from "../../components/Bracket";
import { tournamentParams } from "../../utils/utils";

export const getStaticPaths: GetStaticPaths = async () => {
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

  let i_league = id![0];
  let i_tournament = id![1];
  let i_date = id![2];

  let { color, wincolor, hovercolor, date, tournament, league } =
    tournamentParams(i_league, i_tournament, i_date);

  return (
    <>
      <Head>
        <title>{`${i_league} ${i_tournament} ${i_date}`}</title>
      </Head>
      <div className="p-4 flex flex-col gap-14">
        <div className="flex flex-col items-left">
          <h1 className="text-5xl font-semibold mb-4">
            {league.toUpperCase()} Grandslam
          </h1>
          <div className="flex flex-row items-center gap-2">
            <h2 className={`p-2 bg-green-700 text-white font-semibold`}>
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
    </>
  );
};

export default Result;
