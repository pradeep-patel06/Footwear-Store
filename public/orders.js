document.addEventListener("DOMContentLoaded", async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert(" Please login first");
    return;
  }

  try {
    const res = await fetch("https://footwear-store-14.onrender.com/api/orders", {
      headers: { Authorization: token }
    });

    let data;

    try {
      data = await res.json();
    } catch {
      const text = await res.text();
      console.log("SERVER ERROR:", text);
      alert(" Not JSON");
      return;
    }

    const container = document.getElementById("ordersContainer");
    container.innerHTML = "";

    data.forEach(order => {

      console.log("STATUS:", order.status); 

      const div = document.createElement("div");

      div.innerHTML = `
        <h3>Order ID: ${order._id}</h3>
        <p>Amount: ₹${order.amount}</p>
        <p>Date: ${new Date(order.date).toLocaleString()}</p>

        <p>Status: 
          ${
            order.status === "Cancelled"
              ? "Cancelled "
              : order.status === "Refunded"
              ? "Refunded 💰"
              : order.status === "Processing"
              ? "Processing ⏳"
              : "Delivered ✅"
          }
        </p>

        ${
          order.status === "Processing" || order.status === "Delivered"
            ? `<button onclick="cancelOrder('${order._id}')">Cancel</button>`
            : order.status === "Cancelled"
            ? `<button onclick="refundOrder('${order._id}')">Refund</button>`
            : ""
        }

        <hr>
      `;

      container.appendChild(div);
    });

  } catch (err) {
    console.log(err);
    alert(" Error loading orders");
  }

});



async function cancelOrder(orderId) {

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://footwear-store-14.onrender.com/api/orders/cancel", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ orderId })
    });

    const data = await res.json();

    alert(data.message);
    location.reload();

  } catch (err) {
    console.log(err);
    alert(" Cancel failed");
  }
}



async function refundOrder(orderId) {

  const token = localStorage.getItem("token");

  try {
    const res = await fetch("https://footwear-store-14.onrender.com/api/orders/refund", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ orderId })
    });

    const data = await res.json();

    alert(data.message);
    location.reload();

  } catch (err) {
    console.log(err);
    alert(" Refund failed");
  }
}