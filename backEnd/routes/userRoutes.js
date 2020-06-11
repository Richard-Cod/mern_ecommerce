const express = require('express');
const route = express.Router();

const UserModel = require('../models/userModel').UserModel

const getToken = require('../util').getToken

route.get("/createadmin", async (req,res) => {

    try {
        const user = new UserModel({
            name : "SuperGuy",
            email: "superguy@gmailcom",
            password: '1234',
            isAdmin : true
        });
        
        const newUser = await user.save();
        return res.send(newUser)
        
    } catch (error) {
        return res.send({msg:error.message});
    }
})


route.post("/connexion", async (req,res) => {
    
    const signinUser = await UserModel.findOne({
        email : req.body.email,
        password : req.body.password
    })
    if(signinUser){

        res.send({
            _id : signinUser._id,
            name : signinUser.name,
            email : signinUser.email,
            password : signinUser.password,
            isAdmin : signinUser.isAdmin,
            token : getToken(signinUser)
        })
    }
    res.status(401).send({ message: 'Email ou mot de passe invalide' });
})


route.post("/inscription", async (req,res) => {
    const user = UserModel({
        name : req.body.name,
        email : req.body.email,
        password : req.body.password
    })
    const newUser = await user.save();

    if(newUser){
        res.send({
            _id : newUser._id,
            name : newUser.name,
            email : newUser.email,
            password : newUser.password,
            isAdmin : newUser.isAdmin,
            token : getToken(newUser)
        })
    }

    res.status(401).send({ message: "Probleme au cours de l'inscription" });
})


exports.userRoutes = route