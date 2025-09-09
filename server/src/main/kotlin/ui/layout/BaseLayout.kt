package dev.zprecreated.ui.layout

import dev.zprecreated.Account
import dev.zprecreated.ui.component.CloseTopBarButton
import dev.zprecreated.ui.component.Footer
import dev.zprecreated.ui.component.TopAppBar
import kotlinx.html.FlowContent
import kotlinx.html.div
import kotlinx.html.main

fun FlowContent.BaseLayout(account: Account?, topbarClosed: Boolean, mainContent: FlowContent.() -> Unit) {
    div(classes = "w-full min-h-screen bg-[#050505] bg-[url(assets/bg.jpg)] bg-cover bg-top bg-no-repeat") {
        TopAppBar(account = account, topbarClosed = topbarClosed)
        CloseTopBarButton(topbarClosed = topbarClosed)
        main(classes = "container min-h-[100vh] pb-20") {
            mainContent()
        }
        Footer()
    }
}
