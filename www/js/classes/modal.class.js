class Modal extends Base {

  constructor(films) {
    super();
    this.clickedFilm = new Film();
    this.films = films;
    this.toggleBookingModal();
    this.toggleInfoModal();
    this.toggleLoginModal();
    this.toggleSignupModal();
    this.idBtn;
    this.indexToOpen;
  }

  toggleBookingModal() {
    let that = this;
    $(document).on("click", '.btn-booking', function () {
      that.idBtn = $(this).attr('id');
      let index = 0;
      for (let film of that.films) {
        let idFilm = 'bookingModalToggle' + film.title.replace(/\s+/g, '');
        if (idFilm == that.idBtn) {
          $('.modal-container-booking').empty();
          that.indexToOpen = index;
        }
        index++;
      }
      that.render('.modal-container-booking', 1);
      $('#bookingModal').modal('toggle');

    });
  }
  toggleInfoModal() {
    let that = this;
    $(document).on("click", '.btn-info', function () {
      that.idBtn = $(this).attr('id');
      let index = 0;
      for (let film of that.films) {
        let idFilm = 'infoModalToggle' + film.title.replace(/\s+/g, '');
        if (idFilm == that.idBtn) {
          $('.modal-container-info').empty();
          that.indexToOpen = index;
        }
        index++;
      }
      that.render('.modal-container-info', 2);
      $('#infoModal').modal('toggle');
      //$('#'+idBtn).modal('toggle');
    });
  }

  toggleLoginModal() {
    let that=this;
    $(document).on("click", '#loginModalToggle', function() {
      that.render('.modal-container-login', 'login');
      $('#loginModal').modal('toggle');
    });
  }

  toggleSignupModal() {
    let that=this;
    $(document).on("click", '#opSignup', function() {
      that.render('.modal-container-signup', 'signup');
      $('#loginModal').modal('toggle');
      $('#signupModal').modal('toggle');
    });
  }

}


