class App {

  constructor(){

    let nav = new Nav();
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film, Nav);

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

  start(){
    // Empty main element, then render auditoriums to main
    $('main').empty();
    console.log(nav);
    this.nav.htmlNav.render('main');

  }

}
