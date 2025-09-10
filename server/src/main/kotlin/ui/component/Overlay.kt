package dev.zprecreated.ui.component

import kotlinx.html.FlowContent
import kotlinx.html.div

data class OverlayProps(
    val color: String = "bg-black/30",
    val enabled: Boolean = false,
    val hoverEnabled: Boolean = false,
    val overlayContent: (FlowContent.() -> Unit)? = null,
    val classes: String = ""
)

fun FlowContent.Overlay(
    props: OverlayProps = OverlayProps(),
    content: FlowContent.() -> Unit
) {
    if (!props.enabled && props.overlayContent == null) {
        // No overlay, just render content
        content()
    } else {
        div(classes = "relative overflow-hidden ${if (props.hoverEnabled) "group" else ""} ${props.classes}") {
            content()

            div(
                classes = buildString {
                    append("absolute inset-0 flex items-center justify-center")
                    if (props.enabled && props.overlayContent == null) append(" ${props.color}")
                    if (props.hoverEnabled) append(" opacity-0 transition-opacity group-hover:opacity-100")
                }
            ) {
                props.overlayContent?.invoke(this)
            }
        }
    }
}
