class Auditorium extends Base {
    constructor(modal) {
        super();
        this.modal = modal;
        this.auditoriums;
        this.currentAuditorium;
        this.totalSeats = 0;
        this.eventHandlers();
    }

    loadJSON(callbackFunc) {
        JSON._load('auditoriums').then((data) => {
            this.auditoriums = data;
            callbackFunc && callbackFunc();
        }).
        catch((e) => {

        });
    }
    renderAuditorium(name) {
        this.loadJSON(() => this.htmlRenderAuditorium(name));
    }

    htmlRenderAuditorium(name) {
        this.currentAuditorium = this.auditoriums.filter(auditor => auditor.name == name)[0]
        let seats = [],
            seatHorizontalSpacing = 50,
            seatVerticalSpacing = 60,
            rowsToDraw = this.currentAuditorium.seatsPerRow.length + 1,
            maxSeatsPerRow = Math.max(...this.currentAuditorium.seatsPerRow) + 2,
            seatNumber = 1,
            viewing = this.modal.viewings[this.modal.getViewingIndex()],
            bookedSeats = 0,
            bookedSeatsLength = 0,
            markedBookedSeats = 0;

        if (viewing.selectedSeats) {
            bookedSeats = viewing.selectedSeats;
            bookedSeatsLength = viewing.selectedSeats.length;
        }

        for (let y = 0, cy = 0; y <= rowsToDraw; y++) {
            let startFromX = Math.round((maxSeatsPerRow - this.currentAuditorium.seatsPerRow[y - 1]) / 2);
            let endBeforeX = maxSeatsPerRow - Math.floor((maxSeatsPerRow - this.currentAuditorium.seatsPerRow[y - 1]) / 2);
            for (let x = 0, cx = 0; x < maxSeatsPerRow; x++) {
                let classes = "seat";
                viewing.selectedSeats && bookedSeats.includes(seatNumber.toString()) ? classes += " booked" : null;
                if (x >= startFromX && x < endBeforeX) {
                    x == startFromX || x == endBeforeX-1 ? classes += " endSeat" : null;
                    seats.push(`<rect id="seatNr${seatNumber}" class="${classes}" x="${cx}" y="${cy}" rx="2" width="48" height="40" />
                                <text x="${cx+ (seatNumber < 10 ? 20:15)}" y="${cy+25}">${seatNumber}</text>`)
                    seatNumber++;
                }
                cx += seatHorizontalSpacing;
            }
            cy += seatVerticalSpacing;
        }
        this.auditoriumWidth = maxSeatsPerRow * seatHorizontalSpacing;
        this.auditoriumHeight = ((this.currentAuditorium.seatsPerRow.length + 2) * 55);
        let screenDepth = this.auditoriumHeight/2;
        let htmlAuditorium = `
        <div id="auditorium-holder" class="mr-auto ml-auto">
            <div id="auditorium">
                <svg class="bg-dark" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <defs>
                    <linearGradient id="screenGradient" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="white"/>
                        <stop offset="1%" stop-color="white" stop-opacity="0.1"/>
                        <stop offset="100%" stop-color="white" stop-opacity="0"/>
                    </linearGradient>
                </defs>
                    <g class="screenGroup">
                        <polygon points="100,0 ${this.auditoriumWidth-100},0 ${this.auditoriumWidth},${screenDepth} 0,${screenDepth}" fill="url(#screenGradient)"/>
                    </g>
                    <g class="seatsGroup">
                        ${seats.join("")}
                    </g>
                </svg>
            </div>
        </div>`;
        $('#auditoriumContainer').empty();
        $('#auditoriumContainer').append(htmlAuditorium);
        $('#auditorium, svg').width(this.auditoriumWidth).height(this.auditoriumHeight);
        this.scaleAuditorium();
    }


    scaleAuditorium() {
        let maxSeatsPerRow = Math.max(...this.currentAuditorium.seatsPerRow) + 2;
        this.auditoriumWidth = maxSeatsPerRow * 50;
        this.auditoriumHeight = ((this.currentAuditorium.seatsPerRow.length + 2) * 55);
        let w = $('.modal-lg').width();
        let h = $('.modal-lg').height();
        w -= 20 * 2;
        h -= (20 * 2);
        const wScale = w / this.auditoriumWidth;
        const hScale = h / this.auditoriumHeight;
        let scaling = Math.min(wScale, hScale);
        $('#auditorium').css('transform', `scale(${scaling})`);
        $('#auditorium-holder').width(this.auditoriumWidth * scaling);
        $('#auditorium-holder').height(this.auditoriumHeight * scaling);
    }



    eventHandlers() {
        let seat;
        let that = this;
        let bookedSeats = 0;

        $(window).resize(function () {
            if ($('#bookingModal')[0]) {
                that.scaleAuditorium(this.auditoriumWidth, this.auditoriumHeight);
            }
        });

        $(document).off('click mouseenter mouseleave', '.seat')
        $(document).on({
                click: function () {
                    let selectedSeats = $('.selected');

                    if ($('.separateSeat-check-input').is(':checked')) {
                        if ($(this).hasClass('selected')) {
                            $(this).removeClass('selected');
                        } else {
                            if (selectedSeats.length < that.totalSeats)
                                $('.proposed').addClass('selected');
                        }
                    } else {
                        $('.selected').removeClass('selected');
                        $('.proposed').addClass('selected');
                    }
                    that.modal.checkIfConfirmBookingIsActive();
                },
                mouseenter: function () {
                    seat = $(this);
                    let totalSeatsBooked = 0;

                    if (seat.hasClass('booked')) {
                        //nada
                    } else if (that.totalSeats > 1 && !$('.separateSeat-check-input').is(':checked')) {
                        let checkingForwards = true,
                            checkingBackwards = true,
                            totalAdjescantFreeSeats = that.countAdjacentAvailableSeats(seat, that.totalSeats),
                            fromSeatNr = parseInt(seat[0].id.split("Nr")[1]);

                        let stopCheckingThisDirection = function (direction) {
                            direction > 0 ? checkingForwards = false : checkingBackwards = false;
                        }

                        let checkValidSeatAndPropose = function (modifier, direction) {
                            let adjacentSeat = $(`#seatNr${fromSeatNr+modifier+direction}`);
                            let currentSeat = $(`#seatNr${fromSeatNr+modifier}`)

                            if (!currentSeat[0] || currentSeat.hasClass('booked')) {
                                stopCheckingThisDirection(direction);
                            } else {
                                if (currentSeat.hasClass('proposed')) {

                                } else {
                                    currentSeat.addClass('proposed');
                                    totalSeatsBooked++;
                                }
                            }
                            if (currentSeat.hasClass('endSeat') && adjacentSeat.hasClass('endSeat')) {
                                stopCheckingThisDirection(direction);
                            }
                        }

                        if (totalAdjescantFreeSeats >= that.totalSeats) {
                            for (let i = 0; i < totalAdjescantFreeSeats; i++) {
                                if (checkingForwards) {
                                    checkValidSeatAndPropose(+i, +1)
                                    if (totalSeatsBooked >= that.totalSeats) {
                                        break;
                                    }
                                }
                                if (checkingBackwards) {
                                    checkValidSeatAndPropose(-i, -1);
                                    if (totalSeatsBooked >= that.totalSeats) {
                                        break;
                                    }
                                }
                            }
                        }

                    } else {
                        $(this).addClass('proposed');
                        totalSeatsBooked++;
                    }
                },
                mouseleave: function () {
                    $('.proposed').removeClass('proposed')
                }
            },
            '.seat');
    }

    countAdjacentAvailableSeats(fromSeat, totalSeats) {
        //-1 since we check originseat twice
        let freeSeats = -1;
        let fromSeatNr = parseInt(fromSeat[0].id.split("seatNr")[1]);
        let modifier;
        let direction;

        for (let x = 0; x < 2; x++) {
            for (let i = 0; i < totalSeats; i++) {
                if (x % 2 == 1) {
                    modifier = -i;
                    direction = -1;
                } else {
                    modifier = +i;
                    direction = +1;
                }
                let adjacentSeat = $(`#seatNr${fromSeatNr+modifier+direction}`);
                let currentSeat = $(`#seatNr${fromSeatNr+modifier}`)
                if (!currentSeat[0] || currentSeat.hasClass('booked')) {
                    break;
                } else if (currentSeat.hasClass('endSeat') && adjacentSeat.hasClass('endSeat')) {
                    freeSeats++;
                    break;
                } else {
                    freeSeats++;
                }
            }
        }
        return freeSeats;
    }
}