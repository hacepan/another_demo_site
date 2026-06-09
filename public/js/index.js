tp = window["tp"] || [];

tp.push(["init", function () {
    tp.push(['addHandler', 'logout', function(){
        window.location.reload()
    }])
    const loginStatusElement = document.querySelector("#login-status")
    if (tp.pianoId.isUserValid()) {
        loginStatusElement.innerHTML = "<a href=\"/my-account\">My Account</a> <a href=\"javascript:void(0);\" onclick=\"tp.pianoId.logout()\">Logout</a>"
    } else {
        loginStatusElement.innerHTML = "<a href=\"javascript:void(0);\" onclick=\"tp.pianoId.show({screen: 'login', loginSuccess: () => {window.location.reload()}})\">Login</a>"
    }
    if (window.location.pathname === '/my-account') {
        tp.myaccount.show({
            containerSelector: ".container"
        })
    }
}])