class MyPage extends Base {
  constructor(){
    super();
    JSON._load('dummyBooking').then((dummyBooking)=>{
      this.dummyBooking = dummyBooking;
      this.renderBooking();
      
    });
  }

  renderBooking(){
    let date = new Date();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }
    let todayDate = date.getFullYear()+month+day+date.getHours()+date.getMinutes();
    this.render('main', 1);
    this.index = 0;

    for (let booking of this.dummyBooking) {
      let bookingDate = booking.date.replace(/-/g, '')+booking.time.replace(/\./g, '')
      if (bookingDate > todayDate) {
        this.render('.activeBooking', 2);
      }
      else
      this.render('.pastBooking', 2);
      this.index++;
    }
  }
}
