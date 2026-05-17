const container = document.querySelector(".home-image-container, .body-container");
const image = document.querySelector(".parallax-img");

container.addEventListener("mousemove", (e) => {
    const rect = container.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    image.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
});

container.addEventListener("mouseleave", () => {
    image.style.transform = "translate(0, 0)";
});

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
        if (icon) icon.src = "/images/sun-icon.png";
        localStorage.setItem("theme", "dark");
    } else {
        if (icon) icon.src = "/images/moon-icon.png";
        localStorage.setItem("theme", "light");
    }

}

window.onload = function () {
    let icon = document.querySelector(".dark-mode-toggle");
    let savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.documentElement.classList.add("darkmode");
        if (icon) icon.src = "/images/sun-icon.png";
    } else {
        document.documentElement.classList.remove("darkmode");
        if (icon) icon.src = "/images/moon-icon.png";
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

function openTerms(event) {
    event.preventDefault();
    document.getElementById("termsModal").style.display = "block";
}

function closeTerms() {
    document.getElementById("termsModal").style.display = "none";
}

// Close if clicked outside the box
window.onclick = function(event) {
    const modal = document.getElementById("termsModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// ==========================
// GLOBAL STATE
// ==========================

let organizations = [];
let tags = [];

let selectedTags = [];
let searchText = "";

// ==========================
// FETCH DATA
// ==========================

async function loadData() {

    try {

        const [orgResponse, tagResponse] = await Promise.all([
            fetch("/api/organizations"),
            fetch("/api/tags")
        ]);

        organizations = await orgResponse.json();
        tags = await tagResponse.json();

        renderTags();
        renderCards();

    } catch (err) {

        console.error("Failed to load data:", err);

    }
}

// ==========================
// SEARCH
// ==========================

const searchInput = document.querySelector(".search-box input");

searchInput.addEventListener("input", (e) => {

    searchText = e.target.value.toLowerCase();

    renderCards();

});

// ==========================
// TAGS
// ==========================

function renderTags() {

    const tagsContainer = document.querySelector(".tags-boxes");

    tagsContainer.innerHTML = "";

    tags.forEach(tag => {

        const tagElement = document.createElement("p");

        tagElement.className = "tags-pick-many";

        // support both string tags and object tags
        const tagName = typeof tag === "string"
            ? tag
            : tag.name;

        tagElement.innerText = tagName;

        tagElement.onclick = () => picktagmany(tagElement);

        tagsContainer.appendChild(tagElement);

    });
}

function picktagmany(element) {

    const tag = element.innerText;

    if (selectedTags.includes(tag)) {

        selectedTags = selectedTags.filter(t => t !== tag);

        element.classList.remove("tags-pick-many-active");

    } else {

        selectedTags.push(tag);

        element.classList.add("tags-pick-many-active");

    }

    renderCards();
}

// ==========================
// FILTERING
// ==========================
function filterOrganization(org) {

    const matchesSearch =

        org.name?.toLowerCase().includes(searchText) ||
        org.description?.toLowerCase().includes(searchText) ||
        org.abbreviation?.toLowerCase().includes(searchText);

    const matchesTags =

        selectedTags.length === 0 ||

        selectedTags.every(selectedTag =>

            (org.tags || []).some(orgTag => {

                const orgTagName =
                    typeof orgTag === "string"
                        ? orgTag
                        : orgTag.name;

                return orgTagName === selectedTag;

            })

        );

    return matchesSearch && matchesTags;
}
// ==========================
// RENDER CARDS
// ==========================

function renderCards() {

    const container = document.querySelector(".org-event-cards-container");

    container.innerHTML = "";

    const filtered = organizations.filter(filterOrganization);

    if (filtered.length === 0) {

        container.innerHTML = `
            <p class="no-results">
                No organizations found.
            </p>
        `;

        return;
    }

    filtered.forEach(org => {

        const card = document.createElement("div");

        card.className = "cards-container";

        card.innerHTML = `
            <div class="org-event-info-container">
            
                <img
                    class="background"
                    src="${org.bgp || "images/temp-org-image.png"}"
                    alt=""
                >
                <div>
                    <div class="hero">
                        <img
                        class="profile"
                        src="${org.pfp || "images/temp-org-image.png"}"
                        alt=""
                        >
                        
                        <h2 class="org-name">
                            ${org.name || "Unknown"}
                        </h2>
                    </div>
                    <p class="org-disc">
                        ${org.description || ""}
                    </p>
                </div>
                

                <div class="org-event-tags-container">

                    ${
                        (org.tags || [])
                            .map(tag => `
                                <p class="org-event-tags">
                                    ${tag.name}
                                </p>
                            `)
                            .join("")
                    }
                </div>
            </div>
        `;

        card.addEventListener("click", () => {

            window.location.href = `/organization/${org.id}`;

        });

        container.appendChild(card);

    });
}

// ==========================
// START
// ==========================

loadData();

async function getCurrentUser() {
    try {
        const res = await fetch("/me");

        if (!res.ok) {
            return null;
        }

        return await res.json();

    } catch (err) {
        console.error(err);
        return null;
    }
}

document.addEventListener("DOMContentLoaded", async () => {

    const user = await getCurrentUser();

    if (!user) {
        window.location.href = "/login.html";
    }

});

