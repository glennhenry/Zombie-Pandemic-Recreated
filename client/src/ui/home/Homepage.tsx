import {
  textLinearGradientStyle,
  bglinearGradientStyle,
} from "../../utils/ui/linearGradient";
import textStrokeStyle from "../../utils/ui/textStroke";
import { HomeCard } from "../components/Card";
import About from "./sections/About";
import Auth from "./sections/Auth";
import News from "./sections/News";
import Preview from "./sections/Preview";

export default function Homepage() {
  return (
    <div className="flex flex-col gap-2">
      <div className="noselect p-3 text-center">
        <h1
          className="font-game-logo text-7xl"
          style={textLinearGradientStyle(
            "bottom",
            "--color-gradient-start",
            "--color-gradient-end",
            0,
            100,
          )}
        >
          ZOMBIE PANDEMIC
        </h1>
        <h1
          className="font-game-logo text-7xl"
          style={{
            ...textStrokeStyle(5, "--color-primary"),
          }}
        >
          RECREATED
        </h1>
      </div>
      <div
        className="flex h-17 items-center justify-center rounded-md"
        style={bglinearGradientStyle(
          "bottom",
          "--color-play-bg-gradient-start",
          "--color-play-bg-gradient-end",
          0,
          100,
        )}
      >
        <a
          href="/play"
          className="playbtn-shadow inline-block cursor-pointer rounded-md px-10 py-2"
          style={bglinearGradientStyle(
            "bottom",
            "--color-play-btn-gradient-start",
            "--color-play-btn-gradient-end",
            0,
            100,
          )}
        >
          <p className="font-russo text-lg" style={textStrokeStyle(2, "black")}>
            PLAY
          </p>
        </a>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 gap-2 font-serif md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <HomeCard className="">
              <Preview />
            </HomeCard>
            <HomeCard className="mb-4 break-inside-avoid">
              <News />
            </HomeCard>
          </div>
          <div className="mx-auto flex w-full max-w-[25rem] flex-col gap-2 md:mx-0">
            <HomeCard className="mb-4 w-full break-inside-avoid">
              <Auth />
            </HomeCard>
            <HomeCard className="mb-4 w-full break-inside-avoid">
              <About />
            </HomeCard>
          </div>
        </div>
      </div>
    </div>
  );
}
