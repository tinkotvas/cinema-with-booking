class MainPage extends Base{
    constructor(films){
      super();
      this.films = films;
      this.renderMain();
    }
    renderMain(){
      this.index = 0;
      let that = this;
      this.render('main', 1);
      for (let film of this.films) {
        $('.carousel-item').first().addClass('active');
        that.render('.banner', 2);
        this.index++;
      }



    }
}
