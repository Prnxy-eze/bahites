// admin.js

// Load dashboard stats
function loadDashboard() {
    const orders = JSON.parse(localStorage.getItem("orders") || "[]");

    let sales = 0;
    let pending = 0;
    let items = {};

    orders.forEach(o => {
        sales += o.total;
        if (o.status === "pending") pending++;
        o.items.forEach(i => {
            items[i.name] = (items[i.name] || 0) + 1;
        });
    });

    document.getElementById("sales").innerText = "Total Sales: ₱" + sales;
    document.getElementById("pending").innerText = "Pending Orders: " + pending;

    const top = Object.entries(items).sort((a, b) => b[1] - a[1])[0];
    document.getElementById("top").innerText = "Top Item: " + (top ? top[0] : "None");

    console.log("Dashboard loaded");
}

// Load admin profile
function loadProfile() {
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    if (!admin) return;
    document.getElementById("name").value = admin.name || "";
    document.getElementById("email").value = admin.email || "";
    document.getElementById("phone").value = admin.phone || "";
}

// Update admin profile
function updateProfile() {
    const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    admin.name = document.getElementById("name").value;
    admin.phone = document.getElementById("phone").value;
    const passwordField = document.getElementById("password");
    if (passwordField && passwordField.value) admin.password = passwordField.value;
    localStorage.setItem("admin", JSON.stringify(admin));
    alert("Profile Updated!");
}

// Make loadDashboard global so HTML can call it
window.loadDashboard = loadDashboard;

// Optional: auto-run when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadDashboard();
});