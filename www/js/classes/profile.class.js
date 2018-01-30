class Profile extends Base{
    constructor() {
        super();
    }



    get email() {
        return `${this.usName}@${this.web}`;
    }

    get password() {
        return `${this.pass}`;
    }


    set email(val) {
        //control email address
        val = val.split('@');
        if (val.length == 2) {
            // user name as JSON file name
            this.usName = val[0];
            this.web = val[1];
            $(".signUpEmail").parent().removeClass("has-warning");
            $(".signupbtn").prop("disabled", false);
        }
        else {
            $(".signUpEmail").parent().addClass("has-warning");
            $(".signupbtn").prop("disabled", true);
        }
    }

    set password(val) {
        //password must longer then 4 letters
        if (val.length < 4) {
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
    }


    click(event, element, instance) {
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


    get email() {
        return `${this.usName}`;
    }

    get password() {
        return `${this.pass}`;
    }
    set email(val) {
        //this.usName as JSON file name
        val = val.split('@');
        if (val.length == 2) {
            this.usName = val[0];
            this.web = val[1];
            $(".lginEmail").parent().removeClass("has-warning");
        }
        else {
            $(".lginEmail").parent().addClass("has-warning");
        }
    }
    set password(val) {
        this.pass = val;
    }
    keyup(event) {
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
        }
    }
    chenge(event) {
        if ($(event.target).hasClass('lginEmail')) {
            this.email = $(".lginEmail").val();
        }
        if ($(event.target).hasClass('lgPass')) {
            this.password = $(".lgPass").val();
        }
    }
    click(event, element, instance) {
        if ($(event.target).hasClass('lgin')) {
            event.preventDefault();
            this.checkLogin(this.usName, function () {
                alert('You are now Login!');
                //TODO: Login Succeed
            });
            console.log(this);
        }
    }
    checkLogin(jsonName, callbackFunc) {
        // Looking for JSON file name as this.usName
        try{
            JSON._load(jsonName).then((data) => {
                if (data.password == this.password) {
                    callbackFunc && callbackFunc();
                   
                } else {
                    alert("Please check your password!");
                }
            });
        }
        catch(e) {
            alert("User name not found!");
        }
    }
}