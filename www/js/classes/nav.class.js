class Nav extends Base {

  constructor() {
    super();
    this.clickEvents();
    this.modal;
    this.list;
    this.userName;
    this.clickSignOut();
  }

  clickEvents() {
    let that = this;
    $(document).on('click', 'a.pop', function (e) {
      //Create a push state preventDefault
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      //Call the change page function
      that.changePage();
      //Stop the browers from starting a page reload
      e.preventDefault();
    });

    $(document).on("click", '#bookingModalToggle', function () {
      $('#bookingModal').modal('toggle');
    });

    $(document).on("click", '#infoModalToggle', function () {
      $('#infoModal').modal('toggle');
    });
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
      let mainpage = new MainPage(app.film);
      
      typeof this.modal == 'undefined' ? this.modal = new Modal(app.film, app.lists):null;
      //mainpage.render('main');
      //Draw booking modal

      // modal.render('.modal-container-info', 1);
      // // Draw info modal
      // modal.render('.modal-container-booking', 2);

      typeof this.list == 'undefined' ? this.list = new List():null;
      this.list.loadJSON(() => this.list.renderViewings(), "viewings");
      // let modal = new Modal(list);
    }
    if (url == '/filmer') {
      $('main').empty();
      let moviepage = new MoviePage();
      moviepage.render('main');

      typeof this.modal == 'undefined' ? this.modal = new Modal(app.film, app.lists):null;
      typeof this.list == 'undefined' ? this.list = new List():null;

      this.list.loadJSON(() => this.list.renderMovies(), "movies");
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
      this.render('main', 'regler');
    }
    if (url == '/godis') {
      $('main').empty();
      this.render('main', 'godis');
    }
    if (url == '/minasidor') {
      $('main').empty();
      let mypage = new MyPage();

    }

  }

  renderLoginStatus() {
    $('#showLoginStatus').empty();
    if (app.currentUser == 0) {
      this.render('#showLoginStatus', 'lginBtn');
    } else {
      this.showUSname();
    }
  }

  showUSname() {
    this.userName = app.currentUser;
    $('#showLoginStatus').empty();
    this.render('#showLoginStatus', 'USname');
  }

  clickSignOut() {
    let that = this;
    $(document).on('click', '#signOut', function () {
      that.signOut().then(() => {
        $('#showLoginStatus').empty();
        that.render('#showLoginStatus', 'lginBtn');
      });
      location.pathname='/';
    });
  }

  signOut() {
    let that = this;
    that.usName = 0;
    return JSON._save('currentUser', { userName: that.usName });
    
}

}
