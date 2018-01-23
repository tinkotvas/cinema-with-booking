class List extends Base {
    constructor() {
        super();
        this.movies;
        this.viewings;
    }

    loadJSON(callbackFunc, jsonName) {
        JSON._load(jsonName).then((data) => {
            if (jsonName == "movies")
                this.movies = data;
            if (jsonName == "viewings")
                this.viewings = data;
            callbackFunc && callbackFunc();
        }).
        catch((e) => {
            console.log(`No JSON ${jsonName} data`);
        });
    }

    renderMovies(length = 5) {
        $('main').append('<div id="movieCards" class="row"></div>');
        let moviesArea = $("#movieCards");

        for(let i = 0; i < length; i++){
            if (typeof this.movies[i] != 'undefined'){
                moviesArea.append(`
                <div class="card" style="width: 18rem;">
                    <img class="card-img-top" src="/imgs/${this.movies[i].images}" alt="Card image cap">
                    <div class="card-body">
                        <p class="card-text">${this.movies[i].title}</p>
                    </div>
                </div>
                `);
            }
        }
    }

    renderViewings(length = 5) {
        $('main').append('<div id="viewingsList" class="row"></div>');
        let viewingsArea = $("#viewingsList");
        viewingsArea.empty();
        viewingsArea.append('<div id="viewingsDate" class="col-3 p-0"><p class="m-0">Datum</p></div>')
        viewingsArea.append('<div id="viewingsBlank" class="col-1 p-0"><p class="m-0">&nbsp;</p></div>')
        viewingsArea.append('<div id="viewingsTitle" class="col-4 p-0"><p class="m-0">Titel</p></div>')
        viewingsArea.append('<div id="viewingsSalong" class="col-4 p-0"><p class="m-0">Score</p></div>')
        for (let i = 0; i < length; i++) {
            if (typeof this.viewings[i] != 'undefined') {
                $("#viewingsDate").append(`<p class="m-0">${this.viewings[i].date} &emsp; ${this.viewings[i].time}</p>`);
                $("#viewingsBlank").append('<p class="m-0">&nbsp;</p>');
                $("#viewingsTitle").append(`<p class="m-0">${this.viewings[i].film}</p>`);
                $("#viewingsSalong").append(`<p class="m-0">${this.viewings[i].auditorium}</p>`);
            }
        }
    }
}

let list = new List();

function loadAndRender() {

    list.loadJSON(() => list.renderMovies(), "movies");

}
