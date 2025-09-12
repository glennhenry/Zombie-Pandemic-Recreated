package zprecreated.pages

import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import com.varabyte.kobweb.browser.http.http
import com.varabyte.kobweb.compose.foundation.layout.Column
import com.varabyte.kobweb.core.Page
import com.varabyte.kobweb.silk.components.graphics.Image
import kotlinx.browser.window
import org.jetbrains.compose.web.dom.Text
import zprecreated.components.widgets.ExampleWidget

object AppConfig {
    val baseUrl: String
        get() = if (js("process.env.NODE_ENV") as String == "development") {
            "http://localhost:8081" // ktor server
        } else {
            "" // production: same origin
        }
}

@Page("/")
@Composable
fun HomePage() {
    var apiResponse by remember { mutableStateOf("") }

    LaunchedEffect(Unit) {
        apiResponse = window.http.get("${AppConfig.baseUrl}/testapi").decodeToString()
    }

    Column {
        Text("ping")
        ExampleWidget()
        Text("response API from server: $apiResponse")
        Image(src = "${AppConfig.baseUrl}/assets/bg.jpg")
        Image(src = "${AppConfig.baseUrl}/game/profile/avatar/Tia_Sob.png")
    }
}
