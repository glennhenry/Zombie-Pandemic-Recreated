package dev.zprecreated.ui.component

import dev.zprecreated.ui.Styles
import dev.zprecreated.ui.home.ImagePreview
import kotlinx.html.Draggable
import kotlinx.html.FlowContent
import kotlinx.html.div
import kotlinx.html.draggable
import kotlinx.html.i
import kotlinx.html.id
import kotlinx.html.img

fun FlowContent.Carousel(
    images: List<ImagePreview>,
    selected: Int,
    carouselId: String,
    classes: String = ""
) {
    div(classes = "flex h-25 w-full flex-row gap-2 $classes") {
        id = carouselId
        attributes["data-carousel"] = "true" // mark the element as carousel

        ArrowSwitch(left = true, carouselId)

        // Thumbnails and scroll container
        div(classes = "flex flex-row gap-2 overflow-x-hidden cursor-pointer") {
            id = "$carouselId-scroll"

            images.forEachIndexed { idx, image ->
                div(classes = "flex-none") {
                    draggable = Draggable.htmlFalse
                    Overlay(
                        props = OverlayProps(
                            enabled = idx == selected,
                            hoverEnabled = true,
                        ),
                        dataIdx = idx // overlay covers the image, attach index here
                    ) {
                        img(
                            src = image.path,
                            alt = image.alt,
                            classes = "select-none max-h-25 object-contain cursor-pointer"
                        ) {
                            draggable = Draggable.htmlFalse
                        }
                    }
                }
            }
        }

        ArrowSwitch(left = false, carouselId)
    }
}

fun FlowContent.ArrowSwitch(left: Boolean, carouselId: String) {
    val iconClass = if (left) "fa-solid fa-arrow-left" else "fa-solid fa-arrow-right"

    div(
        classes = "flex h-25 w-10 cursor-pointer items-center justify-center ${Styles.bgColor(Styles.colorHomeArrowContainer)} hover:${
            Styles.bgColor(
                Styles.colorHomeArrowContainerHovered
            )
        }"
    ) {
        attributes["data-arrow"] = if (left) "left" else "right" // left or right arrow
        attributes["data-carousel"] = carouselId // which carousel does the arrow belongs to
        i(classes = iconClass) {}
    }
}
