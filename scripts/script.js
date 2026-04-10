function TogglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const root = document.documentElement;

    root.classList.toggle("showpass");

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}

function showSignUp() {  
    document.getElementById('signUp').classList.add('active');
    document.getElementById('logIn').classList.remove('active');
}

function showLogin() {
    document.getElementById('logIn').classList.add('active');
    document.getElementById('signUp').classList.remove('active');
}

function toggledarkmode() {
    let root = document.documentElement;
    let icon = document.querySelector(".dark-mode-toggle");
    let hublogo = document.querySelector(".header-logo");

    root.classList.toggle("darkmode");

    if (root.classList.contains("darkmode")) {
        if (icon) icon.src = "images/sun-icon.png";
        localStorage.setItem("theme", "dark");
    } else {
        if (icon) icon.src = "images/moon-icon.png";
        localStorage.setItem("theme", "light");
    }

}

window.onload = function () {
    let icon = document.querySelector(".dark-mode-toggle");
    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("darkmode");
        if (icon) icon.src = "images/sun-icon.png";
    } else {
        document.documentElement.classList.remove("darkmode");
        if (icon) icon.src = "images/moon-icon.png";
    }
};

function picktag(element) {
    const tags = document.querySelectorAll(".tags-pick, .tags-pick-active");

    tags.forEach(tag => {
        tag.classList.remove("tags-pick-active");
        tag.classList.add("tags-pick");
    });

    element.classList.remove("tags-pick");
    element.classList.add("tags-pick-active");

}

function picktagmany(element) {
    element.classList.toggle("tags-pick-many-active");
    element.classList.toggle("tags-pick-many");
}