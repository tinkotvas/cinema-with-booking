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
      let mainpage=new MainPage();
      mainpage.render('main');
      //Draw booking modal
      let bookingModal = new Modal();
      bookingModal.render('main');

      let list = new List();
      list.loadJSON(() => list.renderViewings(), "viewings");

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
      let biograf=new Biograf();
      biograf.render('main');
    }
    if (url == '/regler') {
      $('main').empty();
      let regler=new Regler();
      regler.render('main');
    }
    if (url == '/godis') {
      $('main').empty();
      let godis=new Godis();
      godis.render('main');
    }
    if (url == '/minasidor') {
      $('main').html(`
          <h1 class="text-center mt-5">Mina Sidor Page</h1>
        `)
    }
    // if (url == '/modalBoka') {
    //   let modalBoka = new Modal();
    //   //$('main').empty();
    //   modalBoka.render('main');
    //   $('.bookingModal').modal('show');
    // }
  }
}
