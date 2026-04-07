
function TogglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const ShowPasswordButton = document.getElementById('ShowPassButton');
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