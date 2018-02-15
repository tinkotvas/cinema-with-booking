class Nav extends Base {

  constructor(currentUser, films, viewings) {
    super();
    this.navCollapse();
  }

  navCollapse(){
    $(document).ready(function () {
      $(".nav-close").click(function(event) {
        $(".navbar-collapse").collapse('hide');
      });
    });
  }
}
