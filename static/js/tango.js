'use strict';
class User {
    constructor() {
        this.name = "Dhananjay Gandhi";
        this.username = 'dhananjay';
        this.email = "dhananjay@gmail.com";
        this.password = "gandhi";
        this.gender = 'male';
    }
    checkUser(username = '') {
        return (this.username.toLowerCase() === username.toLowerCase());
    }
    checkPassword(password = '') {
        return (this.password === password);
    }
    login(e){
        alert('yay')
        e.preventDefault();
        console.log('Submit triggered',e);
        return false
    }
}
const user = new User();
