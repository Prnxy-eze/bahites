import { auth, onAuthStateChanged, signOut } from "./firebase.js";

onAuthStateChanged(auth, (user) => {
    const loginBtn = document.getElementById("login-btn");
    const accountProfile = document.getElementById("account-profile");
    const profileInitial = document.getElementById("profile-name");
    const profileLabel = document.getElementById("profile-name-label");

    if (user) {
        // User is logged in
        if (loginBtn) loginBtn.style.display = "none";
        if (accountProfile) accountProfile.classList.remove("hidden");

        const name = user.displayName || user.email.split("@")[0];
        const initial = name.charAt(0).toUpperCase();

        if (profileInitial) profileInitial.textContent = initial;
        if (profileLabel) profileLabel.textContent = name;
    } else {
        // Not logged in
        if (loginBtn) loginBtn.style.display = "inline";
        if (accountProfile) accountProfile.classList.add("hidden");
    }
});

window.logout = async function () {
    try {
        await signOut(auth);
        window.location.href = "home.html";
    } catch (error) {
        console.error("Logout error:", error);
    }
};