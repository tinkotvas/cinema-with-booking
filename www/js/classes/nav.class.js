class Nav extends Base {

  constructor(currentUser, films, viewings) {
    super();
    this.navCollapse();
  }

  navCollapse(){
    $(document).ready(function () {
      $(".navbar-nav li a").click(function(event) {
        $(".navbar-collapse").collapse('hide');
      });
    });
  }
}
