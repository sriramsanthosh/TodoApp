const { render } = require("ejs");
const User = require("../models/user");

module.exports.signIn = function(req, res){
    res.render('user-sign-in', {
        title: "Sign in | TodoApp"
    });
}

module.exports.signUp = function(req, res){
    res.render('user-sign-up', {
        title: "Sign up | TodoApp"
    });
}

module.exports.userProfile = function(req, res){
    res.render('user-profile', {
        title: 'User Profile'
    });
}

module.exports.signUpSession = function(req, res){
    if(req.body.password != req.body.confirm_password){
        console.log(`Password not matched! Please enter password correctly`);
        return redirect('back');
    }
    User.findOne({email: req.body.email}).then((user)=>{
        if(!user){
            User.create(req.body).then((user)=>{
                console.log("User Created");
                return res.render("user-sign-in",{
                    title: "Sign Up | TodoApp"
                });
            }).catch((err)=>{
                console.log(`Error ${err} in finding the user in signing up`);
                return res.redirect('back');
            });
        }else if(user){
            console.log("User already exists!");
            return res.render("user-sign-in",{
                title: "Sign Up | TodoApp"
            });
        }
    }).catch((err)=>{
        console.log(`Error ${err} in signing in the user`);
        return redirect('back');
    });
}

module.exports.signInSession = function(req, res){
    User.findOne({email: req.body.email}).then((user)=>{
        if(user){
            if(user.password != req.body.password){
                console.log(`Password incorrect! Please enter correct password!`);
                return redirect('back');
            }
            console.log("User details found!! Login Successful!");
            return res.render('user-profile', {
                title: 'User Profile'
            });
        }
    }).catch((err)=>{
        console.log(`Error ${err} in logging in user!`);
        return redirect('back');
    });
}