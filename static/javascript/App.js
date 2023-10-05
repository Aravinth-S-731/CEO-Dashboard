var navLinks = document.getElementById("navLinks");
function showMenu(){
    navLinks.style.top = "0";
}
function hideMenu(){
    navLinks.style.top = "-200px";
}
function openDashboardNav(){
    navLinks.style.left = "0";
}
function closeDashboardNav(){
    navLinks.style.left = "-200px";
}

window.addEventListener("load",function() {
    setTimeout(
        function open(event) {
            document.querySelector(".popup").style.display = "block";
        },
        2000
    )
})
document.querySelector("#closePopup").addEventListener("click", function(){
    document.querySelector(".popup").style.display = "none";
    login_section.style.filter = "none";
});


let login_section = document.getElementById("login-section");