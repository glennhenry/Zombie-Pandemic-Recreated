pluginManagement {
    repositories {
        maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")
        google()
        gradlePluginPortal()
        mavenCentral()
    }

    plugins {
        kotlin("jvm").version(extra["kotlin.version"] as String)
        id("org.jetbrains.compose").version(extra["compose.version"] as String)
        id("org.jetbrains.kotlin.plugin.compose").version(extra["kotlin.version"] as String)
    }
}
plugins {
  //https://github.com/JetBrains/compose-hot-reload?tab=readme-ov-file#set-up-automatic-provisioning-of-the-jetbrains-runtime-jbr-via-gradle
  id("org.gradle.toolchains.foojay-resolver-convention").version("0.9.0")
}
rootProject.name = "zombiepandemicrecreated"