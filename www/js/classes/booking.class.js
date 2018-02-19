class Booking extends Base {
	constructor(modal) {
		super();
		this.modal = modal;
		this.mouseX;
		this.mouseY;
		this.eventHandlers();
	}

	eventHandlers(){
		let that = this;

		$(document).on({
			mousemove: function(e){
				if(!(/hidden/i.test($('#mouseTooltip').css('visibility')))){
					that.mouseX = e.pageX; 
					that.mouseY = e.pageY;
					$('#mouseTooltip').css({'top':that.mouseY-80,'left':that.mouseX - 100});
				}
			},
			click: function(e){
				that.mouseX = e.pageX; 
				that.mouseY = e.pageY;
				$('#mouseTooltip').css({'top':that.mouseY-80,'left':that.mouseX - 100});
				$('#mouseTooltip').hide();
			}
		})

		$(document).on('click', '.confirm-booking', function () {
			 let confirmBookingFunc = function () {
				 let seatAlreadyBooked = false;
				 let indexOfViewing = that.modal.getViewingIndex();
				 that.getSelectedSeatNumbers();
				 let viewing = that.modal.viewings[indexOfViewing]
				 typeof viewing.selectedSeats == 'undefined' ? viewing.selectedSeats = [] : null;
 
				 if (typeof viewing.selectedSeats[0] == 'string') {
					 for (let i = 0; i < viewing.selectedSeats.length; i++) {
						 if (viewing.selectedSeats && that.modal.selectedSeats.includes(viewing.selectedSeats[i].toString())) {
							 seatAlreadyBooked = true;
							 break;
						 }
					 }
				 }
				 if (seatAlreadyBooked) {
					 that.modal.app.auditorium.htmlRenderAuditorium(that.modal.currentAuditorium);
					 that.showMouseMessage();
				 } else {
					 $('#bookingModal').modal('hide');
					 that.createBookingNumber()
					 $('.modal-container-info').empty();
					 that.modal.render('.modal-container-info', 3);
					 $('#summaryModal').modal('toggle');
					 that.saveBooking();
				 }
			 };
			 that.loadViewings(() => confirmBookingFunc());
		 });
	}

	getSelectedSeatNumbers() {
		let selectedSeatsElements = $('.selected');
		this.modal.selectedSeats = [];
		for (let i = 0; i < selectedSeatsElements.length; i++) {
			this.modal.selectedSeats.push(selectedSeatsElements[i].id.split('seatNr')[1])
		}
	}

	loadViewings(callbackFunc) {
		JSON._load('viewings').then((data) => {
			this.modal.viewings = data;
			callbackFunc && callbackFunc();
		}).
		catch((e) => {

		});
	}

	showMouseMessage(){
		$('#mouseTooltip span').html("En eller flera av dina platser blev tyvärr bokade.");
		$('#mouseTooltip').stop(false, true).fadeIn('fast').delay(7000).fadeOut('slow');	
	}

	createBookingNumber() {
		this.modal.bookingNumber++;
		JSON._save('/booking/bookingNumber', {
			bookingNumber: this.modal.bookingNumber
		});
	}

	saveBooking() {
		this.getSelectedSeatNumbers();
		let bookedDateAndTime = this.modal.dateString;
		let findSpace = bookedDateAndTime.indexOf(' ');
		let bookedDate = bookedDateAndTime.slice(0, findSpace);
		let findPercent = bookedDateAndTime.indexOf('%');
		let bookedTime = bookedDateAndTime.slice(findSpace + 1, findPercent);
		let userName;
		let userPass;
		let bookingHistory;

		if (app.currentUser == 0) {
			app.currentUser = 'NotSignedUp';
		}
		JSON._load('/users/' + app.currentUser).then((data) => {
			userName = data.email;
			userPass = data.password;
			if (!data.bookingHistory) {
				bookingHistory = [];
			} else {
				bookingHistory = data.bookingHistory;
			}
			let newBooking = {
				bookingID: this.modal.bookingNumber,
				filmTitle: this.modal.films[this.modal.indexToOpen].title,
				date: bookedDate + ' ' + bookedTime,
				auditorium: this.modal.currentAuditorium,
				seatID: this.modal.selectedSeats,
				totalPrice: this.modal.totalPrice,
				totalTickets: this.modal.totalTickets
			}
			bookingHistory.push(newBooking);
		}).then(() =>
			JSON._save('/users/' + app.currentUser, {
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

		let viewingIndex = this.modal.getViewingIndex();

		if (typeof this.modal.viewings[viewingIndex].selectedSeats == 'undefined') {
			this.modal.viewings[viewingIndex].selectedSeats = [];
		}
		this.modal.viewings[viewingIndex].selectedSeats.push(...selectedViewing.selectedSeats);
		JSON._save('viewings', this.modal.viewings).then(function () {})
	}

}