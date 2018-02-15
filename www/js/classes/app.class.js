class App extends Base {

  constructor() {
    super();
    JSON._classes(List, Modal, Nav, Profile);
    JSON._load('currentUser').then((data) => {
      this.currentUser = data.userName;
    });
    JSON._load('movies').then((movies) => {
      this.films = movies;
      JSON._load('viewings').then((data) => {
        this.viewings = data;
        this.nav = new Nav(this.currentUser, this.films, this.viewings);
        this.profile = new Profile(this.nav);
        this.renderNav(this.nav);
        this.renderFooter();
        this.clickEvents();
        this.clickSignOut();
      });
    });
  }
  renderLoginStatus() {
    $('#showLoginStatus').empty();
    if (this.currentUser == 0) {
      this.render('#showLoginStatus', 'lginBtn');
    } else {
      this.showUSname();
    }
  }

  showUSname() {
    $('#showLoginStatus').empty();
    this.render('#showLoginStatus', 'USname');
  }

  clickSignOut() {
    let that = this;
    $(document).on('click', '#signOut', function () {
      $('#showLoginStatus').empty();
        that.render('#showLoginStatus', 'lginBtn');
      that.signOut();
      location.pathname = '/';
    });
  }

  signOut() {
    let that = this;
    that.currentUser = 0;
    return JSON._save('currentUser', {
      userName: that.currentUser
    });
  }

  renderNav(nav) {
    $('header').empty();
    this.nav.render('header');
    this.renderLoginStatus();
    this.changePage();
    window.addEventListener('popstate', this.changePage.bind(this));
  }

  renderFooter() {
    let footer = new Footer();
    $('footer').empty();
    footer.render('footer');
  }

  clickEvents() {
    let that = this;
    $(document).on("click", '#bookingModalToggle', function () {
      $('#bookingModal').modal('toggle');
    });

    $(document).on("click", '#infoModalToggle', function () {
      $('#infoModal').modal('toggle');
    });
    $(document).on('click', 'a.pop', function (e) {
      //Create a push state preventDefault
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      //Call the change page function
      that.changePage();
      //Stop the browers from starting a page reload
      e.preventDefault();
    });

    $(document).on("click", '#loginModalToggle', function () {
      that.profile.toggleLoginModal();
    });

    $(document).on("click", '#opSignup', function () {
      that.profile.toggleSignupModal();
    });
  }

  getCurrentUser(val) {
    this.currentUser = val;
  }

  changePage() {
    //React on page changed, replace parts of DOM
    // get the current url
    let url = location.pathname;
    // change menu link active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active')
    if (url == '/') {
      $('main').empty();
      let mainpage = new MainPage(this.films);

      typeof this.modal == 'undefined' ? this.modal = new Modal(this.films, this.viewings) : null;

      typeof this.list == 'undefined' ? this.list = new List(this.films, this.viewings) : null;
      this.list.renderViewings();
    }
    if (url == '/filmer') {
      $('main').empty();
      let moviepage = new MoviePage();
      moviepage.render('main');

      typeof this.modal == 'undefined' ? this.modal = new Modal(this.films, this.viewings) : null;
      typeof this.list == 'undefined' ? this.list = new List(this.films, this.viewings) : null;

      this.list.renderMovies();
    }
    if (url == '/biograf') {
      //empty 'main', so that only one render will showen
      $('main').empty();
      // create instance here and render
      let biograf = new Auditorium();
      biograf.render('main');
    }
    if (url == '/regler') {
      $('main').empty();
      this.nav.render('main', 'regler');
    }
    if (url == '/kiosk') {
      $('main').empty();
      this.nav.render('main', 'kiosk');
    }
    if (url == '/minasidor') {
      $('main').empty();
      typeof this.myPage == 'undefined' ? this.myPage = new MyPage  (this.films) : null;
      this.myPage.init(this.currentUser).then(()=>{
        this.myPage.renderBooking();
    });

  }
}
}