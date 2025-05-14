import androidx.compose.desktop.ui.tooling.preview.Preview
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import org.jetbrains.compose.resources.stringResource
import theme.AppTheme
import ui.MainViewModel
import ui.component.CustomCard
import zprecreated.resources.Res
import zprecreated.resources.app_name
import zprecreated.resources.title

@Composable
@Preview
fun App(
    modifier: Modifier = Modifier,
    viewModel: MainViewModel
) {
    val uiState by viewModel.uiState.collectAsState()
    AppTheme(darkTheme = uiState.darkMode) {
        Column(
            modifier = modifier
                .fillMaxSize()
                .background(MaterialTheme.colorScheme.background),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.spacedBy(8.dp, alignment = Alignment.CenterVertically)
        ) {
            CustomCard {
                Text(
                    text = stringResource(Res.string.app_name),
                    color = MaterialTheme.colorScheme.onPrimaryContainer,
                    modifier = modifier.padding(4.dp),
                    style = MaterialTheme.typography.titleLarge
                )
            }
            Card {
                Text(
                    text = stringResource(Res.string.title),
                    color = MaterialTheme.colorScheme.onPrimaryContainer,
                    modifier = modifier.padding(4.dp),
                    style = MaterialTheme.typography.bodyMedium
                )
            }
            Button(onClick = { viewModel.toggleDarkMode() }) {
                Text(text = "Toggle dark mode")
            }
        }
    }
}
