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
      $(document).on('mouseenter', '.gallery-info-container', function() { 
        $('.gallery-info-text').animate({top: '0%'},400);
        $('.gallery-info-text-sub').animate({opacity: '1'},200);
        $('.buy').delay(1000).toggleClass('d-none').animate({left: '0'},600);
      });
      $(document).on('mouseleave', '.gallery-info-container', function() { 
        $('.gallery-info-text').animate({top: '70%'},400);
        $('.gallery-info-text-sub').animate({opacity: '0'},0);
        $('.buy').animate({left: '-100%'},300).delay(300).toggleClass('d-none');
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
      $('.gallery-info-text').css({top: '100%'}).animate({top: '70%'},1000);
    }
}
