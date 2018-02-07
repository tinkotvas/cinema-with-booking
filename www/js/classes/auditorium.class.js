class Auditorium extends Base {

    constructor() {
        super();
        this.auditoriums;
        //this.loadJSON();
    }

    loadJSON(callbackFunc) {
        JSON._load('auditoriums').then((data) => {
            this.auditoriums = data;
            callbackFunc && callbackFunc();
        }).
        catch((e) => {
            
        });
    }

    renderAuditorium(name){
        console.log("Rendering: ",name)
        $()
        this.loadJSON(() => this.htmlRenderAuditorium(name));
        this.eventHandlers();
    }

    htmlRenderAuditorium(name) {

        let auditorium = this.auditoriums.filter(auditor => auditor.name == name)[0]
        console.log(auditorium);
        let seats = [],
            seatHorizontalSpacing = 50,
            seatVerticalSpacing = 60;

        //we add two to max seats on a row because we want 1 to the left and 1 to the right that's empty (no seats drawn)
        let rowsToDraw = auditorium.seatsPerRow.length + 1;
        let maxSeatsPerRow = Math.max(...auditorium.seatsPerRow) + 2;
        let seatNumber = 1;

        for (let y = 0, cy = 20; y <= rowsToDraw; y++) {
            for (let x = 0, cx = 0; x < maxSeatsPerRow; x++) {
                let startFromX = Math.round((maxSeatsPerRow - auditorium.seatsPerRow[y - 1]) / 2);
                let endBeforeX = maxSeatsPerRow - Math.floor((maxSeatsPerRow - auditorium.seatsPerRow[y - 1]) / 2);
                let classes = "seat";

                //check if seat is booked
                if (seatNumber === 10 || seatNumber === 12) {
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
        let board = `
        <div id="board-holder"">
            <div id="board"">
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
        $('#auditoriumContainer').append(board);

        let auditoriumWidth = maxSeatsPerRow * 50;
        let auditoriumHeight = ((auditorium.seatsPerRow.length + 2) * 55);

        $('#board, svg').width(auditoriumWidth);
        $('#board, svg').height(auditoriumHeight);

        this.scaleBoard();
        console.log("done");
    }


    scaleBoard(orgW = 700, orgH = 600) {
        let w = $('.modal-lg').width(); - $("#board").offset().left;
        let h = $('.modal-lg').height();
        w -= 20 * 2;
        h -= (20 * 2);
        const wScale = w / orgW;
        const hScale = h / orgH;
        let scaling = Math.min(wScale, hScale);

        $('#board').css('transform', `scale(${scaling})`);
        $('#board-holder').width(orgW * scaling);
        $('#board-holder').height(orgH * scaling);
    }

    eventHandlers() {
        let seat;

        $(document).on({
            click: function () {
                console.log($(this));
            },
            mouseenter: function () {
                seat = $(this);
                if (seat.hasClass('booked')) {} else {
                    seat.addClass('proposed')
                }

            },
            mouseleave: function () {

                seat.removeClass('proposed')

            }
        }, '.seat');
    }
}

function stora() {
    let bio = new Auditorium("Stora Salongen");
}

function lilla() {
    let bio = new Auditorium("Lilla Salongen");
}
