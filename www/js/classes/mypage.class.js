class MyPage extends Base {
  constructor(){
    super();
    JSON._load('dummyBooking').then((dummyBooking)=>{
      this.dummyBooking = dummyBooking;
      this.renderBooking();
      this.toggleOrderModal();
    });
  }

  renderBooking(){
    let date = new Date();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let todayDate = date.getFullYear()+month+day+date.getHours()+date.getMinutes();
    this.render('main', 1);
    this.index = 0;

    for (let booking of this.dummyBooking) {
      let bookingDate = booking.date.replace(/-/g, '')+booking.time.replace(/\./g, '')
      if (bookingDate > todayDate) {
        this.render('.activeBooking', 2);
      }
      else
      this.render('.pastBooking', 2);
      this.index++;
    }
  }

  toggleOrderModal(){
    let that = this
    $(document).on("click", '.mypage-item', function() {
      that.idBtn = $(this).attr('id');
      let index = 0;
      let movieIndex = 0;
      for (let film of that.dummyBooking) {
        let idFilm ='orderModalToggle'+film.filmTitle.replace(/\s+/g, '');
        if (idFilm == that.idBtn) {
          $('.modal-item').empty();
          that.indexToOpen = index;
        }
        index++;
      }
      that.render('.modal-item', 3);
      $('#orderModal').modal('show');

    });
  }
}
