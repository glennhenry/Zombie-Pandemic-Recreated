package dev.zprecreated

import dev.zprecreated.model.account.PlayerAccount
import dev.zprecreated.ui.CommonHead
import dev.zprecreated.ui.home.HomePage
import dev.zprecreated.ui.layout.BaseLayout
import dev.zprecreated.ui.play.PlayPage
import io.ktor.server.application.*
import io.ktor.server.html.*
import io.ktor.server.http.content.*
import io.ktor.server.routing.*
import kotlinx.html.body
import kotlinx.html.head
import java.io.File

fun Application.configureRouting() {
    val account = PlayerAccount.guest()

    routing {
        // assets directory is on static/
        // for compactness, routes use assets/ (for web assets) and game/ (for game assets)
        // which will be redirected to the corresponding directory
        staticFiles("assets", File("server/static/web-assets"))
        staticFiles("game", File("server/static/game-assets"))

        get("/") {
            call.respondHtml {
                head {
                    CommonHead(play = false)
                }
                body {
                    BaseLayout(account, topbarClosed = false) {
                        HomePage()
                    }
                }
            }
        }

        get("/play") {
            call.respondHtml {
                head {
                    CommonHead(play = true)
                }
                body {
                    BaseLayout(account, topbarClosed = false) {
                        PlayPage()
                    }
                }
            }
        }
    }
}
