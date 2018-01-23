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

        for(let i = 0; i < length;i++){
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

let list = new List();

function loadAndRender() {

    list.loadJSON(() => list.renderViewings(), "viewings");

}
