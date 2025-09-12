package zprecreated.pages

import androidx.compose.runtime.Composable
import com.varabyte.kobweb.compose.foundation.layout.Column
import com.varabyte.kobweb.core.Page
import org.jetbrains.compose.web.dom.Text
import zprecreated.components.widgets.ExampleWidget

@Page("/")
@Composable
fun HomePage() {
    Column {
        Text("ping")
        ExampleWidget()
    }
}
