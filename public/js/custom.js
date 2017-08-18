// Snackbar function
function toast() {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar")

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

// Show hide dropmenu navbar
function show() {
    var x = document.getElementById('drop');
    x.style.display = "block";
}
function hide() {
    var x = document.getElementById('drop');
    x.style.display = "none";
}
