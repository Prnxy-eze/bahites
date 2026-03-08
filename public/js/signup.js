import { auth, createUserWithEmailAndPassword } from "./firebase.js";

const signupForm = document.querySelector('#signupForm');

signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log("Attempting to create user:", email);

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Account created!", userCredential.user.email);
        // window.location.href = "login.html";
    } catch (error) {
        console.error("Auth Error:", error.code);
        alert(error.message);
    }
});