class Modal extends Base{

  constructor(){
      super();
      this.toggleModal();
  }

  toggleModal(){
    $(document).on("click", '#bookingModalToggle', function() {

      $('#bookingModal').modal('toggle');
    });


  }
}
