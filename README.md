# Zombie Pandemic Recreated

A desktop application built with Kotlin and Compose for Desktop.

## Features

- Modern UI with Material 3 design
- Dark mode support
- Cross-platform (Windows, macOS, Linux)

## Development Setup

### Prerequisites

- JDK 17 or later
- IntelliJ IDEA (recommended) or Android Studio

### Running the Application

1. Clone the repository
2. Open the project in IntelliJ IDEA
3. Run the `Main.kt` file or use the Gradle task `run`

### Building a Native Distribution

To build a native distribution for your platform:

```
./gradlew packageDistributionForCurrentOS
```

This will create a platform-specific installer in the `build/compose/binaries/main-release/{extension}/` directory.

## Generated with Compose for Desktop Wizard

This project was generated using the [Compose for Desktop Wizard](https://github.com/zahid4kh/compose-for-desktop).