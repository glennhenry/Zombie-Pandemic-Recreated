package dev.zprecreated.ui.component

import dev.zprecreated.ui.Styles
import kotlinx.html.FlowContent
import kotlinx.html.button
import kotlinx.html.onClick

data class ButtonProps(
    val baseColor: String = Styles.bgColor(Styles.colorPrimary),
    val hoverColor: String = "hover:${Styles.bgColor(Styles.colorPrimary)}/80",
    val activeColor: String = "active:${Styles.bgColor(Styles.colorPrimary)}/70",
    val type: ButtonType = ButtonType.Button,
    val classes: String = "",
    val style: String? = null,
    val jsOnClick: String? = null,

    // htmx-specific
    val hxGet: String? = null,
    val hxPost: String? = null,
    val hxTarget: String? = null,
    val hxSwap: String? = null,
    val hxTrigger: String? = null,
)

enum class ButtonType {
    Button, Submit, Reset
}

/**
 * Button component
 *
 * @jsOnClick A call to inline JS function. JS must be implemented and the script must be added to HEAD.
 */
fun FlowContent.Button(
    props: ButtonProps = ButtonProps(),
    content: FlowContent.() -> Unit
) {
    button(classes = "cursor-pointer ${props.baseColor} ${props.hoverColor} ${props.activeColor} ${props.classes}") {
        attributes["type"] = props.type.name
        props.style?.let { attributes["style"] = it }
        props.jsOnClick?.let { onClick = it }

        // htmx
        props.hxGet?.let { attributes["hx-get"] = it }
        props.hxPost?.let { attributes["hx-post"] = it }
        props.hxTarget?.let { attributes["hx-target"] = it }
        props.hxSwap?.let { attributes["hx-swap"] = it }
        props.hxTrigger?.let { attributes["hx-trigger"] = it }

        content()
    }
}
