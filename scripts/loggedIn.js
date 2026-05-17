document.addEventListener("DOMContentLoaded", () => {
    loadCurrentUser();
});

async function loadCurrentUser() {

    try {

        const res = await fetch("/me", {
            credentials: "same-origin"
        });

        const profileDiv = document.getElementById("profile-div");
        const profilePic = document.getElementById("profile-pic");
        const loginLink = document.getElementById("login-link");

        if (!res.ok) {

            profileDiv.hidden = true;

            return null;
        }

        const user = await res.json();

        profileDiv.hidden = false;

        if (loginLink) {
            loginLink.style.display = "none";
        }
        profilePic.src =
            user.pfp;

        profileDiv.onclick = () => {
            window.location.href = "/profile";
        };

        return user;

    } catch (err) {

        console.error(err);

        return null;
    }
}