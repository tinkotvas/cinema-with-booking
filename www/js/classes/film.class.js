class Film extends Base {
    constructor(config) {
        this.title = config.title;
        this.productionCountries = config.productionCountries;
        this.productionYear = config.productionYear;
        this.length = config.length;
        this.genre = config.genre;
        this.distributor = config.distributor;
        this.language = config.language;
        this.subtitles = config.subtitles;
        this.director = config.director;
        this.actors = config.actors;
        this.description = config.description;
        this.images = config.images;
        this.youtubeTrailers = config.youtubeTrailers;
        this.rvSydSource=config.reviews[0].source;
        this.rvSydQuote=config.reviews[0].quote;
        this.rvSydStars=config.reviews[0].stars;
        this.rvSydMax=config.reviews[0].max;
        this.rvSDSource=config.reviews[1].source;
        this.rvSDQuote=config.reviews[1].quote;
        this.rvSDStars=config.reviews[1].stars;
        this.rvSDMax=config.reviews[1].max;
        this.rvDNSource=config.reviews[2].source;
        this.rvDNQuote=config.reviews[2].quote;
        this.rvDNStars=config.reviews[2].stars;
        this.rvDNMax=config.reviews[2].max;
    }


}