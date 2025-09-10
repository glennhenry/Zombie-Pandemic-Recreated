package dev.zprecreated.ui

import kotlinx.html.HEAD
import kotlinx.html.link
import kotlinx.html.script
import kotlinx.html.style
import kotlinx.html.title

fun HEAD.CommonHead(play: Boolean) {
    val title = if (play) {
        "Zombie Pandemic Recreated - Play"
    } else {
        "Zombie Pandemic Recreated"
    }

    title { +title }
    link {
        rel = "icon"
        type = "image/svg+xml"
        href = "assets/favicon.ico"
    }
    link {
        rel = "preconnect"
        href = "https://fonts.googleapis.com"
    }
    link {
        rel = "stylesheet"
        href =
            "https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Just+Another+Hand&family=Noto+Serif:wght@100..900&family=Rum+Raisin&family=Russo+One&family=Source+Code+Pro:wght@200..900&display=swap"
    }
    link {
        rel = "stylesheet"
        href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        attributes["crossorigin"] = "anonymous"
        attributes["referrerpolicy"] = "no-referrer"
    }

    script { src = "https://unpkg.com/htmx.org@2.0.6" }
    script { src = "https://unpkg.com/@tailwindcss/browser@4" }
    script { src = "assets/resizer.js" }
    script { src = "assets/toggleAppBar.js" }
    style { GlobalStyle() }
}
