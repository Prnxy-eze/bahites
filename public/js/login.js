import {
    auth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence
} from "./firebase.js";

const loginForm = document.querySelector('#loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = loginForm.email.value;
    const password = loginForm.password.value;

    try {
        await setPersistence(auth, browserSessionPersistence);

        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        console.log("Logged in successfully:", userCredential.user.email);
        window.location.href = "home.html";

    } catch (error) {
        console.error("Auth Error:", error.code, error.message);
        alert("Login failed: " + error.message);
    }
});