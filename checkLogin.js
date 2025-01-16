// checkLogin.js
function checkLogin() {
    var isLoggedIn = Cookies.get('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'login.html'; 
    } else {
        
        loadCoursewareContent();
    }
}

function loadCoursewareContent() {
    
    console.log('Loading courseware content for logged in user.');
    
}
