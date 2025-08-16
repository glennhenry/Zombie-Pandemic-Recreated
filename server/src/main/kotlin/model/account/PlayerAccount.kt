package dev.zprecreated.model.account

import dev.zprecreated.utils.AdminData
import dev.zprecreated.utils.UUID
import kotlin.random.Random

data class PlayerAccount(
    val playerId: String,
    val username: String,
    val email: String,
    val hashedPassword: String,
) {
    companion object {
        fun admin(): PlayerAccount {
            return PlayerAccount(
                playerId = AdminData.PLAYER_ID,
                username = AdminData.USERNAME,
                email = AdminData.EMAIL,
                hashedPassword = AdminData.HASHED_PASSWORD
            )
        }

        fun guest(): PlayerAccount {
            return PlayerAccount(
                playerId = UUID.withPrefix("guest-"),
                username = "guest-" + Random.nextInt(0, 1_000_000_000),
                email = "guest@guest.com",
                hashedPassword = "no pw lol"
            )
        }
    }
}
