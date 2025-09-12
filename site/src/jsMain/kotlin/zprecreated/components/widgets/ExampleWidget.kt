package zprecreated.components.widgets

import androidx.compose.runtime.Composable
import com.varabyte.kobweb.compose.foundation.layout.Row
import com.varabyte.kobweb.compose.ui.Modifier
import com.varabyte.kobweb.compose.ui.graphics.Colors
import com.varabyte.kobweb.compose.ui.modifiers.color
import org.jetbrains.compose.web.dom.Text

@Composable
fun ExampleWidget() {
    Row(modifier = Modifier.color(Colors.Red)) {
        Text("red color")
    }
}
