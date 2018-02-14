class MyPage extends Base {
  constructor() {
    super();
    this.bookingHistory = [];
  }
  init(jsonName) {
    return JSON._load(jsonName)
      .then((data) => {
        this.bookingHistory = data.bookingHistory;
        this.sortBooking(this.bookingHistory);
      });
  }

  sortBooking(array) {
    array.sort(function (a, b) {
      var dateA = new Date(a.date).getTime();
      var dateB = new Date(b.date).getTime();
      return dateA > dateB ? 1 : -1;
    })

  }

  renderBooking() {
    let date = new Date().getTime();
    // let month = date.getMonth() + 1;
    // if (month < 10) {
    //   month = "0" + month;
    // }
    // let day = date.getDate();
    // if (day < 10) {
    //   day = "0" + day;
    // }
    // let todayDate = date.getFullYear() + month + day + date.getHours() + date.getMinutes();
    this.render('main', 1);
    this.index = 0;

    for (let booking of this.bookingHistory) {
      let bookingDate = new Date(booking.date).getTime();
      if (bookingDate > date) {
        this.render('.activeBooking', 2);
      }
      else {
        this.render('.pastBooking', 2);
      }

      this.index++;
    }
  }
  
  toggleOrderModal(){
    let that = this;
    $(document).on("click", '.mypage-item', function() {
      that.idBtn = $(this).attr('id');
      let index = 0;
      let indexPoster = 0;
      for (let booking of that.bookingHistory) {
        if ('orderModalToggle'+booking.bookingID == that.idBtn) {
          $('.modal-container-item').empty();
          that.indexToOpen = index;
          for (let film of that.films) {
            if(film.title == booking.filmTitle ){
              that.indexToOpenPoster = indexPoster;
            }
            indexPoster++
          }
        }
        index++;
          
      }
      that.render('.modal-container-item', 3);
      $('#orderModal').modal('toggle');
    });
  }
}

