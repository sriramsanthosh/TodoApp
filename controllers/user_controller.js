const express = require("express");
const { render } = require("ejs");
const User = require("../models/user");

module.exports.signIn = function(req, res){
    if(req.cookies.user_id){
        let user_id = req.cookies.user_id;
        if(user_id){
            console.log(user_id);
            User.findOne({_id: user_id}).then((user)=>{
                console.log("User found successful by cookie!!", user);
                
                return res.render('user-profile', {
                    user: user
                });
            }).catch((err)=>{
                console.log(`Error ${err} unable to find user`);
            });
        }
    }
    else{
        return res.render('user-sign-in');
    }
}

module.exports.signUp = function(req, res){
    res.render('user-sign-up', {
        title: "Sign up | TodoApp"
    });
}

module.exports.userProfile = function(req, res){
    res.render('user-sign-in');
}

module.exports.signUpSession = function(req, res){
    if(req.body.password != req.body.confirm_password){
        console.log(`Password not matched! Please enter password correctly`);
        return redirect('back');
    }
    console.log(req.body);
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
            return res.render("user-sign-in");
        }
    }).catch((err)=>{
        console.log(`Error ${err} in signing in the user`);
        return redirect('back');
    });
}

function loginUserbyCookie(user, email, password){
    User.findOne({email: email}).then((user)=>{
        if(user){
            console.log("User details found!! Login Successful!");
        }
    });
}

module.exports.signInSession = function(req, res){
    User.findOne({email: req.body.email}).then((user)=>{
        if(user){
            if(user.password != req.body.password){
                console.log(`Password incorrect! Please enter correct password!`);
                return redirect('back');
            }
            console.log(user);
            console.log("User details found!! Login Successful!");
            res.cookie("user_id", user.id);
            return res.render('user-profile', {
                user: user
            });
        }
    }).catch((err)=>{
        console.log(`Error ${err} in logging in user!`);
        return redirect('back');
    });
}

module.exports.signOut = function(req, res){
    res.clearCookie("user_id");
    console.log("Successfully signed out");
    return res.render("user-sign-out");
}

module.exports.addTask = function(req, res){
    console.log(req.body);
    var description = req.body.description;
    var category = req.body.category;
    var date = req.body.date;
    
    if(date == ''){date = "NO DEADLINE";}
    if(category == "select"){category = "NONE";}
    
    
    var data = {
        description: description, 
        category: category,
        dueDate: date
    };        
    let user_id = req.cookies.user_id;
    User.updateOne({_id: user_id}, {$push:{tasks: data}}).then((result)=>{
        console.log("Hello");
    }).catch((err)=>{
        console.log("ERROR ERROR ERROR");
    });
    return res.redirect('back');
}

module.exports.deleteTask = function(req, res){
    console.log(req.body);
    return res.redirect('back');
}