package zprecreated.pages

import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import com.varabyte.kobweb.compose.css.BackgroundPosition
import com.varabyte.kobweb.compose.css.BackgroundRepeat
import com.varabyte.kobweb.compose.css.BackgroundSize
import com.varabyte.kobweb.compose.css.CSSPosition
import com.varabyte.kobweb.compose.css.ColorScheme
import com.varabyte.kobweb.compose.css.functions.url
import com.varabyte.kobweb.compose.foundation.layout.Column
import com.varabyte.kobweb.compose.foundation.layout.Row
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.modifiers.alignItems
import com.varabyte.kobweb.compose.ui.modifiers.background
import com.varabyte.kobweb.compose.ui.modifiers.backgroundColor
import com.varabyte.kobweb.compose.ui.modifiers.justifyContent
import com.varabyte.kobweb.core.Page
import com.varabyte.kobweb.silk.theme.colors.ColorPalette
import dev.zprecreated.model.account.PlayerAccount
import org.jetbrains.compose.web.css.AlignItems
import org.jetbrains.compose.web.css.Color
import org.jetbrains.compose.web.css.JustifyContent

object AppConfig {
    val baseUrl: String
        get() = if (js("process.env.NODE_ENV") as String == "development") {
            "http://localhost:8081" // ktor server
        } else {
            "" // production: same origin
        }
}

object Theme {
    const val websiteBackground = "#050505"
    const val topbarBackground = ""
}

@Page("/")
@Composable
fun HomePage() {
    val account by remember { mutableStateOf(PlayerAccount.guest()) }
}

@Composable
fun BaseLayout(account: PlayerAccount) {
    val topbarOpened by remember { mutableStateOf(true) }

    Column(
        modifier = Modifier
            .background {
                color(Color(Theme.websiteBackground))
                image(url("assets/bg.jpg"))
                size(BackgroundSize.Cover)
                position(BackgroundPosition.of(CSSPosition.Top))
                repeat(BackgroundRepeat.NoRepeat)
            }
    ) {
        if (topbarOpened) {
            Row(
                modifier = Modifier
                    .alignItems(AlignItems.Center)
                    .justifyContent(JustifyContent.SpaceBetween)
                    .backgroundColor(Color(Theme.topbarBackground))
            )
            {

            }
        }
    }
}
