class Booking extends Base {
	constructor(modal) {
		super();
		this.modal = modal;
		this.confirmBooking();
	}

	getSelectedSeatNumbers() {
		let selectedSeatsElements = $('.selected');
		this.modal.selectedSeats = [];
		for (let i = 0; i < selectedSeatsElements.length; i++) {
			this.modal.selectedSeats.push(selectedSeatsElements[i].id.split('seatNr')[1])
		}
	}

	confirmBooking() {
		let that = this;
		$(document).on('click', '.confirm-booking', function () {
			// must check if any seats are written to viewings.json since the auditorium was rendered
			that.getSelectedSeatNumbers();
			that.createBookingNumber()
			$('.modal-container-info').empty();
			that.modal.render('.modal-container-info', 3);
			$('#summaryModal').modal('toggle');
			that.saveBooking();
		});
	}

	createBookingNumber() {
		this.modal.bookingNumber++;
		JSON._save('bookingNumber', {
			bookingNumber: this.modal.bookingNumber
		});
	}

  saveBooking(){
  	this.getSelectedSeatNumbers();
  	let bookedDateAndTime = this.modal.dateString;
  	let findSpace = bookedDateAndTime.indexOf(' ');
  	let bookedDate = bookedDateAndTime.slice(0,findSpace);
  	let findPercent = bookedDateAndTime.indexOf('%');
  	let bookedTime = bookedDateAndTime.slice(findSpace+1, findPercent);
  	let userName;
  	let userPass;
  	let bookingHistory;

  		if(app.currentUser == 0){
  			app.currentUser = 'NotSignedUp';
  		}
  		
  		JSON._load(app.currentUser).then((data) => {
        userName= data.email;
        userPass=data.password;
        if(!data.bookingHistory){
        	bookingHistory = [];
        }
        else{
        	bookingHistory=data.bookingHistory;
        	}
        let newBooking={
          bookingID: this.modal.bookingNumber,
          filmTitle: this.modal.films[this.modal.indexToOpen].title,
          date: bookedDate + ' ' +bookedTime,
          auditorium: this.modal.currentAuditorium,
          seatID: this.seatsTaken,
          totalPrice: this.modal.totalPrice,
          totalTickets: this.modal.totalTickets
        }
        bookingHistory.push(newBooking);
      }).then(()=>
      JSON._save(app.currentUser, {
        email: userName,
        password: userPass,
        bookingHistory  
     	}));
     this.saveToViewing();
   };

	saveToViewing() {
		let date = `2018-${this.modal.selectDate.split('/')[0]}-${this.modal.selectDate.split('/')[1].split(" ")[0]}`

		let selectedViewing = {
			auditorium: this.modal.currentAuditorium,
			film: this.modal.films[this.modal.indexToOpen].title,
			date: date,
			time: this.modal.selectDate.split('/')[1].split(" ")[1],
			selectedSeats: this.modal.selectedSeats
		}

		let indexOfViewing = this.modal.viewings.findIndex(viewing =>
			viewing.auditorium == selectedViewing.auditorium &&
			viewing.film == selectedViewing.film &&
			viewing.date == selectedViewing.date &&
			viewing.time == selectedViewing.time);


		if(typeof this.modal.viewings[indexOfViewing].selectedSeats == 'undefined'){
			this.modal.viewings[indexOfViewing].selectedSeats = [];
		}
		this.modal.viewings[indexOfViewing].selectedSeats.push(...selectedViewing.selectedSeats);
		
		JSON._save('viewings',this.modal.viewings).then(function(){

		})
	}

}
