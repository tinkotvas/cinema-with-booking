class MyPage extends Base {
  constructor(films){
    super();
    this.films = films;
    this.toggleOrderModal();
  }

  renderBooking(){
    JSON._load('dummyBooking').then((dummyBooking)=>{
      this.dummyBooking = dummyBooking;
      this.listBookingInfo();
    });
  }

  listBookingInfo(){
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
      for (let booking of that.dummyBooking) {
        if ('orderModalToggle'+booking.bookingID == that.idBtn) {
          $('.modal-container-item').empty();
          that.indexToOpen = index;
          //console.log(booking.filmTitle);
          for (let film of that.films) {
            if (film.title == booking.filmTitle) {
              console.log(film.director);
              
            }
          }
          //console.log(film.filmTitle);
          
        }
        index++;
      }
      that.render('.modal-container-item', 3);
      $('#orderModal').modal('toggle');
    });
  }
}
