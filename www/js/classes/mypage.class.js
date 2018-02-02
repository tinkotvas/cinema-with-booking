class MyPage extends Base {
  constructor(){
    super();
    JSON._load('dummyBooking').then((dummyBooking)=>{
      this.dummyBooking = dummyBooking;
      this.renderBooking();
    });
  }

  renderBooking(){
    this.render('main', 1);
    this.index = 0;
    for (let booking of this.dummyBooking) {
      this.render('.activeBooking', 2);
      this.index++;
    }
  }
}
