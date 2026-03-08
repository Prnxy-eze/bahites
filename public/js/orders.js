import { auth } from "./firebase.js";

// Expose placeOrder globally so script.js can call it
window.placeOrder = async function(orderData) {
    const user = auth.currentUser;
    if (!user) {
        console.warn("placeOrder: no user logged in.");
        return;
    }

    const order = {
        orderID: "ORD-" + Date.now(),
        userID: user.uid,
        userEmail: user.email,
        date: new Date().toLocaleDateString(),
        name: orderData.name,
        contact: orderData.contact,
        address: orderData.address,
        payment: orderData.payment,
        items: orderData.items,
        total: orderData.total
    };

    try {
        const res = await fetch("/api/save-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(order)
        });
        const data = await res.json();
        if (!data.success) console.error("Save order failed:", data.error);
        else console.log("Order saved:", order.orderID);
    } catch (err) {
        console.error("save-order fetch error:", err);
    }
};
