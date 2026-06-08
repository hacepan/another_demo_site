tp = window["tp"] || [];

tp.push(["init", function () {
    const loginStatusElement = document.querySelector("#login-status")
    if (tp.pianoId.isUserValid()) {
        loginStatusElement.href = "/my-account"
        loginStatusElement.innerText = "My Account"
    } else {
        loginStatusElement.innerText = "Log in"
        loginStatusElement.onclick = () => {
            tp.pianoId.show({
                screen: "login",
                loginSuccess: () => {
                    window.location.reload()
                }
            })
        }
    }
    if (window.location.pathname === '/my-account') {
        tp.myaccount.show({
            containerSelector: ".container"
        })
    }
}])