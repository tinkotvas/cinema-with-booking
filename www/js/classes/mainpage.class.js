class MainPage extends Base{
    constructor(films){
      super();
      this.films = films;
      this.renderMain();
    }
    renderMain(){
      this.index = 0;
      // let date = new Date();
      // let month = date.getMonth() + 1;
      // if (month < 10) {
      //     month = "0" + month;
      // }
      // let day = date.getDate();
      // if (day < 10) {
      //     day = "0" + day;
      // }
      // let dateString = `${date.getFullYear()}-${month}-${day}`;
      console.log('day');
      this.render('main', 1);
      for (let film of this.films) {
        $('.carousel-item').first().addClass('active');
        if (true) {

        }
        this.render('.banner', 2);
        this.index++;
      }
    }
}
