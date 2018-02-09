class App {
  
  constructor() {
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film, List, Modal, Nav, Profile);
    JSON._load('currentUser').then((data)=>{
      this.currentUser=data.userName;
    });
    JSON._load('movies').then((movies) => {
      this.films = movies;
      JSON._load('viewings').then((data)=>{
        this.viewings = data;
        this.nav = new Nav();
        this.profile = new Profile(this.nav);
        this.renderNav(this.nav);
        this.renderFooter();
        this.clickEvents();
      });
    });


  }

  renderNav(nav) {
    
    $('header').empty();
    nav.render('header');
    nav.renderLoginStatus();
    nav.changePage();
    window.addEventListener('popstate', nav.changePage);
  }

  renderFooter() {
    let footer = new Footer();
    $('footer').empty();
    footer.render('footer');
  }

  clickEvents() {
    let that = this;
    $(document).on("click", '#loginModalToggle', function () {
     
      that.profile.toggleLoginModal();
    });

    $(document).on("click", '#opSignup', function () {
      that.profile.toggleSignupModal();
    });
  }

  getCurrentUser(val) {
    this.currentUser = val;
    // console.log(this.currentUser);
  }
 


}
