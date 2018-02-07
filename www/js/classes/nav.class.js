class Nav extends Base{

  constructor(){
    super();
    this.clickEvents();
  }

  clickEvents(){
    let that = this;
    $(document).on('click','a.pop',function(e){
      //Create a push state preventDefault
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      //Call the change page function
      that.changePage();
      //Stop the browers from starting a page reload
      e.preventDefault();
    });

    $(document).on("click", '#bookingModalToggle', function() {
      $('#bookingModal').modal('toggle');
    });

    $(document).on("click", '#infoModalToggle', function() {
      $('#infoModal').modal('toggle');
    });
  }

  changePage(){
    //React on page changed, replace parts of DOM
    // get the current url
    let url = location.pathname;
    // change menu link active
    $('header a').removeClass('active');
    $(`header a[href="${url}"]`).addClass('active')
    if (url == '/') {
      $('main').empty();
      let mainpage=new MainPage(app.film);
      let modal = new Modal(app.film, app.lists);
      //mainpage.render('main');
      //Draw booking modal

      // modal.render('.modal-container-info', 1);
      // // Draw info modal
      // modal.render('.modal-container-booking', 2);

      let list = new List();
      list.loadJSON(() => list.renderViewings(), "viewings");
      // let modal = new Modal(list);
    }
    if (url == '/filmer') {
      $('main').empty();
      let moviepage=new MoviePage();
      moviepage.render('main');

      let list = new List();
      list.loadJSON(() => list.renderMovies(), "movies");
    }
    if (url == '/biograf') {
      //empty 'main', so that only one render will showen
      $('main').empty();
      // create instance here and render
      let biograf=new Auditorium();
      biograf.render('main');
    }
    if (url == '/regler') {
      $('main').empty();
      this.render('main', 'regler');
    }
    if (url == '/godis') {
      $('main').empty();
      this.render('main','godis');
    }
    if (url == '/minasidor') {
      $('main').empty();
      let mypage = new MyPage();
      
    }

  }
}
