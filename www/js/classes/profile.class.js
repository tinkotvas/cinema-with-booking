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
        //password must longer then 4 letters
        if (!validate(val)) {
            $(".signupbtn").prop("disabled", true);
        } else {
            this.pass = val;
            $(".passControl").addClass("d-none");
            $(".signupbtn").prop("disabled", false);
        }
    }

    keyup(event) {
        if ($(event.target).hasClass('signUpEmail')) {
            this.email = $(".signUpEmail").val();
        }
        if ($(event.target).hasClass('signUpPass')) {
            this.password = $(".signUpPass").val();
        }
        if ($(event.target).hasClass('signUpRePass')) {
            this.repass = $(".signUpRePass").val();
        }
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
        }
    }

    chenge(event) {
        if ($(event.target).hasClass('signUpEmail')) {
            this.email = $(".signUpEmail").val();
        }
        if ($(event.target).hasClass('signUpPass')) {
            this.password = $(".signUpPass").val();
        }
        if ($(event.target).hasClass('signUpRePass')) {
            this.repass = $(".signUpRePass").val();
        }
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
        }
    }


    click(event, element, instance) {
        if ($(event.target).hasClass('cancelbtn')) {
            $('#signupModal').modal('toggle');
        }
        if ($(event.target).hasClass('signupbtn')) {
            this.sign();
            event.preventDefault();
        }
        if ($(event.target).hasClass('lgin')) {
            event.preventDefault();
            this.checkLogin(this.usName, function () {
                alert('You are now Login!');
                //TODO: Login Succeed
            });
            console.log(this);
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
}