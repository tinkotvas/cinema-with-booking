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

    renderMovies() {
        $('main').append(`
        <div class="container">
            <div class="d-flex">
                <div id="movieCards" class="d-flex flex-wrap justify-content-center">
                    <!-- Movie cards -->
                </div>
            </div>
        </div>`);
        let moviesArea = $("#movieCards");

        for (let i = 0; i < this.movies.length; i++) {
            if (typeof this.movies[i] != 'undefined') {
                moviesArea.append(`
                <div class="card rounded-0">
                    <a href="#"><img class="card-img-top rounded-0" src="/imgs/${this.movies[i].images}" alt=""></a>

                </div>
                `);
            }
        }
    }

    renderViewings(length = 5) {
        //     $('main').append('<div id="viewingsList" class="row"></div>');
        let viewingsArea = $("#viewingsList");
        viewingsArea.empty();


        let date = new Date().toISOString().split("T")[0]

        for (let i = 0; i < this.viewings.length; i++) {
            if (this.viewings[i].date == date) {
                viewingsArea.append(`
                    <div href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex flex-row align-items-center">
                            <div class="list-element col-2">
                                <h4>${this.viewings[i].time}</h4>
                            </div>
                            <div class="list-element col-4">
                                <h4>${this.viewings[i].film}</h4>
                            </div>
                            <div class="list-element col-3">
                                <p>${this.viewings[i].auditorium}</p>
                            </div>
                            <div class="list-element col-3">
                                <a class="pop btn btn-base float-right mx-lg-2 my-1" id="bookingModalToggle">Biljetter</a>
                                <a class="btn btn-base float-right mx-lg-2 my-1">Läs mer</a>
                            </div>
                        </div>
                    </div>
            `)
            }
        }
    }
}

let list = new List();

function loadAndRender() {

    list.loadJSON(() => list.renderMovies(), "movies");

}