import type { NextPage } from "next";
import Image from "next/image";

const About: NextPage = () => {
  return (
    <div className="p-4 flex flex-col gap-y-6 relative">
      <div>
        <Image
          src="/court.jpg"
          width={"1200"}
          height={"600"}
          className="rounded-xl"
        />
        <div className="text-right text-xs md:text-sm">
          Photo by{" "}
          <a
            className="underline"
            href="https://unsplash.com/@ryansearle?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          >
            Ryan Searle
          </a>{" "}
          on Unsplash
        </div>
      </div>
      <div className="flex flex-col gap-y-4 backdrop-blur-sm bg-gray-50 bg-opacity-10 h-full">
        <div className="text-4xl font-bold md:text-6xl ">About</div>
        <div className="w-full h-1 bg-gray-500"></div>
        <div className="text-md tracking-wide text-justify md:text-2xl">
          As a tennis fanatic myself, I&apos;ve always enjoyed following the ATP
          and WTA Grandslam tournaments (Vamos Rafa!). While match schedules and
          timings were always easy to find, I noticed the same couldn't be said
          for tournament brackets.
        </div>
        <div className="text-md tracking-wide text-justify md:text-2xl">
          Grandslam Bracket was created to solve this exact problem. You can
          easily relive tennis history through radial brackets spanning from the
          year 2000 to the present, for both ATP and WTA Grandslam tournaments.
          We'll be adding the latest tournaments as the events take place!
        </div>
        <div className="text-md tracking-wide text-justify md:text-2xl">
          If you found this site helpful, consider sharing it with a friend.
          Notice any bugs or have any feature requests? Feel free to send me a
          message! Always open to hearing ways to improve and make the site
          better.
        </div>
      </div>
    </div>
  );
};

export default About;
