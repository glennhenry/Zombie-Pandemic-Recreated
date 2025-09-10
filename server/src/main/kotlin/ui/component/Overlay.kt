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

/**
 * Overlay component
 *
 * To re-render or toggle overlay it must be done from JS
 */
fun FlowContent.Overlay(
    props: OverlayProps = OverlayProps(),
    dataIdx: Int? = null,
    content: FlowContent.() -> Unit
) {
    div(classes = "relative overflow-hidden group ${props.classes}") {
        // Attach data-idx to the Overlay container if provided
        // This allows JS to detect click even if an overlay is covering it
        if (dataIdx != null) attributes["data-idx"] = dataIdx.toString()

        content() // render inner content (e.g., img)

        div(
            classes = "absolute inset-0 flex items-center justify-center transition-opacity ${props.color}"
        ) {
            attributes["data-overlay"] = "true"
            if (props.enabled) attributes["data-selected"] = "true"
        }
    }
}
