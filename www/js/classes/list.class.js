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
        <div class="d-flex mt-2">
            <div id="movieCards" class="d-flex flex-wrap justify-content-center">
                <!-- Movie cards -->
            </div>
        </div>`);
        let moviesArea = $("#movieCards");

        //gief us more to watch on screen
        //for (let x = 0; x < 3; x++) {
            for (let i = 0; i < this.movies.length; i++) {
                if (typeof this.movies[i] != 'undefined') {
                    moviesArea.append(`
                <div class="card rounded-0">
                    <a id="infoModalToggle${this.movies[i].title.replace(/\s+/g, '')}" class="btn-info"><img class="card-img-top rounded-0" src="/imgs/${this.movies[i].images[0]}" alt=""></a>
                </div>
                `);
                }
            }
        //}
    }
    
    eventHandlers(){

    }

    renderViewings() {
        //     $('main').append('<div id="viewingsList" class="row"></div>');
        let viewingsArea = $("#viewingsList");
        viewingsArea.empty();

        let date = new Date();
        let month = date.getMonth() + 1;
        if (month < 10) {
            month = "0" + month;
        }
        let day = date.getDate();
        if (day < 10) {
            day = "0" + day;
        }
        let dateString = `${date.getFullYear()}-${month}-${day}`

        for (let i = 0; i < this.viewings.length; i++) {
            if (this.viewings[i].date == dateString) {
                viewingsArea.append(`
                  <div href="#" class="list-group-item list-group-item-action">
                      <div class="row">
                          <div class="list-element col-6 col-md-2">
                              <h4>${this.viewings[i].time}</h4>
                          </div>
                          <div class="list-element col-6 col-md-4">
                              <h4 class="float-right float-md-left">${this.viewings[i].film}</h4>
                          </div>
                          <div class="list-element col-6 col-md-3">
                              <p>${this.viewings[i].auditorium}</p>
                          </div>
                          <div class="list-element col-12 col-sm-6 col-md-3">
                              <a class="btn btn-base btn-booking float-right mx-md-0 mx-lg-2 my-1" id="bookingModalToggle${this.viewings[i].film.replace(/\s+/g, '')}">Biljetter</a>
                              <a class="btn btn-base btn-info float-right mx-1 mx-md-0 mx-lg-2 my-1" id="infoModalToggle${this.viewings[i].film.replace(/\s+/g, '')}">Läs mer</a>
                          </div>
                      </div>
                  </div>
            `)
            }
        }
    }
}
