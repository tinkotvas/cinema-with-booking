class Auditorium extends Base {
    constructor() {
        super();
        this.auditoriums;
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
        let auditorium = this.auditoriums.filter(auditor => auditor.name == name)[0]
        let seats = [],
            seatHorizontalSpacing = 50,
            seatVerticalSpacing = 60;

        let rowsToDraw = auditorium.seatsPerRow.length + 1;
        let maxSeatsPerRow = Math.max(...auditorium.seatsPerRow) + 2;
        let seatNumber = 1;

        for (let y = 0, cy = 20; y <= rowsToDraw; y++) {
            for (let x = 0, cx = 0; x < maxSeatsPerRow; x++) {
                let startFromX = Math.round((maxSeatsPerRow - auditorium.seatsPerRow[y - 1]) / 2);
                let endBeforeX = maxSeatsPerRow - Math.floor((maxSeatsPerRow - auditorium.seatsPerRow[y - 1]) / 2);
                let classes = "seat";

                //check if seat is booked
                if (seatNumber === 9 || seatNumber === 12 || seatNumber === 17) {
                    classes += " booked";
                }
                //check the position to start from is valid based on number of seats, for centering of seats
                if (x >= startFromX && x < endBeforeX) {
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
        let auditoriumHeight = ((auditorium.seatsPerRow.length + 2) * 55);

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

                } else if (that.totalSeats > 1) {
                    let checkingForwards = true,
                        checkingBackwards = true;
                    let totalEmptySeatsFromHere = that.countAdjacentAvailableSeats(seat, that.totalSeats);
                    let totalSeatsBooked = 0;
                    //modifier -1 for left +1 for right
                    let proposedSeatDirection = function (modifier) {
                        if (!$(`#seatNr${parseInt(seat[0].id.split("Nr")[1])+modifier}`)[0] || $(`#seatNr${parseInt(seat[0].id.split("Nr")[1])+modifier}`).hasClass('booked')) {
                            modifier > 0 ? checkingForwards = false : checkingBackwards = false;
                        } else {
                            $(`#seatNr${parseInt(seat[0].id.split("Nr")[1])+modifier}`).addClass('proposed');
                            totalSeatsBooked++;
                        }
                    }
                    let checkIfWeHaveAllSeats = function(){
                        if (totalSeatsBooked > that.totalSeats) {
                            return true;
                        }
                    }
                    if (totalEmptySeatsFromHere >= that.totalSeats) {
                        for (let i = 0; i < totalEmptySeatsFromHere; i++) {
                            if (checkingForwards) {
                                proposedSeatDirection(+i)
                                if(checkIfWeHaveAllSeats())
                                break;
                            }
                            if (checkingBackwards) {
                                proposedSeatDirection(-i);
                                if(checkIfWeHaveAllSeats())
                                break;
                            }
                        }
                    }
                } else {
                    seat.addClass('proposed')
                }
            },
            mouseleave: function () {
                $('.proposed').removeClass('proposed')
            }
        }, '.seat');
    }

    countAdjacentAvailableSeats(fromSeat, totalSeats) {
        let emptySeats = 1;
        let fromSeatNr = parseInt(fromSeat[0].id.split("seatNr")[1]);
        let modifier;
        for (let x = 0; x < 2; x++) {
            for (let i = 1; i <= totalSeats; i++) {
                x % 2 == 1 ? modifier = -i : modifier = +i;
                let currentSeat = $(`#seatNr${fromSeatNr+modifier}`)

                if (!currentSeat[0] || currentSeat.hasClass('booked')) {
                    break;
                } else {
                    emptySeats++
                }
            }
        }
        return emptySeats;
    }
}