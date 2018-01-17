class Nav extends Base{

  constructor(){
    super();
    this.clickEvents();
  }

  clickEvents(){
    let that = this;
    $(document).on('click','nav a',function(e){
      //Create a push state preventDefault
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      //Call the change page function
      that.changePage();
      //Stop the browers from starting a page reload
      e.preventDefault();
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
      $('main').html(`
          <h1 class="text-center mt-5">Home Page</h1>
        `)
    }
    if (url == '/filmer') {
      $('main').html(`
          <h1 class="text-center mt-5">Filmer Page</h1>
        `);
    }
    if (url == '/biograf') {
      $('main').empty();
      let biograf=new Biograf();
      biograf.render('main');
    }
    if (url == '/regler') {
      $('main').html(`
          <h1 class="text-center mt-5">Regler Page</h1>
        `)
    }
    if (url == '/godis') {
      $('main').html(`
          <h1 class="text-center mt-5">Godis Page</h1>
        `)
    }
    if (url == '/minasidor') {
      $('main').html(`
          <h1 class="text-center mt-5">Mina Sidor Page</h1>
        `)
    }
  }
}
