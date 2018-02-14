
class Modal extends Base{

  constructor(films, viewings){
      super();
      this.films = films;
      this.viewings = viewings;
      this.movieRuntime;
      this.htmlStarRatings = [];
      this.toggleBookingModal();
      this.toggleInfoModal();
      this.idBtn;
      this.indexToOpen;
      this.viewingToOpen;
      this.eventHandler();
      this.allMovieDates = [];
      this.selectDate;
      this.dateString;
      this.changedArr;
      this.totalPrice;
      this.auditorium = new Auditorium(this);

      this.totalTickets = 0;
      this.booking = new Booking(this);
      JSON._load('bookingNumber').then((data) => {
        this.bookingNumber = data.bookingNumber;
      });
  }
      
  toggleBookingModal() {
    let that = this;
    $(document).on("click", '.btn-booking', function() {
      $('#infoModal').modal('hide');
      that.allMovieDates = [];
      that.idBtn = $(this).attr('id');
      let index = 0;
      let co = 0;
      for (let film of that.films) {
        let idFilm ='bookingModalToggle'+film.title.replace(/\s+/g, '');
        if (idFilm == that.idBtn) {  
          for(let viewing of that.viewings){
          if(film.title == viewing.film){
            that.viewingToOpen = co;
            that.allMovieDates.push(viewing.date + ' ' + viewing.time + '%' + viewing.auditorium);
          }
          co++;
        }
          $('.modal-container-booking').empty();
          that.indexToOpen = index;
        }
        index++;
      }

      that.render('.modal-container-booking', 1);
      $('#bookingModal').modal('toggle');
      typeof this.auditorium == 'undefined' ? this.auditorium = new Auditorium():null;
      $(".confirm-booking").prop("disabled", true);
      that.renderShowingTime();
      that.showDateAndTime();
    });
  }


  renderShowingTime() {
    let that = this;
    for(let i = 0; i < that.allMovieDates.length; i++){
      that.dateString = that.allMovieDates[i];
      let index = that.allMovieDates[i].indexOf('-');
      let slicedArr = that.allMovieDates[i].slice(index+1);
      that.changedArr = slicedArr.replace('-', '/')
      let secondIndex = that.changedArr.indexOf('%');
      let currentAuditorium = that.changedArr.slice(secondIndex+1);
      that.changedArr = that.changedArr.slice(0, secondIndex)
      $('.select-date').append(`
          <option data-auditorium='${currentAuditorium}'>${that.changedArr}</option>
        `)
    }
  }

  showDateAndTime() {
    let that = this;
    this.auditorium;
    that.selectDate = $('#date-select option:selected').text();
    that.currentAuditorium = $('#date-select').find(':selected').attr('data-auditorium');
    that.auditorium.renderAuditorium(that.currentAuditorium);
    $('.select-date').change(function () {
      that.selectDate = $('#date-select option:selected').text();
      that.auditorium.totalSeats = that.totalTickets;
      that.currentAuditorium = $(this).find(':selected').attr('data-auditorium');
      that.auditorium.renderAuditorium(that.currentAuditorium);
      $('#showTime').empty();
      $('#showTime').text(that.selectDate + ' i ' + that.currentAuditorium);
    })
  }

  htmlMovieRatings() {
    let stars = [];
    for (let i = 0; i < this.films[this.indexToOpen].reviews.length; i++) {
      stars[i] = [];
      for (let ii = 0; ii < this.films[this.indexToOpen].reviews[i].max; ii++) {
        if (ii < this.films[this.indexToOpen].reviews[i].stars) {
          stars[i].push('<span class="fa fa-star checked"></span>');
        } else {
          stars[i].push('<span class="fa fa-star"></span>');
        }
      }
      let review = `
        <div class="col-6 col-lg-4 mb-3 mt-3 review">
          <h6 class="mb-1"><span class="text-red">${this.films[this.indexToOpen].reviews[i].source}</span></h6>
          <p class="mb-1">${this.films[this.indexToOpen].reviews[i].quote}</p>
          <span class="text-center">${stars[i].join("")}</span>
        </div>
      `;
      this.htmlStarRatings[i] = [];
      this.htmlStarRatings[i].push(review);
    }
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
      that.stringifyMovieRuntime();
      that.htmlMovieRatings();
      that.render('.modal-container-info', 2);
      $('#infoModal').modal('toggle');
    });
  }

  stringifyMovieRuntime() {
    let m = this.films[this.indexToOpen].length % 60;
    let h = (this.films[this.indexToOpen].length - m) / 60;
    this.movieRuntime = `${h.toString()} tim ${(m<10? "0": "")}${m.toString()} min`;
  }



  confirmBooking() {
    let that = this;
    $(document).on('click', '.confirm-booking', function() {
      // if(app.currentuser == 0){
      //  open login modal
      // }
      // else{}
      // first check if logged in otherwise open the login modal
      that.selectDate = $('#date-select option:selected').text();
      $('.modal-container-info').empty();
      that.render('.modal-container-info', 3);
      $('#summaryModal').modal('toggle');
      //save into currentUser.json
     
    });
  }


  eventHandler() {
    let that=this;
    $(document).on('hidden.bs.modal','#infoModal', function (e) {
      $('#infoModal').empty();
    });
    $(document).on('shown.bs.modal','#bookingModal', function (e) {
      that.auditorium.renderAuditorium(that.allMovieDates[0].split("%")[1]);
    });


      if(that.allMovieDates=[]){
        console.log("Not showing at all!");
      }else{
        that.auditorium.renderAuditorium(that.allMovieDates[0].split("%")[1]);
      }
      
    


    let adultTickets = 0;
    let childTickets = 0;
    let seniorTickets = 0;
    $(document).on('click', '#add-adult, #add-child, #add-senior, #sub-adult, #sub-child, #sub-senior', function (event) {
      let id = event.target.id;
      if (id == 'add-adult') {
        adultTickets++;
        $('#adultTickets').text(adultTickets);
      } else if (id == 'add-child') {
        childTickets++;
        $('#childTickets').text(childTickets);
      } else if (id == 'add-senior') {
        seniorTickets++;
        $('#seniorTickets').text(seniorTickets);
      } else if (id == 'sub-adult') {
        if (adultTickets == 0) {
          return;
        }
        adultTickets--;
        $('#adultTickets').text(adultTickets);
      } else if (id == 'sub-child') {
        if (childTickets == 0) {
          return;
        }
        childTickets--;
        $('#childTickets').text(childTickets);
      } else if (id == 'sub-senior') {
        if (seniorTickets == 0) {
          return;
        }
        seniorTickets--;
        $('#seniorTickets').text(seniorTickets);
      }

      that.totalTickets = adultTickets+childTickets+seniorTickets;
      that.auditorium.totalSeats = that.totalTickets;
      
      that.totalPrice = childTickets * 55 + adultTickets * 95 + seniorTickets * 65;
      $('.total-price').text('Summa: ' + that.totalPrice + ' kr');
      if (that.totalPrice > 0) {
        $(".confirm-booking").prop("disabled", false);
      } else {
        $(".confirm-booking").prop("disabled", true);
      }
    })
  }

}