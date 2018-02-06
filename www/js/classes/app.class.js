class App {

  constructor(){
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film, List, Modal, Nav);
    // Load garments, add as a property, then start the app
    JSON._load('movies').then((movies)=>{
      this.film = movies;
      let modal = new Modal(this.film);
      JSON._load('viewings').then((data)=>{
        this.lists = data;
        this.renderNav();
        this.renderFooter();
        this.clickEvents();
      });
    });


    });
    this.renderNav();
    this.renderFooter();
    // this.clickEvents();
  }

  renderNav(){
    let nav = new Nav();
    $('header').empty();
    nav.render('header');
    nav.changePage();
    // let login = new Login();
    // login.render('header');
    // let signup = new Signup();
    // signup.render('header');
    window.addEventListener('popstate',nav.changePage);
  }

  renderFooter(){
    let footer = new Footer();
    $('footer').empty();
    footer.render('footer');
  }

  // clickEvents(){
  //   $(document).on("click", '#loginModalToggle', function() {
  //     $('#loginModal').modal('toggle');
  //   });
  //   $(document).on("click", '#opSignup', function() {
  //     $('#loginModal').modal('toggle');
  //     $('#signupModal').modal('toggle');
  //   });
  // }

}
