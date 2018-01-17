class App {

  constructor(){

<<<<<<< HEAD
    let nav = new Nav();
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film, Nav);
=======
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film);
>>>>>>> origin/develop

    // Load garments, add as a property, then start the app
    JSON._load('movies').then((movies)=>{
      this.film = movies;
      //this.start();

      //test code. check if JSON load into the right way
      for(let f of this.film){
<<<<<<< HEAD
        //console.log(f.getTitle());
=======
        console.log(f.getTitle());
>>>>>>> origin/develop
      }
    });

  }

<<<<<<< HEAD
  start(){
    // Empty main element, then render auditoriums to main
    $('main').empty();
    console.log(nav);
    this.nav.htmlNav.render('main');

  }
=======
  // start(){
  //   // Empty main element, then render auditoriums to main
  //   $('main').empty();
  //   this.garments.render('main');
  // }
>>>>>>> origin/develop

}
