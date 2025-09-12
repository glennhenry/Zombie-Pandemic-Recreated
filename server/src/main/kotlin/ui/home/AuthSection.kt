package dev.zprecreated.ui.home

import dev.zprecreated.model.account.PlayerAccount
import dev.zprecreated.ui.Styles
import dev.zprecreated.ui.component.Checkbox
import dev.zprecreated.ui.component.CheckboxProps
import dev.zprecreated.ui.component.TextField
import dev.zprecreated.ui.component.TextFieldProps
import kotlinx.html.ButtonType
import kotlinx.html.FlowContent
import kotlinx.html.a
import kotlinx.html.button
import kotlinx.html.classes
import kotlinx.html.div
import kotlinx.html.form
import kotlinx.html.h1
import kotlinx.html.id
import kotlinx.html.onClick
import kotlinx.html.onSubmit
import kotlinx.html.p
import kotlinx.html.span

fun FlowContent.AuthSection(account: PlayerAccount?, isRegistering: Boolean = false) {
    div(classes = "flex flex-col gap-4") {
        h1(classes = "flex flex-col gap-4") {
            if (account != null) {
                +"Welcome back"
            } else {
                +"Login/Register"
            }
        }
        if (account != null) {
            div(classes = "flex flex-col gap-2") {
                p {
                    span(classes = Styles.emphasizedText) {
                        +account.username
                    }
                    + " - "
                    span(classes = Styles.emphasizedText) {
                        +account.email
                    }
                }
                a(classes = Styles.emphasizedLinkText) {
                    href = "/play"
                    +"Play now"
                }
            }
        } else {
            form(classes = "flex flex-col items-center gap-3") {
                id = "auth-form"
                attributes["hx-post"] = "/auth"
                attributes["hx-swap"] = "outerHTML" // replace section after login
                attributes["data-mode"] = "login"

                if (isRegistering) {
                    TextField(
                        TextFieldProps(
                            placeholder = "Email",
                            required = true,
                            classes = "w-full max-w-70 register-only",
                        )
                    )

                    TextField(
                        TextFieldProps(
                            placeholder = "Username",
                            required = true,
                            classes = "w-full max-w-70 register-only",
                        )
                    )
                } else {
                    TextField(
                        TextFieldProps(
                            placeholder = "Username or Email",
                            required = true,
                            classes = "w-full max-w-70 login-only",
                        )
                    )
                }

                TextField(
                    TextFieldProps(
                        placeholder = "Password",
                        hide = true,
                        required = true,
                        classes = "w-full max-w-70",
                        onToggleHideJs = "todo",
                    )
                ) {
                    attributes["data-eye"] = "true"
                    span { +"👁" }
                }

                div(classes = "flex w-full max-w-70 justify-between") {
                    Checkbox(
                        CheckboxProps(isChecked = false)
                    ) {
                        p { +"Keep logged in" }
                    }

                    a(href = "#", classes = "emphasized link") {
                        onClick = "alert('Password reset flow TBD')"
                        +"Forgot password"
                    }
                }

                div(classes = "flex w-full max-w-80 flex-col justify-center gap-2") {
                    button(type = ButtonType.submit, classes = "flex justify-center rounded-md ${Styles.bgColor(Styles.colorPrimary)} p-2 text-white hover:${Styles.bgColor(Styles.colorPrimary)}/80 active:${Styles.bgColor(Styles.colorPrimary)}/70") {
                        p(classes = "text-lg") { +(if (isRegistering) "Register" else "Login") }
                    }

                    p {
                        a(href = "#", classes = "emphasized link") {
                            id = "toggle-auth"
                            +(if (isRegistering) "Login" else "Register")
                        }
                        +" or "
                        a(href = "/play-as-guest", classes = "emphasized link") {
                            +"Play as Guest"
                        }
                    }
                }
            }
        }
    }
}
