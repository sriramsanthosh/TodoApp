const express = require("express");
const { render } = require("ejs");
const User = require("../models/user");
const TaskData = require("../models/task");

module.exports.signIn = function(req, res){
    if(req.cookies.user_id){
        let user_id = req.cookies.user_id;
        if(user_id){
            // console.log(user_id);
            User.findOne({_id: user_id}).then((user)=>{
                // console.log("User found successful by cookie!!", user);
                console.log(user);
                if(user == null){
                    return res.render('user-sign-in');
                }
                const totalTasksArray = [];

                var userTasksData = {
                    description: "none",
                    category: "none",
                    dueDate: "none"
                }

                if(user.tasks.length == 0){
                    totalTasksArray.push(userTasksData);
                    return res.render('user-profile', {
                        user: user,
                        totalTasksData: totalTasksArray
                    });
                }

                for(var z = 0; z<user.tasks.length; z++){
                    TaskData.find({_id: user.tasks[z]}).then((task_result)=>{
                        userTasksData = (task_result[0]);
                        totalTasksArray.push(userTasksData);
                        // console.log(userTasksData);
                        // console.log(z);
                        if(task_result[0]._id == user.tasks[user.tasks.length-1]){
                            console.log(totalTasksArray);
                            return res.render('user-profile', {
                                user: user,
                                totalTasksData: totalTasksArray
                            });
                        }
                    }).catch((err)=>{
                        console.log(`Error ${err} in creating task`);
                    });
                }

                // console.log(userTasksData);
                
                // var totalTasksData = pushTasks(totalTasksArray);
                // console.log(2);
                // console.log(totalTasksArray);
                // return res.render('user-profile', {
                //     user: user,
                //     totalTasksData: totalTasksArray
                // });
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
        return res.redirect('back');
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
    if(req.cookies.user_id){
        let user_id = req.cookies.user_id;
        if(user_id){
            // console.log(user_id);
            User.findOne({_id: user_id}).then((user)=>{
                // console.log("User found successful by cookie!!", user);
                if(user == null){
                    return res.render('user-sign-in');
                }
                const totalTasksArray = [];
                // console.log(user);
                console.log(user.tasks);
                var userTasksData = {
                    description: "none",
                    category: "none",
                    dueDate: "none"
                }

                if(user.tasks.length == 0){
                    totalTasksArray.push(userTasksData);
                    return res.render('user-profile', {
                        user: user,
                        totalTasksData: totalTasksArray
                    });
                }

                for(var z = 0; z<user.tasks.length; z++){
                    TaskData.find({_id: user.tasks[z]}).then((task_result)=>{
                        userTasksData = (task_result[0]);
                        totalTasksArray.push(userTasksData);
                        // console.log(userTasksData);
                        // console.log(z);
                        if(task_result[0]._id == user.tasks[user.tasks.length-1]){
                            // console.log(totalTasksArray);
                            return res.render('user-profile', {
                                user: user,
                                totalTasksData: totalTasksArray
                            });
                        }
                    }).catch((err)=>{
                        console.log(`Error ${err} in creating task`);
                    });
                }
            }).catch((err)=>{
                console.log(`Error ${err} unable to find user`);
            });
        }
    }
    User.findOne({email: req.body.email}).then((user)=>{
        if(user){
            if(user.password != req.body.password){
                console.log(`Password incorrect! Please enter correct password!`);
                return redirect('back');
            }
            console.log(user);
            console.log("User details found!! Login Successful!");
            res.cookie("user_id", user.id);
            const totalTasksArray = [];

                var userTasksData = {
                    description: "none",
                    category: "none",
                    dueDate: "none"
                }

                if(user.tasks.length == 0){
                    totalTasksArray.push(userTasksData);
                    return res.render('user-profile', {
                        user: user,
                        totalTasksData: totalTasksArray
                    });
                }

                for(var z = 0; z<user.tasks.length; z++){
                    TaskData.find({_id: user.tasks[z]}).then((task_result)=>{
                        userTasksData = (task_result[0]);
                        totalTasksArray.push(userTasksData);
                        // console.log(userTasksData);
                        // console.log(z);
                        if(task_result[0]._id == user.tasks[user.tasks.length-1]){
                            console.log(totalTasksArray);
                            return res.render('user-profile', {
                                user: user,
                                totalTasksData: totalTasksArray
                            });
                        }
                    }).catch((err)=>{
                        console.log(`Error ${err} in creating task`);
                    });
                }
        }
    }).catch((err)=>{
        console.log(`Error ${err} in logging in user!`);
        return render('user-sign-in');
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

    TaskData.create(data).then((task)=>{
        console.log(`Task Created!`);
        User.updateOne({_id: user_id}, {$push:{tasks: task._id}}).then((result)=>{
            console.log("pushed task id!");
            // console.log(result);
        }).catch((err)=>{
            console.log("ERROR ERROR ERROR");
        });
    }).catch((err)=>{
        console.log("ERROR in creating a task!");
    });
    return res.render('user-sign-in');
}

module.exports.deleteTask = function(req, res){
    console.log(req.body);
    // var taskKeys = Object.keys(req.body);
    // let user_id = req.cookies.user_id;
    // console.log("user_id", user_id);
    // for(let i = 0; i<taskKeys.length; i++){
    //     var key = taskKeys[i];
    //     console.log(key);
    //     User.find({_id: user_id}).then((user)=>{
    //         user.tasks.pull(key);
    //         console.log(`Delte Success in user`);
    //     }).catch((err)=>{
    //         console.log(`Delete Unsuceessfull!`);
    //     })
    //     TaskData.findByIdAndDelete({_id: key}).then((result)=>{
    //         console.log("Deleted task!");
    //     }).catch((err)=>{
    //         console.log(`Error ${err} in deleting the task!`);
    //     })
    // }
    return res.render('user-sign-in');
}