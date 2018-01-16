class App {

  constructor(){

    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Garment);

    // Load garments, add as a property, then start the app
    JSON._load('garments').then((garments)=>{
      this.garments = garments;
      this.start();
    });

  }

  start(){
    // Empty main element, then render auditoriums to main
    $('main').empty();
    this.garments.render('main');
  }

}
