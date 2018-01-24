class Modal extends Base{

  constructor(){
      super();
      this.toggleBookingModal();
      this.toggleInfoModal();
  }

  toggleBookingModal(){
    $(document).on("click", '#bookingModalToggle', function() {
      $('#bookingModal').modal('toggle');
      
    });
  }
  toggleInfoModal(){
    $(document).on("click", '#infoModalToggle', function() {
      $('#infoModal').modal('toggle');
    });
  }
}
