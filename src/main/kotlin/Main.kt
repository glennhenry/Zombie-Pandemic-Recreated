@file:JvmName("Zombie Pandemic Recreated")
import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import theme.AppTheme
import java.awt.Dimension
import org.koin.core.context.startKoin
import org.koin.java.KoinJavaComponent.getKoin

fun main() = application {
    startKoin {
        modules(appModule)
    }

    val viewModel = getKoin().get<MainViewModel>()

    Window(
        onCloseRequest = ::exitApplication,
        state = rememberWindowState(size = DpSize(1280.dp, 720.dp)),
        title = "Zombie Pandemic Recreated - Made with Compose for Desktop"
    ) {
        window.minimumSize = Dimension(1280, 720)

        AppTheme {
            App(
                viewModel = viewModel
            )
        }
    }
}