import { FaDiscord } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa6";

export default function Header() {
  return (
    <div className="bg-pine-cone-900">
      <div className="content-container">
        <header className="drop-shadow-lg font-heading text-2xl flex items-center justify-between px-3 py-2">
          <h1 className="text-white drop-shadow-[0_1.1px_1.2px_rgba(0,0,0,1)]">
            ZombiePandemic
            <span className="text-red-600 drop-shadow-[0_1.1px_1.2px_rgba(0,0,0,0.8)]">
              Recreated
            </span>
          </h1>
          <div className="flex items-center gap-2">
            <a href="https://discord.gg/Yrzsk7n6nf" target="_blank">
              <FaDiscord
                size={35}
                className="text-white bg-[#5865F2] rounded-full p-1"
              />
            </a>
            <a
              href="https://github.com/glennhenry/Zombie-Pandemic-Recreated"
              target="_blank"
            >
              <FaGithub
                size={35}
                className="text-black bg-white rounded-full p-1"
              />
            </a>
          </div>
        </header>
      </div>
    </div>
  );
}
