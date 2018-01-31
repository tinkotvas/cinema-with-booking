class Biograf extends Base {

    constructor() {
        super();
        this.auditoriums;
    }

    loadJSON(callbackFunc) {
        JSON._load('auditoriums').then((data) => {
            this.auditoriums = data;
            callbackFunc && callbackFunc();
        }).
        catch((e) => {
            console.log(`No JSON data`);
        });
    }

    renderAuditorium(data) {

        let auditorium = this.auditoriums[data];
        console.log(auditorium)
        let seats = [];


        let maxSeatsPerRow = Math.max(...auditorium.seatsPerRow) + 2;

        for (let y = 0, cy = 0; y <= auditorium.seatsPerRow.length + 1; y++) {
            for (let x = 0, cx = 0; x < maxSeatsPerRow; x++) {

               if (x >= Math.round((maxSeatsPerRow - auditorium.seatsPerRow[y-1]) / 2) && x < maxSeatsPerRow - Math.floor((maxSeatsPerRow - auditorium.seatsPerRow[y-1]) / 2)) {
                    seats.push(`
                    <g>
                        <rect class="btn red" x="${cx}" y="${cy}" width="50" height="50" />
                    </g>`)
                }
                cx += 50;
            }
            cy += 50;
            
        }
        let board = `
        <div id="board-holder"">
            <div id="board"">
                <svg class="bg-primary" xmlns="http://www.w3.org/2000/svg" version="1.1">
                    ${seats.join("")}
                </svg>
            </div>
        </div>
        `;



        $('main').append(board);
        $('#board').width(maxSeatsPerRow * 100);
        $('#board').height((auditorium.seatsPerRow.length + 2) * 50);

        $('svg').width(maxSeatsPerRow * 100)
        $('svg').height((auditorium.seatsPerRow.length + 2) * 50);


        this.scaleBoard();
    }


    scaleBoard() {
        let orgW = 700,
            orgH = 600;
        let w = $(window).width() - $("#board").offset().left;
        let h = $(window).height();
        w -= 20 * 2;
        h -= (20 * 2);
        const wScale = w / orgW;
        const hScale = h / orgH;
        let scaling = Math.min(wScale, hScale);

        $('#board').css('transform', `scale(${scaling})`);
        $('#board-holder').width(orgW * scaling);
        $('#board-holder').height(orgH * scaling);
    }
}

let bio = new Biograf();

function loadAndRender() {
    bio.loadJSON(() => bio.renderAuditorium(1));
}