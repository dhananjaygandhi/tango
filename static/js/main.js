function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

$( document ).ready(function() {
  $("#login-form").on('change keyup', '.input-control', function(e){
    let inputs = $("#login-form").serializeArray();
    inputs = utils.flatten(inputs);
     if(inputs.username && inputs.password){
          $('.btn-login').prop("disabled", false);
          $('.btn-login').removeClass( "btn-gray" ).addClass( "btn-blue" );
        }else{
          $('.btn-login').prop("disabled", true);
          $('.btn-login').removeClass( "btn-blue" ).addClass( "btn-gray" );
        }
   });

   $("#register-form").on('change keyup', '.input-control', function(e){
     let inputs = $("#register-form").serializeArray();
     inputs = utils.flatten(inputs);
     let emailavailable;
     let usernameavailable;
     let validemail = validateEmail(inputs.email);
     RegisteredUsers.find((user) => {
       if(validemail && user.email === inputs.email) {
         emailavailable = false;
       } else {
         emailavailable = true;
       }
       if(inputs.username && user.username === inputs.username) {
         usernameavailable = false;
       } else {
         usernameavailable = true;
       }
     })
     if(validemail) {
       if(emailavailable) {
         $('.reg-email .error-msg').removeClass( "show" ).addClass( "hide" );
         $('.reg-email .success-msg').removeClass( "hide" ).addClass( "show" );
       } else {
         $('.reg-email .error-msg').removeClass( "hide" ).addClass( "show" );
         $('.reg-email .success-msg').removeClass( "show" ).addClass( "hide" );
         return;
       }
    } else {
      $('.reg-email .error-msg').removeClass( "show" ).addClass( "hide" );
      $('.reg-email .success-msg').removeClass( "show" ).addClass( "hide" );
    }
    if(inputs.username) {
     if(usernameavailable) {
       $('.reg-username .error-msg').removeClass( "show" ).addClass( "hide" );
       $('.reg-username .success-msg').removeClass( "hide" ).addClass( "show" );
     } else {
       $('.reg-username .error-msg').removeClass( "hide" ).addClass( "show" );
       $('.reg-username .success-msg').removeClass( "show" ).addClass( "hide" );
       return;
     }
   } else {
     $('.reg-username .error-msg').removeClass( "show" ).addClass( "hide" );
     $('.reg-username .success-msg').removeClass( "show" ).addClass( "hide" );
   }

   if(inputs.cpassword) {
     if(inputs.cpassword !== inputs.password) {
       $('.reg-cpassword .error-msg').removeClass( "hide" ).addClass( "show" );
       return;
     } else {
       $('.reg-cpassword .error-msg').removeClass( "show" ).addClass( "hide" );
     }
   }
      if(inputs.email && inputs.username && inputs.password && inputs.cpassword && (inputs.gender == 'male' || inputs.gender == 'female')){
           $('.btn-register').prop("disabled", false);
           $('.btn-register').removeClass( "btn-gray" ).addClass( "btn-blue" );
         }else{
           $('.btn-register').prop("disabled", true);
           $('.btn-register').removeClass( "btn-blue" ).addClass( "btn-gray" );
         }
    })
})

function User(){
    var args = arguments[0]||{};
    this.id = new Date().getTime();
    this.name = args['name']||args['username'];
    this.username = args['username'];
    this.email = args['email'];
    this.gender = args['gender'];
    this.password = args['password'];
    this.login = function(username,password){
        if(!username || !password) return;
        return (username === this.username && password === this.password);
    }
    return this;
}

function Utils(){
    this.flatten = function(list){
        var res={};
        list.map(function(v){
            res[v.name]=v.value;
        });
        return res;
    }
    this.checkUserExists = function(username,password){
        var user =  RegisteredUsers.map(function(user){
            //if no password is supplied we only check username
            if(!password && user.username === username) return user;
            if(user.login(username,password)) return user;
        });
        return user[0];
    }
    return this;
}
/** All that matters **/

var RegisteredUsers = new Array();
/** Adding a dummy user */
RegisteredUsers.push(new User({
    "name":"Dhananjay Gandhi",
    "email":"dhananjay@gmail.com",
    "password":"gandhi",
    "gender":"male",
    "username":"dhananjay"
}));
var utils = new Utils();

function ValidateLogin(form){
    //console.log('Validating form',form);
    var inputs = $(form).serializeArray();
    inputs = utils.flatten(inputs);
    var user = utils.checkUserExists(inputs.username);
    if(user){
        ShowSuccess(user);
    }
    return false;
}

function ValidateRegistration(form){
    //console.log('Validating form',form);
    var inputs = $(form).serializeArray();
    inputs = utils.flatten(inputs);
    var user = utils.checkUserExists(inputs.username,inputs.password);
    if(user){
        alert('User already registered');
    }else{
        user = new User(inputs);
        RegisteredUsers.push(user);
    }
    ShowSuccess(user);
    return false;
}

function ShowSuccess(user){
    $(".action").hide();
    $(".userinfo").fadeIn();
    Object.keys(user).map(function(k){
        $('.user_'+k).text(user[k]);
    });
    //console.log(user)
}

function ShowRegistration(){
    $(".action").hide();
    $(".signup").show();
}

function ShowLogin(){
    $(".action").hide();
    $(".login").show();
}
