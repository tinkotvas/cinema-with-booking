class Signup extends Base {
    constructor() {
        super();
        this.usName = "";
        this.password = "";
    }

    keyup(event) {
        // add a new cat or owner if we press enter in the name fields
        // (which -> the code of the key pressed, enter is 13)
        if ($(event.target).hasClass('signUpEmail')&&event.keyup==13) {
            this.email = $(".signUpEmail").val();
            console.log("email", this.email);
        }
        if ($(event.target).hasClass('signUpPass')&&event.keyup==13) {
            this.password = $(".signUpPass").val();
            console.log("password", this.password);
        }
        if ($(event.target).hasClass('signUpRePass')&&event.keyup==13) {
            this.repass = $(".signUpRePass").val();
            console.log("repass", this.repass);
        }
    }

    chenge(event) {
        if ($(event.target).hasClass('signUpEmail')) {
            this.email = $(".signUpEmail").val();
            console.log("email", this.email);
        }
    }


    click(event) {
        if ($(event.target).hasClass('cancelbtn')) {
            $('#signupModal').modal('toggle');
        }
        if ($(event.target).hasClass('signupbtn')) {
            this.sign();

            //this.checkPass();
            // console.log(this);
            // let userName=this.password;
            // console.log(userName);
            //JSON._save('user-name', { app: this });
            //JSON._save('user', {app: this});
        }

    }


    sign() {
        //check passwords
       
        // check box 
        if (!$('.tAndP').prop('checked')) {
            alert('Please agree the Terms & Privacy!')
        }
        
    }

    get email() {
        return `123`;
    }

    get repass() {
        return `123`;
    }


    set email(val) {

        val = this.email.split('@');
        if (val.length == 2) {
            this.usName = val[0];
            console.log(this.usName);
        }
        else {
            alert('Email address required!');
        }
    }

    set repass(val) {
        alert(this.password, this.repass);
        if(this.password!==this.repass){
            
            alert('Please check your password!');
        }
        
    }







}