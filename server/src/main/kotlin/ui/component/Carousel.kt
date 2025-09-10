package dev.zprecreated.ui.component

import dev.zprecreated.ui.Styles
import dev.zprecreated.ui.home.ImagePreview
import kotlinx.html.FlowContent
import kotlinx.html.div
import kotlinx.html.i
import kotlinx.html.id
import kotlinx.html.img

const val CAROUSEL_ID = "carousel-scroll"

fun FlowContent.Carousel(
    images: List<ImagePreview>,
    selected: Int,
    onSelect: String, // hx-get or data-action
    classes: String = ""
) {
    div(classes = "flex h-25 w-full flex-row gap-2 $classes") {
        // Left arrow
        ArrowSwitch(left = true, action = "$onSelect?idx=${maxOf(0, selected - 1)}")

        // Thumbnails
        div(classes = "flex flex-row gap-2 overflow-x-hidden") {
            id = CAROUSEL_ID

            images.forEachIndexed { idx, image ->
                div(classes = "flex-none") {
                    Overlay(props = OverlayProps(enabled = idx == selected, hoverEnabled = idx != selected)) {
                        img(
                            src = image.path,
                            alt = image.alt,
                            classes = "select-none max-h-25 object-contain cursor-pointer"
                        ) {
                            attributes["data-action"] = "$onSelect?idx=$idx"
                        }
                    }
                }
            }
        }

        // Right arrow
        ArrowSwitch(left = false, action = "$onSelect?idx=${minOf(images.size - 1, selected + 1)}")
    }
}

fun FlowContent.ArrowSwitch(left: Boolean, action: String) {
    val iconClass = if (left) "fa-solid fa-arrow-left" else "fa-solid fa-arrow-right"

    div(
        classes = "flex h-25 w-10 cursor-pointer items-center justify-center ${Styles.bg(Styles.colorHomeArrowContainer)} hover:${
            Styles.bg(
                Styles.colorHomeArrowContainerHovered
            )
        }"
    ) {
        attributes["hx-get"] = action
        attributes["hx-target"] = "#$CAROUSEL_ID"
        i(classes = iconClass) {}
    }
}
