package dev.zprecreated.ui

import kotlinx.html.STYLE
import kotlinx.html.unsafe

/**
 * Important CSS styles
 */
fun STYLE.GlobalStyle() {
    unsafe {
        raw(
            """
                @layer base {
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }
                }

                html, body {
                  overflow-x: auto;
                  min-width: 800px;
                }

                .container {
                  width: 92%;
                  max-width: 1200px;
                  height: 100%;
                  margin: 0 auto;
                }

                @media (max-width: 799px) {
                  .container {
                    width: 100% !important;
                  }
                }

                h1, h2, h3, h4, h5, h6 {
                  text-wrap: balance;
                  color: ${Styles.colorHeading};
                }

                code {
                  font-family: ${Styles.fontMono};
                }

                body {
                  color: white;
                  font-family: ${Styles.fontParagraph};
                }
                
                .playbtn-shadow {
                  box-shadow: 0px 3px 4px 3px rgba(0, 0, 0, 0.5);
                }
                
                [data-overlay] {
                  opacity: 0;
                }
                [data-overlay][data-selected] {
                  opacity: 1; /* always visible on selected */
                }
                .group:hover [data-overlay]:not([data-selected]) {
                  opacity: 1; /* visible on hover */
                }
                """.trimIndent()
        )
    }
}

object Styles {
    // Fonts
    const val fontHeading = "Rum Raisin"
    const val fontMono = "Source Code Pro"
    const val fontSerif = "Noto Serif"
    const val fontGameLogo = "Just Another Hand"
    const val fontRusso = "Russo One"
    const val fontParagraph = "Inter"

    // Colors
    const val colorAppBar = "#131313"
    const val colorBaseContainer = "#202020"
    const val colorStrokeBaseContainer = "#a1a1a1"
    const val colorHomeArrowContainer = "#616161"
    const val colorHomeArrowContainerHovered = "#6b6b6b"
    const val colorHeading = "#eeeeee"
    const val colorParagraph = "#a1abb5"
    const val colorEmphasized = "#c14444"
    const val colorEmphasizedHover = "#d86767"
    const val colorPrimary = "#b31c1c"
    const val colorStatusGood = "#83e864"
    const val colorStatusBad = "#c74e4e"
    const val colorStatusNeutral = "#d9b93a"

    // Logo
    const val homeGameLogoGradientStart = "#ffffff"
    const val homeGameLogoGradientEnd = "#424242"

    // Home play button
    const val playBgGradientStart = "#d9d9d9"
    const val playBgGradientEnd = "#737373"
    const val playBtnGradientStart = "#642020"
    const val playBtnGradientEnd = "#911c1c"

    // Game
    const val colorTopGameBarGradientStart = "#545451"
    const val colorTopGameBarGradientEnd = "#444444"

    // Others
    // For text styled like a link (non-emphasized)
    const val linkText = "cursor-pointer hover:text-white"

    // For emphasized text (highlighted but not clickable)
    const val emphasizedText = "text-[${colorEmphasized}] underline hover:text-[${colorEmphasizedHover}]"

    // For emphasized text that is also interactive (clickable like a link)
    const val emphasizedLinkText = "cursor-pointer $emphasizedText"

    // Tailwind styling utility
    fun bgColor(color: String) = "bg-[$color]"
    fun textColor(color: String) = "text-[$color]"
    fun fontFamily(font: String) = "font-[${font.replace(" ", "_").replace(",", "")}]"

    // Text stroke (multiple shadows hack)
    fun textStrokeStyle(strokeWidth: Int, color: String): String {
        val shadows = buildList {
            for (dx in -strokeWidth..strokeWidth) {
                for (dy in -strokeWidth..strokeWidth) {
                    if (dx == 0 && dy == 0) continue
                    add("${dx}px ${dy}px 0 $color")
                }
            }
        }
        return "text-shadow: ${shadows.joinToString(", ")};"
    }

    fun textLinearGradientStyle(
        direction: String = "right",
        fromColor: String,
        toColor: String,
        fromPercent: Int = 0,
        toPercent: Int = 100
    ): String {
        val gradient =
            "linear-gradient(to $direction, $fromColor $fromPercent%, $toColor $toPercent%)"
        return """
            background-image: $gradient;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        """.trimIndent()
    }

    fun bgLinearGradientStyle(
        direction: String = "right",
        fromColor: String,
        toColor: String,
        fromPercent: Int = 0,
        toPercent: Int = 100
    ): String {
        return "background-image: linear-gradient(to $direction, $fromColor $fromPercent%, $toColor $toPercent%);"
    }
}
