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
    $(document).on('click', 'main', function () {
      $(".navbar-collapse").collapse('hide');
    });
    $( window ).resize(function() {
      if ($( window ).width() > 991) {
        $(".navbar-collapse").collapse('hide');
      }
    });
  }
}
