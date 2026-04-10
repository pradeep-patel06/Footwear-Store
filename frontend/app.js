

const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      { code: "black", img: "./img/air.png" },
      { code: "darkblue", img: "./img/air2.png" },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      { code: "lightgray", img: "./img/jordan.png" },
      { code: "green", img: "./img/jordan2.png" },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      { code: "lightgray", img: "./img/blazer.png" },
      { code: "green", img: "./img/blazer2.png" },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      { code: "black", img: "./img/crater.png" },
      { code: "lightgray", img: "./img/crater2.png" },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      { code: "gray", img: "./img/hippie.png" },
      { code: "black", img: "./img/hippie2.png" },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");


menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    choosenProduct = products[index];

    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, i) => {
      color.style.backgroundColor = choosenProduct.colors[i].code;
    });
  });
});


currentProductSizes.forEach((size) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((s) => {
      s.style.backgroundColor = "white";
      s.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});


async function updateCartCount() {
  const token = localStorage.getItem("token");

  if (!token) return;

  const cartCountEl = document.getElementById("cartCount");
  if (!cartCountEl) return;   

  const res = await fetch("https://footwear-store-14.onrender.com/api/cart", {
    headers: {
      Authorization: token
    }
  });

  const data = await res.json();

  let total = 0;

  data.products.forEach(item => {
    total += item.quantity;
  });

  cartCountEl.innerText = total;
}




let isLogin = true;

const authContainer = document.getElementById("authContainer");
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const logoutBtn = document.getElementById("logoutBtn");
const closeAuth = document.querySelector(".closeAuth");

const formTitle = document.getElementById("formTitle");
const nameInput = document.getElementById("name");
const toggleText = document.getElementById("toggleText");

window.addEventListener("load", () => {
  const token = localStorage.getItem("token");

  updateCartCount();

  if (token) {
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";
  }
});


loginBtn.onclick = () => {
  authContainer.style.display = "flex";
  isLogin = true;
  updateForm();
};

signupBtn.onclick = () => {
  authContainer.style.display = "flex";
  isLogin = false;
  updateForm();
};


closeAuth.onclick = () => {
  authContainer.style.display = "none";
};

function updateForm() {
  if (isLogin) {
    formTitle.innerText = "Login";
    nameInput.style.display = "none";

    toggleText.innerHTML = `Don't have account? <span id="toggleBtn">Signup</span>`;
  } else {
    formTitle.innerText = "Signup";
    nameInput.style.display = "block";

    toggleText.innerHTML = `Already have account? <span id="toggleBtn">Login</span>`;
  }

  
  document.getElementById("toggleBtn").onclick = () => {
    isLogin = !isLogin;
    updateForm();
  };
}



document.getElementById("submitBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (!email || !password) {
      alert(" Fill all fields");
      return;
    }

    const url = isLogin
      ? "https://footwear-store-14.onrender.com/api/auth/login"
      : "https://footwear-store-14.onrender.com/api/auth/signup";
    const body = isLogin
      ? { email, password }
      : { name, email, password };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || " Server error");
      return;
    }

    alert(" Success");
    localStorage.setItem("token", data.token);

    authContainer.style.display = "none";

    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
    signupBtn.style.display = "none";

  } catch (err) {
    console.log(err);
    alert(" Network / Server error");
  }
});




logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  alert("Logged out");

  logoutBtn.style.display = "none";
  loginBtn.style.display = "block";
  signupBtn.style.display = "block";
};



const productButton = document.querySelector(".productButton");

productButton.addEventListener("click", async () => {

  const token = localStorage.getItem("token");

  if (!token) {
    alert("❌ Please login first");
    return;
  }

  const amount = choosenProduct.price * 100;

  const orderRes = await fetch("https://footwear-store-14.onrender.com/create-order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token
    },
    body: JSON.stringify({ amount })
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
       const product = {
          productId: choosenProduct.id,
          title: choosenProduct.title,
          price: choosenProduct.price,
          img: choosenProduct.colors[0].img,
          quantity: 1
        };

        await await fetch("https://footwear-store-14.onrender.com/save-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: token
          },
          body: JSON.stringify({
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            amount: orderData.amount,
            products: [product]   
          })
        });

        alert(" Payment + Order Saved!");
        window.location.href = "orders.html";

      } catch (err) {
        console.log(err);
        alert(" Order save failed");
      }
    }
  };

  var rzp = new Razorpay(options);
  rzp.open();
});


window.addEventListener("load", () => {

  const searchInput = document.querySelector(".searchInput");
  const searchIcon = document.querySelector(".searchIcon");

  if (!searchInput || !searchIcon) {
    console.log("Search elements not found ");
    return;
  }

  searchIcon.addEventListener("click", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = products.filter(product =>
      product.title.toLowerCase().includes(value)
    );

    if (filtered.length === 0) {
      alert(" No product found");
      return;
    }

    const index = products.findIndex(p => p.id === filtered[0].id);

    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    choosenProduct = products[index];

    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    currentProductColors.forEach((color, i) => {
      color.style.backgroundColor = choosenProduct.colors[i].code;
    });

    
    searchInput.value = "";
  });

  
  searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      searchIcon.click();
    }
  });

});

const joinBtn = document.querySelector(".fButton");
const emailInput = document.querySelector(".fInput");
const joinMsg = document.querySelector(".joinMsg");

joinBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();

 
  if (!email) {
    alert(" Please enter your email");
    return;
  }

  
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert(" Invalid email");
    return;
  }

 
  alert(" Joined successfully!");

 
  emailInput.value = "";       
  joinMsg.innerText = "You are subscribed!";
  joinMsg.style.color = "green";

  
  emailInput.focus();
});



document.addEventListener("DOMContentLoaded", () => {

  const addToCartBtn = document.querySelector(".addToCart");

  if (!addToCartBtn) {
    console.log(" Add to Cart button not found");
    return;
  }

  addToCartBtn.addEventListener("click", async () => {

    const token = localStorage.getItem("token");

    if (!token) {
      alert(" Please login first");
      authContainer.style.display = "flex";
      isLogin = true;
      updateForm();
      return;
    }

    try {
      const product = {
        productId: choosenProduct.id,
        title: choosenProduct.title,
        price: choosenProduct.price,
        img: choosenProduct.colors[0].img
      };

      const res = await fetch("https://footwear-store-14.onrender.com/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        },
        body: JSON.stringify({ product })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert(" Added to cart");

    
      updateCartCount();

   
      const cartBtn = document.querySelector(".cartBtn");
      if (cartBtn) {
        cartBtn.classList.add("cartAnimate");

        setTimeout(() => {
          cartBtn.classList.remove("cartAnimate");
        }, 300);
      }

    } catch (err) {
      console.log(err);
      alert("Error");
    }
  });

});