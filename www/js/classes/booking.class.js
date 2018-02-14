class Booking extends Base {
	constructor(modal){
		super();
		this.modal = modal;
		this.confirmBooking();
		
	}







	confirmBooking() {
    let that = this;
    $(document).on('click', '.confirm-booking', function() {
    	/*checkIfLoggedIn(){
    	}*/

    	that.createBookingNumber()
    	// i jsonfilen blir det inte "" runt numret (för att det är ett nummer?)    	
    	
      that.selectDate = $('#date-select option:selected').text();
      $('.modal-container-info').empty();
      that.modal.render('.modal-container-info', 3);
      $('#summaryModal').modal('toggle');
      that.saveBooking();
    });
  }

  createBookingNumber(){
      this.modal.bookingNumber++;
      JSON._save('bookingNumber', { bookingNumber: this.modal.bookingNumber });
      return this.modal.bookingNumber;
  }

  saveBooking(){
  	let currentUser = app.currentUser;
  	let bookedDateAndTime = this.modal.dateString;
  	let findSpace = bookedDateAndTime.indexOf(' ');
  	let bookedDate = bookedDateAndTime.slice(0,findSpace);
  	let findPercent = bookedDateAndTime.indexOf('%');
  	let bookedTime = bookedDateAndTime.slice(findSpace+1, findPercent);
  	let seatsTaken = [23, 24, 25]; // Placeholder for booked seats

  	JSON._load(currentUser).then((data) => {
      this.userData = data;
      let stringifiedUserData = JSON.stringify(this.userData);
      	console.log(stringifiedUserData);
    });
  	
  	JSON._save(currentUser, {
	    bookingID: this.modal.bookingNumber,
	    filmTitle: this.modal.films[this.modal.indexToOpen].title,
	    date: bookedDate,
	    time: bookedTime,
	    auditorium: this.modal.currentAuditorium,
	    seatID: seatsTaken,
	    totalPrice: this.modal.totalPrice,
	    totalTickets: this.modal.totalTickets
  	})
  }
  /*checkIfLoggedIn(){
  	console.log(true);
  	// if(app.currentuser == 0){
      //  open login modal
      // }
      // else{}
      // first check if logged in otherwise open the login modal
  }*/

  }