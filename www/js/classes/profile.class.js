class Profile extends Base {
    constructor() {
        super();
    }

    get email() {
        return `${this.usName}`;
    }

    get password() {
        return `${this.pass}`;
    }

    set email(val) {
        //email address control
        val = val.split('@');
        if (val.length == 2) {
            // user name as JSON file name
            this.usName = val[0];
            this.web = val[1];
            $(".signUpEmail").parent().removeClass("has-warning");
            $(".signupbtn").prop("disabled", false);
            $(".lginEmail").parent().removeClass("has-warning");
        }
        else {
            $(".lginEmail").parent().addClass("has-warning");
            $(".signUpEmail").parent().addClass("has-warning");
            $(".signupbtn").prop("disabled", true);
        }
    }

    set password(val) {
        if (this.validate(val)) {
            this.pass = val;
            $(".passControl").addClass("d-none");
            $(".signupbtn").prop("disabled", false);
        } else { $(".signupbtn").prop("disabled", true); 
    }
        
    }

    keyuplogin(event) {
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
        }
    }

    keyupsignup(event){
        if ($(event.target).hasClass('signUpEmail')) {
            this.email = $(".signUpEmail").val();
        }
        if ($(event.target).hasClass('signUpPass')) {
            this.password = $(".signUpPass").val();
        }
        if ($(event.target).hasClass('signUpRePass')) {
            this.repass = $(".signUpRePass").val();
        }
    }

    changelogin(event) {
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
        }
    }
    changesignup(event){
        if ($(event.target).hasClass('signUpEmail')) {
            this.email = $(".signUpEmail").val();
        }
        if ($(event.target).hasClass('signUpPass')) {
            this.password = $(".signUpPass").val();
        }
        if ($(event.target).hasClass('signUpRePass')) {
            this.repass = $(".signUpRePass").val();
        }
    }


    clicklogin(event, element, instance) {
       
        if ($(event.target).hasClass('lgin')) {
            event.preventDefault();
            this.checkLogin(this.usName, function () {
                alert('You are now Login!');
                //TODO: Login Succeed
            });
        }
    }
    clicksignup(event, element, instance){
        if ($(event.target).hasClass('cancelbtn')) {
            $('#signupModal').modal('toggle');
        }
        if ($(event.target).hasClass('signupbtn')) {
            this.sign();
            event.preventDefault();
        }
    }

    sign() {
        this.checkPass();
        JSON._save(this.usName, { email: this.email, password: this.password });
        alert("Now you are sign up!");
        // login
    }

    checkPass() {
        //check passwords
        if (this.password !== this.repass) {
            alert('Please check your password');
        }
        // check box 
        if (!$('.tAndP').prop('checked')) {
            alert('Please agree the Terms & Privacy!');
        }
        // check if JSON file exist

    }

    checkLogin(jsonName, callbackFunc) {
        // Looking for JSON file name as this.usName
        try {
            JSON._load(jsonName).then((data) => {
                if (data.password == this.password) {
                    callbackFunc && callbackFunc();

                } else {
                    alert("Please check your password!");
                }
            });
        }
        catch (e) {
            alert("User name not found!");
        }
    }
    validate(password) {
        return /(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z])(?=\D*\d)\w{6,}$/.test(password);
    }

    toggleLoginModal() {
        let that=this;
        //$(document).on("click", '#loginModalToggle', function() {
          that.render('.modal-container-login', 'login');
          $('#loginModal').modal('toggle');
        //});
      }
    
    toggleSignupModal() {
        let that=this;
        //$(document).on("click", '#opSignup', function() {
          that.render('.modal-container-signup', 'signup');
          $('#loginModal').modal('toggle');
          $('#signupModal').modal('toggle');
        //});
      }
}