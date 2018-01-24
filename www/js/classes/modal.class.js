class Modal extends Base{

  constructor(){
      super();
      this.toggleBookingModal();
      this.toggleInfoModal();
  }

  toggleBookingModal(){
    $(document).on("click", '#bookingModalToggle', function() {
      $('#bookingModal').modal('toggle');
      console.log(this);
      
    });
  }
  toggleInfoModal(){
    $(document).on("click", '#infoModalToggle', function() {
      $('#infoModal').modal('toggle');
      console.log(this);
      
    });
  }
}
