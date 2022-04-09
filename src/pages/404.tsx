import type { NextPage } from "next";

const Custom404: NextPage = () => {
  return (
    <div className="flex flex-col gap-4 text-center items-center justify-center h-64">
      <div className="text-2xl text-gray-600 md:text-4xl">
        Looks like we haven&apos;t added that tournament yet.
      </div>
      <div className="text-lg text-gray-500 md:text-2xl">
        If you think there&apos;s a missing Grand Slam,{" "}
        <a
          className="text-emerald-700 text-lg font-semibold cursor-pointer md:text-2xl"
          href="https://twitter.com/alibuilds"
        >
          drop me a line
        </a>{" "}
        and I&apos;ll add it!
      </div>
    </div>
  );
};

export default Custom404;
