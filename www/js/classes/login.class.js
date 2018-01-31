class Login extends Base {
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
