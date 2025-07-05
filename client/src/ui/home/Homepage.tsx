import {
  textLinearGradientStyle,
  bglinearGradientStyle,
} from "../../utils/linearGradient";
import textStrokeStyle from "../../utils/textStroke";

export default function Homepage() {
  return (
    <div className="flex flex-col">
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
          style={textStrokeStyle(5, "--color-primary")}
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
    </div>
  );
}
