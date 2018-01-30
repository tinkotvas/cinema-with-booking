class App extends Base{

  constructor(){
    super();
    // Tell jsonflex to recreate instances of the class Garment
    JSON._classes(Film, List, Modal);
    // Load garments, add as a property, then start the app
    JSON._load('movies').then((movies)=>{
      this.film = movies;
      let modal = new Modal(this.film)
      //test code. check if JSON load into the right way
      // for(let f of this.film){
      //   //console.log(f.getTitle());
      // }
    });
    JSON._load('viewings').then((data)=>{
      this.lists = data;

      //console.log(this.lists);

    });
    this.renderNav();
    this.renderFooter();
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
      
      
      //let mainpage=new MainPage();
      this.render('main', 'mainpage');
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

  }

  renderNav(){

    $('header').empty();
    this.render('header', 'nav');
    this.changePage();

    window.addEventListener('popstate',this.changePage);
  }

  renderFooter(){
    $('footer').empty();
    this.render('footer', 'footer');
  }

  clickEvents(){
    $(document).on("click", '#loginModalToggle', function() {
      $('#loginModal').modal('toggle');
    });
    $(document).on("click", '#opSignup', function() {
      $('#loginModal').modal('toggle');
      $('#signupModal').modal('toggle');
    });
  }

}
