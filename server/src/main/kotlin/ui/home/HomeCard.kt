package dev.zprecreated.ui.home

import dev.zprecreated.ui.Styles
import kotlinx.html.FlowContent
import kotlinx.html.div

data class HomeCardProps(
    val classes: String = "",
)

fun FlowContent.HomeCard(props: HomeCardProps = HomeCardProps(), content: FlowContent.() -> Unit) {
    div(classes = "${Styles.bg(Styles.colorBaseContainer)} p-4 border-2 border-[#A1A1A1] ${props.classes}") {
        content()
    }
}
