// admin-profile.js

function loadProfile() {
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    if (!admin) return;

    document.getElementById("name").value = admin.name || "";
    document.getElementById("email").value = admin.email || "";
    document.getElementById("phone").value = admin.phone || "";
}

function updateProfile() {
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");

    admin.name = document.getElementById("name").value;
    admin.phone = document.getElementById("phone").value;

    const passwordField = document.getElementById("password");
    if (passwordField && passwordField.value) admin.password = passwordField.value;

    localStorage.setItem("admin", JSON.stringify(admin));
    alert("Profile Updated!");
}

// Make functions global so HTML can call them
window.loadProfile = loadProfile;
window.updateProfile = updateProfile;

// Optional: automatically populate on DOM load
document.addEventListener("DOMContentLoaded", () => {
    loadProfile();
});