package dev.zprecreated.utils

fun Boolean?.eqTrue(): Boolean {
    return this != null && this
}

fun Boolean?.eqFalse(): Boolean {
    return this != null && !this
}
