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
        this.profile=new Profile();
        this.renderNav();
        this.renderFooter();
        this.clickEvents();
      });
    });


  }

  renderNav(){
    let nav = new Nav();
    $('header').empty();
    nav.render('header');
    nav.changePage();
    
    this.profile.render('header','login');
    this.profile.render('header','signup');
    window.addEventListener('popstate',nav.changePage);
  }

  renderFooter(){
    let footer = new Footer();
    $('footer').empty();
    footer.render('footer');
  }

  clickEvents(){
   let that=this;
    $(document).on("click", '#loginModalToggle', function () {
      that.profile.toggleLoginModal();
    });

    $(document).on("click", '#opSignup', function () {
      that.profile.toggleSignupModal();
  
    });
  }

}
