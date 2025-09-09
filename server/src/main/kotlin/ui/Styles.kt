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
                }

                code {
                  font-family: ${Styles.fontMono};
                }

                body {
                  color: white;
                  font-family: ${Styles.fontParagraph};
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
    const val fontParagraph = "sans-serif"

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

    // Gradients
    const val gradientStart = "#ffffff"
    const val gradientEnd = "#424242"
    const val colorTopbarGradientStart = "#545451"
    const val colorTopbarGradientEnd = "#444444"
    const val playBtnGradientStart = "#642020"
    const val playBtnGradientEnd = "#911c1c"

    // Others
    const val emphasizedText = "text-[${colorEmphasized}] underline hover:text-[${colorEmphasizedHover}]"
    const val emphasizedLinkText = "cursor-pointer transition-colors duration-300 hover:text-white"

    // Tailwind styling utility
    fun bg(color: String) = "bg-[$color]"
    fun text(color: String) = "text-[$color]"
    fun font(font: String) = "font-[${font.replace(" ", "_").replace(",", "")}]"
}
