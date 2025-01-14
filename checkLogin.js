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
window.onload = function() {
    checkLogin(); // 调用外部文件中的checkLogin函数
};
function loadCoursewareContent() {
    // 在这里加载courseware页面的内容
    console.log('Loading courseware content for logged in user.');
    // 你可以在这里添加代码来动态加载课程内容
}
// 初始化购物车数组
let cart = [];

// 添加课程到购物车
function addToCart(courseName, price, quantity) {
    // 检查课程是否已在购物车中
    let existingCourse = cart.find(course => course.name === courseName);
    if (existingCourse) {
        // 如果已存在，更新数量和总价
        existingCourse.quantity += quantity;
        existingCourse.totalPrice = existingCourse.price * existingCourse.quantity;
    } else {
        // 如果不存在，添加新课程
        cart.push({
            name: courseName,
            price: price,
            quantity: quantity,
            totalPrice: price * quantity
        });
    }
    // 更新购物车显示
    updateCartDisplay();
}

// 更新购物车显示
function updateCartDisplay() {
    let cartTable = document.getElementById('cart-table');
    cartTable.innerHTML = ''; // 清空表格内容
    let total = 0;
    cart.forEach(course => {
        let row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.name}</td>
            <td>$${course.price}</td>
            <td>${course.quantity}</td>
            <td>$${course.totalPrice}</td>
        `;
        cartTable.appendChild(row);
        total += course.totalPrice;
    });
    document.getElementById('cart-total').innerText = total.toFixed(2);
}

// 清空购物车
function clearCart() {
    cart = [];
    updateCartDisplay();
}

// 结账
function checkout() {
    alert('Checkout successful! Total: $' + document.getElementById('cart-total').innerText);
    clearCart(); // 结账后清空购物车
}

// 给添加按钮绑定事件
document.querySelectorAll('.add').forEach(button => {
    button.addEventListener('click', function() {
        let courseDiv = this.closest('.course');
        let courseName = courseDiv.querySelector('h2').innerText;
        let price = parseInt(courseDiv.querySelector('p').innerText);
        let quantity = parseInt(courseDiv.querySelector('.quantity-input').value);
        addToCart(courseName, price, quantity);
    });
});
