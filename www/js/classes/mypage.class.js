class MyPage extends Base {
  constructor(films) {
    super();
    this.render('main', 1);
    this.bookings = [];
    this.toggleOrderModal();
    this.films=films;
   
  }
  init(jsonName) {
    return JSON._load(jsonName)
      .then((data) => { 
        this.bookings= data.bookingHistory;
        this.sortBooking(this.bookings);
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
    
    this.index = 0;

    for (let booking of this.bookings) {
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
      // might be something wrong with the loops, 
      //it runs many times and undifined for the first 3 loops that.indexToOpenPoster is not correct
      for (let booking of that.bookings) {
        if ('orderModalToggle'+booking.filmTitle == that.idBtn) {
          $('.modal-container-item').empty();
          that.indexToOpen = index;
          for (let film of that.films) {
            console.log(film.title);
            if(film.title == booking.filmTitle ){
              that.indexToOpenPoster = indexPoster;
            }
            indexPoster++;
          }
        }
        index++;
          console.log(that.indexToOpenPoster);
      }
      that.render('.modal-container-item', 3);
      $('#orderModal').modal('toggle');
    });
  }
}

// something went wrong for bookingModal when link from InfoModal
//It's not scrolling and auditorium render is not currect