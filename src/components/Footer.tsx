const Footer = () => {
  return (
    <div className="flex flex-col p-4 mt-6 mb-6">
      <div className="w-full h-2 bg-black mb-6"></div>
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-lg text-gray-500 font-mono md:text-2xl">
          Grandslam Bracket
        </h1>
        <div className="flex flex-row justify-center gap-8">
          <h1 className="text-lg text-gray-500 text-right font-mono md:text-2xl">
            Built by Ali Hussain
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Footer;
