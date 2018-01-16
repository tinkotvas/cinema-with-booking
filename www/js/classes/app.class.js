class App{
  constructor(){
    
  }

  navigation(){
    $(document).on('click','a.pop',function(e){
      //Create a push state preventDefault
      let href = $(this).attr('href');
      history.pushState(null, null, href);
      //Call the change page function
      nav.changePage();
      //Stop the browers from starting a page reload
      e.preventDefault();
    });
  }
}
