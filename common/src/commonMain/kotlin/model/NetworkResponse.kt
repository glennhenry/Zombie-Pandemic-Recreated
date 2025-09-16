package dev.zprecreated.model

import kotlinx.serialization.Serializable

@Serializable
data class NetworkResponse<T>(
    val success: Boolean,
    val reason: String? = null,
    val data: T? = null,
) {
    companion object {
        fun <T> success(data: T): NetworkResponse<T> {
            return NetworkResponse(
                success = true,
                reason = null,
                data = data
            )
        }

        fun <T> fail(reason: String): NetworkResponse<T> {
            return NetworkResponse(
                success = false,
                reason = reason,
                data = null
            )
        }
    }
}
