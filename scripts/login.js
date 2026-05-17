document.addEventListener("DOMContentLoaded", () => {

    loadCurrentUser();

    console.log("Auth system loaded");

    const signupForm = document.getElementById("signupForm");
    const loginForm = document.getElementById("loginForm");

    if (signupForm) {
        signupForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const username = document.getElementById("username").value;
            const email = signupForm.querySelector("input[name='email']").value;
            const password = signupForm.querySelector("input[name='password']").value;
            const confirm = signupForm.querySelector("input[name='confirm_password']").value;

            if (password !== confirm) {
                alert("Passwords do not match");
                return;
            }

            const res = await fetch("/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password })
            });

            alert(res.ok ? "Signup success" : await res.text());
        });
    }

    if (loginForm) {
        loginForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            const email = loginForm.querySelector("input[name='email']").value;
            const password = loginForm.querySelector("input[name='password']").value;

            const res = await fetch("/login", {
                method: "POST",
                credentials: "same-origin",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (res.ok) {
                window.location.href = "/profile";

            }
            
        });
    }

});
