package dev.zprecreated.ui.component

import dev.zprecreated.model.account.PlayerAccount
import dev.zprecreated.ui.Styles
import kotlinx.html.*

fun FlowContent.TopAppBar(account: PlayerAccount?, topbarClosed: Boolean) {
    if (!topbarClosed) {
        div(classes = "flex items-center justify-between ${Styles.bg(Styles.colorAppBar)} px-4 text-right text-xs") {
            id = "topbar"

            a(classes = "${Styles.font(Styles.fontGameLogo)} text-2xl") {
                href = "/"
                title = "Home"
                +"ZP"
            }

            if (account != null) {
                p {
                    +"Logged in as: "
                    span(classes = Styles.emphasizedText) { +account.username }
                    +" - "
                    span(classes = Styles.emphasizedText) { +account.email }
                    +" | "
                    button(classes = Styles.emphasizedLinkText) {
                        attributes["hx-post"] = "/logout"
                        attributes["hx-target"] = "body"
                        +"Logout"
                    }
                }
            } else {
                p { +"Not logged in" }
            }
        }
    }
}

fun FlowContent.CloseTopBarButton(topbarClosed: Boolean) {
    button(classes = "absolute ${if (topbarClosed) "top-2" else "top-10"} left-2 z-10 flex items-center justify-center rounded-md bg-white/80 p-1 text-gray-700 opacity-40 shadow-md hover:bg-white hover:opacity-80 active:scale-95") {
        id = "toggle-topbar-btn"
        title = if (topbarClosed) "Show topbar" else "Hide topbar"
        i(classes = if (topbarClosed) "fa-solid fa-chevron-down" else "fa-solid fa-chevron-up") {}
    }
}
