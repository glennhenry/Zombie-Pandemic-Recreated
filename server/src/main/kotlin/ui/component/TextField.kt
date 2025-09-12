package dev.zprecreated.ui.component

import kotlinx.html.FlowContent
import kotlinx.html.InputType
import kotlinx.html.div
import kotlinx.html.input
import kotlinx.html.onChange
import kotlinx.html.onClick
import kotlinx.html.onInput

data class TextFieldProps(
    val value: String = "",
    val placeholder: String = "",
    val hide: Boolean = false,
    val required: Boolean = false,
    val classes: String = "",
    val onToggleHideJs: String? = null,
)

fun FlowContent.TextField(props: TextFieldProps = TextFieldProps(), content: FlowContent.() -> Unit = {}) {
    div(classes = "relative ${props.classes}") {
        input(classes = "w-full rounded-sm bg-gray-100 p-2 pr-10 text-gray-700 placeholder-gray-400") {
            value = props.value
            type = if (props.hide) InputType.text else InputType.password
            required = props.required
            placeholder = props.placeholder

            // optional toggle (like password eye button)
            if (props.onToggleHideJs != null) {
                div(classes = "absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer text-gray-500") {
                    onClick = props.onToggleHideJs
                    content()
                }
            }
        }
    }
}
