class Nav {
  constructor(){
    this.renderNav();
    this.changePage();
  }

  renderNav(){
    $('header').html(this.htmlNav());
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
        `)
    }
    if (url == '/biograf') {
      $('main').html(`
          <h1 class="text-center mt-5">Bio Page</h1>
        `)
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
