import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex flex-col p-4 mt-6 mb-6">
      <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
        <Link href="/" passHref>
          <h1 className="text-lg text-gray-500 font-mono cursor-pointer md:text-2xl">
            Grandslam Bracket
          </h1>
        </Link>
        <div className="flex flex-row justify-center gap-8">
          <Link href="/about" passHref>
            <h1 className="text-lg text-gray-500 font-mono underline underline-offset-2 decoration-4 decoration-gray-400 cursor-pointer md:text-2xl">
              About
            </h1>
          </Link>
          <Link href="/tournaments" passHref>
            <h1 className="text-lg text-gray-500 font-mono underline underline-offset-2 decoration-4 decoration-gray-400 cursor-pointer md:text-2xl">
              Tournaments
            </h1>
          </Link>
          <a
            className="text-lg text-gray-500 font-mono underline underline-offset-2 decoration-4 decoration-gray-400 cursor-pointer md:text-2xl"
            href="https://twitter.com/alibuilds"
          >
            Contact
          </a>
        </div>
      </div>
      <div className="w-full h-2 bg-black"></div>
    </div>
  );
};

export default Navbar;
