package dev.zprecreated.ui.home

import dev.zprecreated.ui.component.Carousel
import kotlinx.html.Draggable
import kotlinx.html.FlowContent
import kotlinx.html.div
import kotlinx.html.draggable
import kotlinx.html.id
import kotlinx.html.img

data class ImagePreview(
    val path: String,
    val alt: String
)

val previewImages = listOf(
    ImagePreview(
        path = "assets/gameplays/gameplay-1.jpg",
        alt = "ZP Recreated gameplay 1"
    ),
    ImagePreview(
        path = "assets/gameplays/gameplay-2.jpg",
        alt = "ZP Recreated gameplay 2"
    ),
    ImagePreview(
        path = "assets/gameplays/gameplay-3.jpg",
        alt = "ZP Recreated gameplay 3"
    ),
    ImagePreview(
        path = "assets/gameplays/gameplay-4.jpg",
        alt = "ZP Recreated gameplay 4"
    ),
    ImagePreview(
        path = "assets/gameplays/gameplay-1.jpg",
        alt = "ZP Recreated gameplay 1"
    ),
    ImagePreview(
        path = "assets/gameplays/gameplay-2.jpg",
        alt = "ZP Recreated gameplay 2"
    ),
)

fun FlowContent.PreviewSection() {
    val carouselId = "carousel-preview"
    val image = previewImages[0] // default to 0, selection is done in client-side
    div(classes = "flex w-120 max-w-full flex-col gap-2") {
        img(classes = "object-contain select-none") {
            id = "$carouselId-main"
            draggable = Draggable.htmlFalse
            src = image.path
            alt = image.alt
        }
        Carousel(
            images = previewImages,
            selected = 0,
            carouselId = carouselId
        )
    }
}
