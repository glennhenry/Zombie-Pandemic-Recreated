import textLinearGradientStyle from "../../utils/textGradient";
import textStrokeStyle from "../../utils/textStroke";

export default function Homepage() {
    return (
        <>
            <div className="text-center p-3">
                <h1
                    className="font-game-logo text-7xl"
                    style={textLinearGradientStyle(
                        "bottom",
                        "--color-gradient-start",
                        "--color-gradient-end", 0, 100
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
        </>
    );
}
