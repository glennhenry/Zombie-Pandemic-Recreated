import { FaDiscord } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="bg-base-100">
      <div className="content-container">
        <header className="font-heading flex items-center justify-between px-3 py-2 text-2xl drop-shadow-lg">
          <h1 className="text-white drop-shadow-[0_1.1px_1.2px_rgba(0,0,0,1)]">
            ZombiePandemic
            <span className="text-red-600 drop-shadow-[0_1.1px_1.2px_rgba(0,0,0,0.8)]">
              Recreated
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <a href="https://discord.gg/Yrzsk7n6nf" target="_blank">
              <FaDiscord
                size={25}
                className="rounded-full bg-[#5865F2] p-1 text-white"
              />
            </a>
            <a
              href="https://github.com/glennhenry/Zombie-Pandemic-Recreated"
              target="_blank"
            >
              <FaGithub
                size={25}
                className="rounded-full bg-white p-1 text-black"
              />
            </a>
          </div>
        </header>
      </div>
    </div>
  );
}
