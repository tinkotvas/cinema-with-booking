class List extends Base {
    constructor(films, viewings) {
        super();
        this.films = films;
        this.viewings = viewings;
    }

    renderMovies() {
        $('.movie-container').append(`
        <div class="d-flex mt-2">
            <div id="movieCards" class="d-flex flex-wrap justify-content-center mt-1">
                <!-- Movie cards -->
            </div>
        </div>`);
        let moviesArea = $("#movieCards");

        //gief us more to watch on screen
        //for (let x = 0; x < 3; x++) {
            for (let i = 0; i < this.films.length; i++) {
                if (typeof this.films[i] != 'undefined') {
                    moviesArea.append(`
                <div class="card bg-dark">
                    <a id="infoModalToggle${this.films[i].title.replace(/\s+/g, '')}" class="btn-info"><img class="card-img-top rounded-0" src="/imgs/${this.films[i].images[0]}" alt=""></a>
                </div>
                `);
                }
            }
        //}
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
                      <div class="row d-flex align-items-center">
                          <div class="list-element col-6 col-md-2">
                              <h4 class="my-auto">${this.viewings[i].time}</h4>
                          </div>
                          <div class="list-element col-6 col-md-4">
                              <h4 class="float-right float-md-left my-auto">${this.viewings[i].film}</h4>
                          </div>
                          <div class="list-element col-6 col-md-3">
                              <p class="my-auto">${this.viewings[i].auditorium}</p>
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
