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
                  font-family: var(--font-mono);
                }

                body {
                  color: white;
                  font-family: var(--font-paragraph);
                }
                """.trimIndent()
        )
    }
}

object Styles {
    // Fonts
    const val fontHeading = "font-['Rum_Raisin']"
    const val fontMono = "font-['Source_Code_Pro']"
    const val fontSerif = "font-['Noto_Serif']"

    // const val fontParagraph = "font-['Inter']" // optional
    const val fontGameLogo = "font-['Just_Another_Hand']"
    const val fontRusso = "font-['Russo_One']"

    // Logo gradient
    const val gradientStart = "#ffffff"
    const val gradientEnd = "#424242"

    // Play Button gradients
    const val playBgGradientStart = "#d9d9d9"
    const val playBgGradientEnd = "#737373"
    const val playBtnGradientStart = "#642020"
    const val playBtnGradientEnd = "#911c1c"

    // Backgrounds
    const val colorAppBar = "#131313"
    const val colorBaseContainer = "#202020"
    const val colorStrokeBaseContainer = "#a1a1a1"
    const val colorHomeArrowContainer = "#616161"
    const val colorHomeArrowContainerHovered = "#6b6b6b"

    // Text
    const val colorHeading = "#eeeeee"
    const val colorParagraph = "#a1abb5"
    const val colorEmphasized = "#c14444"
    const val colorEmphasizedHover = "#d86767"

    // Brand Colors
    const val colorPrimary = "#b31c1c"

    // Status Colors
    const val colorStatusGood = "#83e864"
    const val colorStatusBad = "#c74e4e"
    const val colorStatusNeutral = "#d9b93a"

    // Game / Topbar
    const val colorTopbarGradientStart = "#545451"
    const val colorTopbarGradientEnd = "#444444"

    // Buttons
    const val playButton = """
        bg-gradient-to-b from-[#642020] to-[#911c1c] 
        text-white px-6 py-2 rounded shadow-md 
        transition-colors duration-300 hover:brightness-110
    """

    // Others
    const val emphasizedText = "text-emphasized underline hover:text-emphasized-hover"
    const val emphasizedLinkText = "cursor-pointer transition-colors duration-300 hover:text-white"

    const val playButtonShadow = "shadow-[0px_3px_4px_3px_rgba(0,0,0,0.5)]"

    fun bg(color: String) = "bg-[$color]"
    fun text(color: String) = "text-[$color]"
}
