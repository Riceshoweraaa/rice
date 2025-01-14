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

function loadCoursewareContent() {
    // 在这里加载courseware页面的内容
    console.log('Loading courseware content for logged in user.');
    // 你可以在这里添加代码来动态加载课程内容
}
