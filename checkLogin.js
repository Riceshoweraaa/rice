// checkLogin.js
function checkLogin() {
    var isLoggedIn = Cookies.get('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html'; // 如果未登录，重定向到登录页面
    } else {
        // 已登录，可以加载courseware页面的内容
        loadCoursewareContent();
    }
}


 // Get all "Add" buttons
const addButtons = document.querySelectorAll('.button.add');

// Get the cart table and total amount element
const cartTable = document.getElementById('cart-table');
const cartTotal = document.getElementById('cart-total');

// Cart object to store courses and their quantities
let cart = {};

// Attach event listener to each "Add" button
addButtons.forEach((button, index) => {
  button.addEventListener('click', () => {
    // Get course information
    const courseDiv = button.closest('.course');
    const courseId = courseDiv.querySelector('h2').textContent;
    const courseFee = parseFloat(courseDiv.querySelector('h3 p').textContent);
    const courseQuantity = parseInt(courseDiv.querySelector('.quantity-input').value);

    // If the course is already in the cart, update the quantity
    if (cart[courseId]) {
      cart[courseId].quantity += courseQuantity;
    } else {
      // Add new course to the cart
      cart[courseId] = {
        fee: courseFee,
        quantity: courseQuantity
      };
    }

    // Update the cart display
    updateCart();
  });
});

// Function to update the cart display
function updateCart() {
  // Clear the cart table
  cartTable.innerHTML = '';

  // Iterate through the cart object and update the table
  let total = 0;
  for (const courseId in cart) {
    const item = cart[courseId];
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${courseId}</td>
      <td>$${item.fee.toFixed(2)}</td>
      <td>${item.quantity}</td>
      <td>$${(item.fee * item.quantity).toFixed(2)}</td>
      <td><button class="remove" data-course="${courseId}">Remove</button></td>
    `;
    cartTable.appendChild(row);

    // Calculate the total amount
    total += item.fee * item.quantity;
  }

  // Update the total amount display
  cartTotal.textContent = total.toFixed(2);

  // Attach event listener to each "Remove" button
  const removeButtons = document.querySelectorAll('.remove');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const courseId = button.getAttribute('data-course');
      delete cart[courseId]; // Remove the course from the cart
      updateCart(); // Refresh the cart display
    });
  });
}

// Checkout function
function checkout() {
  // If the cart is empty, show an alert
  if (Object.keys(cart).length === 0) {
    alert('Your cart is empty.');
    return;
  }
  // Display a thank you message and the total amount
  alert('Thank you for your purchase! Total: $' + cartTotal.textContent);
  clearCart(); // Clear the cart after checkout
}

// Function to clear the cart
function clearCart() {
  cart = {}; // Reset the cart object
  updateCart(); // Refresh the cart display
}
function login(){
    //获取输入框账号密码
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    //获取cookie里的账号密码
    var CookieUsername = document.cookie.match(/(?:^|;)\s*username=([^;]+)/)[1];
    var CookiePassword = document.cookie.match(/(?:^|;)\s*password=([^;]+)/)[1];

    //值一样登录成功
    if(username == CookieUsername && password == CookiePassword)
    {
        setCookie("isLoggedIn", true, 7);

        window.open("index.html");
    }else{

        alert("请先输入正确的账号密码")
    }

}

//保存cookie函数
function setCookie(name, value, days) {
   var expires = "";
   if (days) {
       var date = new Date();
       date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
       expires = "; expires=" + date.toUTCString();
   }
   document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
