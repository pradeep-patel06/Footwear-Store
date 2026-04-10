document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("Login first ");
    window.location.href = "index.html";
    return;
  }

  try {
    const res = await fetch("https://footwear-store-14.onrender.com/api/admin/orders", {
      headers: { Authorization: token }
    });

    const data = await res.json();

    const container = document.getElementById("orders");

    container.innerHTML = "";

    data.forEach(order => {

      const div = document.createElement("div");

      div.innerHTML = `
        <h3>Order ID: ${order._id}</h3>
        <p>Amount: ₹${order.amount}</p>
        <p>Status: ${order.status}</p>

        <select onchange="updateStatus('${order._id}', this.value)">
          <option ${order.status==="Processing"?"selected":""}>Processing</option>
          <option ${order.status==="Shipped"?"selected":""}>Shipped</option>
          <option ${order.status==="Delivered"?"selected":""}>Delivered</option>
          <option ${order.status==="Cancelled"?"selected":""}>Cancelled</option>
        </select>

        <hr>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.log(err);
    alert("Error loading orders ");
  }

});

async function updateStatus(orderId, status) {

  const token = localStorage.getItem("token");

  try {
    await fetch("https://footwear-store-14.onrender.com/api/admin/order/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ orderId, status })
    });

    alert("Status Updated ");
    location.reload();

  } catch (err) {
    alert("Error ");
  }
}