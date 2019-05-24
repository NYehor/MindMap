let authHeader;
let user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
    authHeader = { 'Authorization': 'Bearer ' + user.token };
} 
else {
    authHeader = {};
}

export default authHeader;
