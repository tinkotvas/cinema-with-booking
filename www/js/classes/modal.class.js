class Modal extends Base{

  constructor(films, viewings){
      super();
      this.clickedFilm = new Film();
      this.films = films;
      this.viewings = viewings;
      this.toggleBookingModal();
      this.toggleInfoModal();
      this.idBtn;
      this.indexToOpen;
      this.confirmBooking();
      this.eventHandler();
      this.allMovieDates = [];
      this.selectDate;
  }

  toggleBookingModal(){
    let that = this;
    $(document).on("click", '.btn-booking', function() {
      that.idBtn = $(this).attr('id');
      let index = 0;
      for (let film of that.films) {
        let idFilm ='bookingModalToggle'+film.title.replace(/\s+/g, '');
        if (idFilm == that.idBtn) {
          for(let viewing of that.viewings){
          if(film.title == viewing.film){
            that.allMovieDates.push(viewing.date + ' ' + viewing.time);
          }
        }
          $('.modal-container-booking').empty();
          that.indexToOpen = index;
        }
        index++;
      }
      that.render('.modal-container-booking', 1);
      $('#bookingModal').modal('toggle');
      $(".confirm-booking").prop("disabled", true);
      that.renderShowingTime(); 
      that.showDateAndTime();
    });
  }

  renderShowingTime(){
    let that = this;
    for(let i = 0; i < that.allMovieDates.length; i++){
      $('.select-date').append(`
          <option>${that.allMovieDates[i]}</option>
        `)
    }
  }


  showDateAndTime(){
    let that = this;
    $('.select-date').change(function(){
      that.selectDate = $('#date-select option:selected').text();
    })
  }



  toggleInfoModal(){
    let that = this;
    $(document).on("click", '.btn-info', function() {
      that.idBtn = $(this).attr('id');
      let index = 0;
      for (let film of that.films) {
        let idFilm ='infoModalToggle'+film.title.replace(/\s+/g, '');
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

  confirmBooking(){
    let that = this;
    $(document).on('click', '.confirm-booking', function(event) {
      that.render('.modal-container-info', 3);
      $('#summaryModal').modal('toggle');
      $('#bookingModal').modal('toggle');
      event.preventDefault();

    });
  }


  eventHandler(){
    let adultTickets = 0;
    let childTickets = 0;
    let seniorTickets = 0;
    $(document).on('click', '#add-adult, #add-child, #add-senior, #sub-adult, #sub-child, #sub-senior', function(){
      let id = event.target.id;
      if(id == 'add-adult'){
        adultTickets++;
        $('.ticketArea').removeClass('d-none');
        $('#adultTickets').removeClass('d-none');
        $('#adultTickets').text(adultTickets);
      }
      else if(id == 'add-child'){
        childTickets++;
        $('.ticketArea').removeClass('d-none');
        $('#childTickets').removeClass('d-none');
        $('#childTickets').text(childTickets);
      }
      else if(id == 'add-senior'){
        seniorTickets++;
        $('.ticketArea').removeClass('d-none');
        $('#seniorTickets').removeClass('d-none');
        $('#seniorTickets').text(seniorTickets);
      }
      else if(id == 'sub-adult'){
        if(adultTickets == 0){
        return;
      }
        adultTickets--;
        $('#adultTickets').text(adultTickets);
      }
      else if(id == 'sub-child'){
        if(childTickets == 0){
        return;
      }
        childTickets--;
        $('#childTickets').text(childTickets);
      }
      else if(id == 'sub-senior'){
        if(seniorTickets == 0){
        return;
      }
        seniorTickets--;
        $('#seniorTickets').text(seniorTickets);
      }
      let totalPrice = childTickets * 55 + adultTickets * 95 + seniorTickets * 65;
      $('.total-sum').empty();
      $('#total-sum').text(totalPrice);

      if(totalPrice == 0){
        $(".confirm-booking").prop("disabled", true);
      }
      else{
        $(".confirm-booking").prop("disabled", false);
      }
    })
  }


}
