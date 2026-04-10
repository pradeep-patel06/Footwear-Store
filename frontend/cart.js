document.addEventListener("DOMContentLoaded", () => {

  const container = document.getElementById("cartContainer");
  const totalPriceEl = document.getElementById("totalPrice");
  const buyNowBtn = document.getElementById("buyNow");

  let cartData = null;

  
  async function loadCart() {
    const token = localStorage.getItem("token");

    const res = await fetch("https://footwear-store-14.onrender.com/api/cart", {
      headers: { Authorization: token }
    });

    const data = await res.json();
    cartData = data;

    container.innerHTML = "";

    let total = 0;

    data.products.forEach(item => {
      total += item.price * item.quantity;

      const div = document.createElement("div");
      div.className = "cartItem";

      div.innerHTML = `
        <img src="${item.img}" width="80">
        <h3>${item.title}</h3>
        <p>₹${item.price} x ${item.quantity}</p>
        <button onclick="removeItem(${item.productId})">Remove</button>
      `;

      container.appendChild(div);
    });

    totalPriceEl.innerText = "Total: ₹" + total;
  }

  
  window.removeItem = async function (id) {
    const token = localStorage.getItem("token");

    await fetch("https://footwear-store-14.onrender.com/api/cart/remove", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token
      },
      body: JSON.stringify({ productId: id })
    });

    loadCart();
  };

  
  buyNowBtn.addEventListener("click", async () => {

    const token = localStorage.getItem("token");

    if (!cartData || !cartData.products) {
      alert(" Cart empty");
      return;
    }

    let total = 0;
    cartData.products.forEach(item => {
      total += item.price * item.quantity;
    });

    try {

      
      const orderRes = await fetch("https://footwear-store-14.onrender.com/create-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token
        },
        body: JSON.stringify({ amount: total * 100 })
      });

      const orderData = await orderRes.json();

      
      var options = {
        key: "rzp_test_ST6tzo5xqfNtgJ",
        amount: orderData.amount,
        currency: "INR",
        order_id: orderData.id,
        name: "Footwear Store",

        handler: async function (response) {

          try {
            const saveRes = await fetch("https://footwear-store-14.onrender.com/save-order", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: token
              },
              body: JSON.stringify({
                payment_id: response.razorpay_payment_id,
                order_id: response.razorpay_order_id,
                amount: orderData.amount
              })
            });

            if (!saveRes.ok) {
              const text = await saveRes.text();
              console.log(text);
              alert("❌ Order save failed");
              return;
            }

            alert("Payment + Order Saved!");
            window.location.href = "orders.html";

          } catch (err) {
            console.log(err);
            alert(" Error saving order");
          }
        }
      };

      var rzp = new Razorpay(options);
      rzp.open();

    } catch (err) {
      console.log(err);
      alert(" Payment error");
    }
  });

  loadCart();
});