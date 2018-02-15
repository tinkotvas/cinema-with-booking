class MyPage extends Base {
  constructor(films) {
    super();
    this.render('main', 1);
    this.bookings = [];
    this.toggleOrderModal();
    this.films = films;

  }
  init(jsonName) {
    return JSON._load(jsonName)
      .then((data) => {
        this.bookings = data.bookingHistory;
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

  toggleOrderModal() {
    let that = this;
    $(document).on("click", '.mypage-item', function () {
      that.idBtn = $(this).attr('id');
      let index = 0;
      let indexPoster = 0;

      for (let booking of that.bookings) {
        if ('orderModalToggle' + booking.filmTitle == that.idBtn) {
          $('.modal-container-item').empty();
          that.indexToOpen = index;

        }
        index++;
      }

      for (let film of that.films) {
        if ('orderModalToggle' + film.title == that.idBtn) {
          that.indexToOpenPoster = indexPoster;
        }
        indexPoster++;
      }
      that.render('.modal-container-item', 3);
      $('#orderModal').modal('toggle');
    });
  }
}

