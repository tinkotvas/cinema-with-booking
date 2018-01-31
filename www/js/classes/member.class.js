// Not complete yet, just a start

class Member {

  constructor(userName, password, email){
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.bookingList = []; // For currentbooking
    this.movieList = []; // For history
  }

  currentBooking(movie){
    bookingList.push(movie);
    // this.render?
  }

  movieHistory(movie){
    movieList.push(movie);
    // this.render?
  }

}
