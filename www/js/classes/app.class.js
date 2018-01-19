class App {

  constructor(){
    this.renderNav();
    this.renderFooter();
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film, List);
    // Load garments, add as a property, then start the app
    JSON._load('movies').then((movies)=>{
      this.film = movies;

      //test code. check if JSON load into the right way
      // for(let f of this.film){
      //   //console.log(f.getTitle());
      // }
    });
    JSON._load('viewings').then((data)=>{
      this.lists = data;

      //console.log(this.lists);
    
    });

  }

  renderNav(){
    let nav = new Nav();
    $('header').empty();
    nav.render('header');
     // chagePage() has to be called to make the navBar active, and I don't know why it only works this way
    nav.changePage();
   
    window.addEventListener('popstate',nav.changePage);
  }

  renderFooter(){
    let footer = new Footer();
    $('footer').empty();
    footer.render('footer');
  }

}
