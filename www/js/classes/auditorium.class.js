class Auditorium extends Base {
    constructor() {
        super();
        this.auditoriums;
        this.currentAuditorium;
        this.totalSeats = 0;
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
        this.eventHandlers();
    }

    htmlRenderAuditorium(name) {
        this.currentAuditorium = this.auditoriums.filter(auditor => auditor.name == name)[0]
        let seats = [],
            seatHorizontalSpacing = 50,
            seatVerticalSpacing = 60;

        let rowsToDraw = this.currentAuditorium.seatsPerRow.length + 1;
        let maxSeatsPerRow = Math.max(...this.currentAuditorium.seatsPerRow) + 2;
        let seatNumber = 1,
            seatCount = 0;

        for (let y = 0, cy = 20; y <= rowsToDraw; y++) {
            let first = true,
                last = false;
            for (let x = 0, cx = 0; x < maxSeatsPerRow; x++) {
                let startFromX = Math.round((maxSeatsPerRow - this.currentAuditorium.seatsPerRow[y - 1]) / 2);
                let endBeforeX = maxSeatsPerRow - Math.floor((maxSeatsPerRow - this.currentAuditorium.seatsPerRow[y - 1]) / 2);
                let classes = "seat";

                //check if seat is booked
                if (seatNumber === 9 || seatNumber === 12 || seatNumber === 17) {
                    classes += " booked";
                }


                //check the position to start from is valid based on number of seats, for centering of seats
                if (x >= startFromX && x < endBeforeX) {

                    if (first || seatCount == this.currentAuditorium.seatsPerRow[y - 1] - 1) {
                        if (last) {
                            seatCount = 0;
                            last = false;
                        }

                        if (first) {
                            seatCount = 0;
                            last = true;
                        }
                        first = false;
                        classes += " endSeat"
                    }

                    seatCount++;
                    seats.push(`<rect id="seatNr${seatNumber}" class="${classes}" x="${cx}" y="${cy}" rx="2" width="48" height="40" />`)
                    seatNumber++;
                }
                cx += seatHorizontalSpacing;
            }
            cy += seatVerticalSpacing;
        }
        let screenWidth = maxSeatsPerRow * seatHorizontalSpacing
        let htmlAuditorium = `
        <div id="auditorium-holder" class="mr-auto ml-auto">
            <div id="auditorium">
                <svg class="bg-dark" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    <g>
                        <rect class="screen" x="50" y="5" height="20" width="${screenWidth-100}"/>
                    </g>
                    <g class="seatsGroup">
                        ${seats.join("")}
                    </g>
                </svg>
            </div>
        </div>
        `;
        $('#auditoriumContainer').empty();
        $('#auditoriumContainer').append(htmlAuditorium);

        let auditoriumWidth = maxSeatsPerRow * 50;
        let auditoriumHeight = ((this.currentAuditorium.seatsPerRow.length + 2) * 55);

        $('#auditorium, svg').width(auditoriumWidth).height(auditoriumHeight);
        this.scaleAuditorium(auditoriumWidth, auditoriumHeight);
    }

    scaleAuditorium(orgW = 700, orgH = 600) {
        let w = $('.modal-lg').width() * 0.75;
        let h = $('.modal-lg').height() * 0.75;
        w -= 20 * 2;
        h -= (20 * 2);
        const wScale = w / orgW;
        const hScale = h / orgH;
        let scaling = Math.min(wScale, hScale);

        $('#auditorium').css('transform', `scale(${scaling})`);
        $('#auditorium-holder').width(orgW * scaling);
        $('#auditorium-holder').height(orgH * scaling);
    }

    eventHandlers() {
        let seat;
        let that = this;

        $(document).off('click mouseenter mouseleave', '.seat')
        $(document).on({
                click: function () {
                    console.log($(this));
                    $('.selected').removeClass('selected')
                    $('.proposed').addClass('selected');
                },
                mouseenter: function () {
                    seat = $(this);

                    if (seat.hasClass('booked')) {
                        //nada
                    } else if (that.totalSeats > 1) {
                        let checkingForwards = true,
                            checkingBackwards = true,
                            totalSeatsBooked = 0,
                            totalAdjescantFreeSeats = that.countAdjacentAvailableSeats(seat, that.totalSeats);
                        let originalSeatNumber = parseInt(seat[0].id.split("Nr")[1])

                        let swapModifier = function (modifier) {
                            modifier > 0 ? checkingForwards = false : checkingBackwards = false;
                        }

                        let seatNumberString;

                        //modifier -1 for left +1 for right
                        let proposedSeatDirection = function (modifier) {
                            seatNumberString = `#seatNr${originalSeatNumber+modifier}`;

                            if (!$(seatNumberString)[0] || $(seatNumberString).hasClass('booked')) {
                                swapModifier(modifier);
                            } else {
                                if ($(seatNumberString).hasClass('proposed')) {

                                } else {
                                    $(seatNumberString).addClass('proposed');
                                    totalSeatsBooked++;
                                }
                            }

                            if ($(seatNumberString).hasClass('endSeat') && $(seatNumberString).next().hasClass('endSeat')) {
                                checkingForwards = false;
                            } else if ($(seatNumberString).hasClass('endSeat') && $(seatNumberString).prev().hasClass('endSeat')) {
                                checkingBackwards = false;
                            }
                        }

                        if (totalAdjescantFreeSeats >= that.totalSeats) {
                            for (let i = 0; i < totalAdjescantFreeSeats; i++) {
                                if (checkingForwards) {
                                    if (totalSeatsBooked >= that.totalSeats) {
                                        break;
                                    }
                                    proposedSeatDirection(+i)

                                }
                                if (checkingBackwards) {
                                    if (totalSeatsBooked >= that.totalSeats) {
                                        break;
                                    }
                                    proposedSeatDirection(-i);
                                }
                            }
                        }

                    }
                },
                mouseleave: function () {
                    $('.proposed').removeClass('proposed')
                }
            },
            '.seat');
    }

    countAdjacentAvailableSeats(fromSeat, totalSeats) {
        let freeSeats = 1;
        let fromSeatNr = parseInt(fromSeat[0].id.split("seatNr")[1]);
        let modifier;
        for (let x = 0; x < 2; x++) {
            for (let i = 1; i <= totalSeats; i++) {
                x % 2 == 1 ? modifier = -i : modifier = +i;
                let currentSeat = $(`#seatNr${fromSeatNr+modifier}`)

                if (!currentSeat[0] || currentSeat.hasClass('booked')) {
                    break;
                } else if (currentSeat.hasClass('endSeat')) {
                    freeSeats++;
                    break;
                } else {
                    freeSeats++
                }
            }
        }
        return freeSeats;
    }
}