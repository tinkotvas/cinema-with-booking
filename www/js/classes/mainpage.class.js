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
        that.index < 1 ? that.index = (that.films.length-1) : that.index-- ;
        $('.gallery').empty();
        that.renderCarouselItem();
        that.animateItemIn();
      });
      $(document).on('mouseenter', '.gallery-info-text, .buy-container', function() { 
        $('.gallery-info-text').animate({height: '100%'},400);
        $('.gallery-info-text-sub').animate({opacity: '1'},200);
        $('.buy').toggleClass('d-none').animate({left: '0%'},600);
      });
      $(document).on('mouseleave', '.gallery-info-text', function() { 
        $('.gallery-info-text').animate({height: '25%'},400);
        $('.gallery-info-text-sub').animate({opacity: '0'},0);
        $('.buy').animate({left: '-200%'},300).toggleClass('d-none');
      });
    }
    renderCarousel(){
      this.render('main', 1);
    }
    renderCarouselItem(){
      this.render('.gallery', 2);
    }
    animateItemIn(){
      $('.header-film').css({height: '0'}).animate({height: '100%'},1000);
      $('.header-film');
      $('.slice1').css({height: '100%'}).animate({height: '0'},250);
      $('.slice2').css({height: '100%'}).animate({height: '0'},500);
      $('.slice3').css({height: '100%'}).animate({height: '0'},750);
      $('.slice4').css({height: '100%'}).animate({height: '0'},1000);
      $('.gallery-info-text').css({height: '0'}).animate({height: '25%'},1000);
    }
}
