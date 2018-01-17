class App {

  constructor(){
    this.renderNav();
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film);
    // Load garments, add as a property, then start the app
    JSON._load('movies').then((movies)=>{
      this.film = movies;
      //this.start();

      //test code. check if JSON load into the right way
      for(let f of this.film){
        //console.log(f.getTitle());
      }
    });

  }

  renderNav(){
    let nav = new Nav();
    $('header').empty();
    nav.render('header');
     // chagePage() has to be called to make the navBar active
    nav.changePage();
   
    window.addEventListener('popstate',nav.changePage);
  }

}
