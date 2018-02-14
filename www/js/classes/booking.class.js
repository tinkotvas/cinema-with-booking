class Booking extends Base {
	constructor(modal) {
		super();
		this.modal = modal;
		this.confirmBooking();
		//this.selectedSeats = [];

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
			/*checkIfLoggedIn(){
			}*/
			that.getSelectedSeatNumbers();
			that.createBookingNumber()
			that.selectDate = $('#date-select option:selected').text();
			$('.modal-container-info').empty();
			that.modal.render('.modal-container-info', 3);
			$('#summaryModal').modal('toggle');
			that.saveBooking();
			that.modal.adultTickets = 0;
      that.modal.childTickets = 0;
      that.modal.seniorTickets = 0;
		});
	}

	createBookingNumber() {
		this.modal.bookingNumber++;
		JSON._save('bookingNumber', {
			bookingNumber: this.modal.bookingNumber
		});
		return this.modal.bookingNumber;
	}

  saveBooking(){
  	this.getSelectedSeatNumbers();
  	//let currentUser = app.currentUser;
  	let bookedDateAndTime = this.modal.dateString;
  	let findSpace = bookedDateAndTime.indexOf(' ');
  	let bookedDate = bookedDateAndTime.slice(0,findSpace);
  	let findPercent = bookedDateAndTime.indexOf('%');
  	let bookedTime = bookedDateAndTime.slice(findSpace+1, findPercent);

  		let userName;
  		let userPass;
  		let bookingHistory;

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

      //this.userHistory = data;
      //console.log(this.userHistory.filmTitle);
      //let stringifiedUserData = JSON.stringify(this.userData);
      	//console.log(stringifiedUserData);
      /*JSON._save(app.currentUser, {
      	data,
      	bookingHistory: {
		    bookingID: this.modal.bookingNumber,
		    filmTitle: this.modal.films[this.modal.indexToOpen].title,
		    date: bookedDate,
		    time: bookedTime,
		    auditorium: this.modal.currentAuditorium,
		    totalPrice: this.modal.totalPrice,
		    totalTickets: this.modal.totalTickets,
		    selectedSeats: this.selectedSeats
		    }
  		})
    });*/
  	
  /*checkIfLoggedIn(){
  	console.log(true);
  	// if(app.currentuser == 0){
      //  open login modal
      // }
      // else{}
      // first check if logged in otherwise open the login modal
  }*/


		

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
