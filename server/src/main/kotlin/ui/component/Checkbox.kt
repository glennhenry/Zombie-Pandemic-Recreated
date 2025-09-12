package dev.zprecreated.ui.component

import kotlinx.html.FlowContent
import kotlinx.html.InputType
import kotlinx.html.div
import kotlinx.html.input
import kotlinx.html.onChange

data class CheckboxProps(
    val isChecked: Boolean = false,
    val classes: String = "",

    val onChangeJs: String? = null, // client handler
    val hxPost: String? = null,
    val hxTrigger: String? = "change"
)

fun FlowContent.Checkbox(props: CheckboxProps, content: (FlowContent.() -> Unit)?) {
    div(classes = "flex gap-2") {
        input(type = InputType.checkBox, classes = props.classes) {
            if (props.isChecked) checked = true

            // client-side binding
            props.onChangeJs?.let { onChange = it }

            // htmx binding
            props.hxPost?.let {
                attributes["hx-post"] = it
                attributes["hx-trigger"] = props.hxTrigger ?: "change"
            }
        }
        content?.invoke(this)
    }
}
