class Modal extends Base{

  constructor(films){
      super();
      this.clickedFilm = new Film();
      this.films = films;
      this.toggleBookingModal();
      this.toggleInfoModal();
  }

  toggleBookingModal(){
    let that = this;
    $(document).on("click", '.btn-booking', function() {
      // let idBtn = $(this).attr('id');
      // let index = 0;
      // for (let film of that.films) {
      //   let idFilm ='bookingModalToggle'+film.title.replace(/\s+/g, '');
      //   if (idFilm == idBtn) {
      //     $('.modal-container-booking').empty();
      //     //console.log(index);
      //     //that.template1(that.films[index]);
      //     //console.log(that.films[index]);
      //     that.clickedFilm.openFilm(that.films, index)
      //     //film.render('.modal-container-booking', 1);
      //   }
      //   index++;
      // }
      //that.films.clickedFilm(that.films);
      $('.modal-container-booking').empty();
      that.render('.modal-container-booking', 1);
      $('#bookingModal').modal('toggle');

    });
  }
  toggleInfoModal(){
    let that = this;
    $(document).on("click", '.btn-info', function() {
      //let idBtn = $(this).attr('id');
      //console.log('#'+idBtn);
      //that.template2();
      $('.modal-container-info').empty();
      that.render('.modal-container-info', 2);
      $('#infoModal').modal('toggle');
      //$('#'+idBtn).modal('toggle');
    });
  }
}
