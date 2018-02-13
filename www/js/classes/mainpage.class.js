class MainPage extends Base{
    constructor(films){
      super();
      this.films = films;
      this.index = 0;
      this.renderCarousel();
      this.renderCarouselItem();
      this.eventHandler();
    }
    eventHandler(){ 
      let that = this;
      $(document).on('click', '.gallery-next', function() {
        that.index < (that.films.length-1) ? that.index++ : that.index = 0;
        $('.gallery').empty();
        that.renderCarouselItem();
        that.animateItemIn();
      });
      $(document).on('click', '.gallery-previous', function() {
        console.log(that.index);
        
        that.index < 1 ? that.index = (that.films.length-1) : that.index-- ;
        that.renderCarouselItem();
      });
    }
    renderCarousel(){
      this.render('main', 1);
    }
    renderCarouselItem(){
      this.render('.gallery', 2);
    }
    animateItemIn(){
      $('.header-film').css({
        width: '0%'
      });
      $('.header-film').animate({
        width: '100%'
      });
      $('.gallery-image-container').animate({
        height: '100%'
      });
    }
}
