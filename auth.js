
function login() {
    const role = document.getElementById('role').value;
    const pass = document.getElementById('pass').value;

    // Use the standard access code you provided
    if (pass === "1234") {
        sysLog("LOGIN_SUCCESS", { userRole: role });
        
        // Save the role so the system remembers who is logged in
        localStorage.setItem('userRole', role);
        
        alert("Login Successful! Welcome " + role);
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Access Code. Please use 1234");
    }
}