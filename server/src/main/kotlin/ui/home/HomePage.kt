package dev.zprecreated.ui.home

import dev.zprecreated.model.account.PlayerAccount
import dev.zprecreated.ui.Styles
import dev.zprecreated.ui.component.Button
import dev.zprecreated.ui.component.ButtonProps
import kotlinx.html.*

fun FlowContent.HomePage(account: PlayerAccount?, news: Pair<List<String>, Boolean>) {
    div(classes = "flex flex-col gap-2") {
        div(classes = "select-none p-3 text-center") {
            h1(classes = "${Styles.fontFamily(Styles.fontGameLogo)} text-7xl") {
                style = Styles.textLinearGradientStyle(
                    "bottom", Styles.homeGameLogoGradientStart, Styles.homeGameLogoGradientEnd, 0, 100
                )
                +"ZOMBIE PANDEMIC"
            }
            h1(classes = "${Styles.fontFamily(Styles.fontGameLogo)} text-7xl") {
                style = Styles.textStrokeStyle(5, Styles.colorPrimary)
                +"RECREATED"
            }
        }
        div(classes = "flex h-17 items-center justify-center rounded-md") {
            style = Styles.bgLinearGradientStyle(
                "bottom", Styles.playBgGradientStart, Styles.playBgGradientEnd, 0, 100
            )
            Button(
                props = ButtonProps(
                    classes = "playbtn-shadow inline-block cursor-pointer rounded-md px-10 py-2",
                    style = Styles.bgLinearGradientStyle(
                        "bottom", Styles.playBtnGradientStart, Styles.playBtnGradientEnd, 0, 100,
                    ),
                    hxGet = "/play",
                    hxTarget = "main-content"
                )
            ) {
                p(classes = "${Styles.fontFamily(Styles.fontRusso)} text-lg ${Styles.textStrokeStyle(2, "black")}") {
                    +"PLAY"
                }
            }
        }
        div(classes = "flex justify-center") {
            div(classes = "grid grid-cols-1 gap-2 ${Styles.fontFamily(Styles.fontSerif)} md:grid-cols-2") {
                div(classes = "flex flex-col gap-2") {
                    HomeCard {
                        PreviewSection()
                    }
                    HomeCard(HomeCardProps(classes = "mb-4 break-inside-avoid")) {
                        NewsSection(news)
                    }
                }
                div(classes = "mx-auto flex w-full max-w-[25rem] flex-col gap-2 md:mx-0") {
                    HomeCard(HomeCardProps(classes = "w-full break-inside-avoid")) {
                        AuthSection(account)
                    }
                    HomeCard(HomeCardProps(classes = "w-full break-inside-avoid")) {

                    }
                }
            }
        }
        /*

            <HomeCard className="">
              <Preview />
            </HomeCard>
            <HomeCard className="mb-4 break-inside-avoid">
              <News />
            </HomeCard>

            <HomeCard className="w-full break-inside-avoid">
              <Auth account={props.account} formRef={authFormRef} onPlayAsGuest={props.onPlayAsGuest} />
            </HomeCard>
            <HomeCard className="w-full break-inside-avoid">
              <About />
            </HomeCard>

         */
    }
}
