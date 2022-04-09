const Footer = () => {
  return (
    <div className="flex flex-col p-4 mt-6 mb-6">
      <div className="w-full h-2 bg-black mb-6"></div>
      <div className="flex flex-row items-baseline justify-between">
        <div className="flex flex-col gap-2 justify-baseline">
          <h1 className="text-lg text-gray-500 font-mono md:text-2xl">
            Grandslam Bracket
          </h1>
          <div className="text-md text-gray-500 font-mono md:text-lg">
            Relive tennis history
          </div>
        </div>
        <div className="flex flex-col gap-2 justify-baseline">
          <a
            className="text-lg text-gray-500 text-right font-mono underline underline-offset-2 decoration-2 decoration-gray-400 md:text-2xl"
            href="https://twitter.com/alibuilds"
          >
            Twitter
          </a>
          <h1 className="text-md text-gray-500 text-right font-mono md:text-lg">
            Built by Ali Hussain
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
