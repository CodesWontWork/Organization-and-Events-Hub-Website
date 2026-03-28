
function togglePasswordVisibility() {
    const passwordInput = document.getElementById('password');
    const checkbox = document.getElementById('showPassCheckbox');
    const label = document.querySelector('.showPassword');
    if (checkbox.checked) {
        passwordInput.type = 'text';
        label.classList.add('checked');
    } else {
        passwordInput.type = 'password';
        label.classList.remove('checked');
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