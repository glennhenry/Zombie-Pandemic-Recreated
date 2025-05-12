package ui.component

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.unit.dp

/**
 * Example Card
 */
@Composable
fun CustomCard(modifier: Modifier = Modifier, contents: @Composable () -> Unit) {
    Column(
        modifier = modifier
            .background(MaterialTheme.colorScheme.background)
            .border(1.dp, MaterialTheme.colorScheme.tertiary, MaterialTheme.shapes.medium)
            .shadow(1.dp, MaterialTheme.shapes.medium)
            .padding(4.dp)
    ) {
        contents()
    }
}
