@file:JvmName("ZombiePandemicRecreated")

import androidx.compose.ui.unit.DpSize
import androidx.compose.ui.unit.dp
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import androidx.compose.ui.window.rememberWindowState
import di.appModule
import org.jetbrains.compose.resources.painterResource
import org.koin.core.context.startKoin
import org.koin.java.KoinJavaComponent.getKoin
import theme.AppTheme
import ui.MainViewModel
import zprecreated.resources.Res
import zprecreated.resources.zp_icon
import java.awt.Dimension

fun main() = application {
    startKoin {
        modules(appModule)
    }

    val viewModel = getKoin().get<MainViewModel>()

    Window(
        onCloseRequest = ::exitApplication,
        state = rememberWindowState(size = DpSize(1280.dp, 720.dp)),
        title = "Zombie Pandemic Recreated",
        icon = painterResource(Res.drawable.zp_icon)
    ) {
        window.minimumSize = Dimension(1280, 720)
        AppTheme {
            App(
                viewModel = viewModel
            )
        }
    }
}
