let nav = new Nav();
let app = new App();


//Call changePage on initial page load
app.navigation();

//Call changePage when click back and forward
window.addEventListener('popstate',app.navigation);
