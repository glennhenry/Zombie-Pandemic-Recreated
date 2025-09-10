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

const val CAROUSEL_ID = "carousel"
const val CAROUSEL_THUMBNAIL_ID = "carousel-scroll"

fun FlowContent.Carousel(
    images: List<ImagePreview>,
    selected: Int,
    classes: String = ""
) {
    div(classes = "flex h-25 w-full flex-row gap-2 $classes") {
        id = CAROUSEL_ID
        attributes["data-carousel"] = "true"

        ArrowSwitch(left = true, CAROUSEL_ID)

        // Thumbnails container
        div(classes = "flex flex-row gap-2 overflow-x-hidden cursor-grab") {
            id = CAROUSEL_THUMBNAIL_ID

            images.forEachIndexed { idx, image ->
                div(classes = "flex-none") {
                    Overlay(
                        props = OverlayProps(
                            enabled = idx == selected,
                            hoverEnabled = idx != selected
                        )
                    ) {
                        img(
                            src = image.path,
                            alt = image.alt,
                            classes = "select-none max-h-25 object-contain cursor-pointer"
                        ) {
                            draggable = Draggable.htmlFalse
                            attributes["data-idx"] = idx.toString()
                        }
                    }
                }
            }
        }

        ArrowSwitch(left = false, CAROUSEL_ID)
    }
}

fun FlowContent.ArrowSwitch(left: Boolean, carouselId: String) {
    val iconClass = if (left) "fa-solid fa-arrow-left" else "fa-solid fa-arrow-right"

    div(
        classes = "flex h-25 w-10 cursor-pointer items-center justify-center ${Styles.bg(Styles.colorHomeArrowContainer)} hover:${Styles.bg(Styles.colorHomeArrowContainerHovered)}"
    ) {
        attributes["data-arrow"] = if (left) "left" else "right"
        attributes["data-carousel"] = carouselId
        i(classes = iconClass) {}
    }
}
