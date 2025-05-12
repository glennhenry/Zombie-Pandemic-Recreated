package di

import game.GameDatabase
import org.koin.dsl.module
import ui.MainViewModel

val appModule = module {
    single { GameDatabase() }
    single { MainViewModel(get()) }
}
