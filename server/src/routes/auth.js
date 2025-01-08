const express = require('express');
const router = express.Router();

const user = require('../models/user')

const admin = require("../config/firebase.config")

router.get('/login', async (req, res) => {
    // NOTE: Firstly we need try test, get token ID from front end and put it in POSTMAN to checking token ID is valid or NOT ... 
    if(!req.headers.authorization) {
        return res.status(500).send({ message : 'Invalid Token' })
        // miniNOTE: Sometimes the token ID is expired
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
        const decodeValue = await admin.auth().verifyIdToken(token);  
        // miniNOTE: convert token to decode ( mã hoá token ID )
       
        if(!decodeValue) {
            return res.status(500).json({message : "Un Authorized"})
        } else {
            // miniNOTE: Checking user exists or not !!!

            // res.send(decodeValue) ==> print json view information user with token ID
            const userExists = await user.findOne({ user_id: decodeValue.user_id });
            if (!userExists) {
                // return res.send("Need to create")
                newUserData(decodeValue, req, res); // ==> Create new user
            } else {
                updateNewUserData(decodeValue, req , res)
                
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(505).json({message : error})
    }
    // NOTE: WE have to save ID token authorization in mongoDB and we have to send it back to our front end
})
router.get('/getUsers', async (req, res) => {
    const options = {
        // miniNOTE: Sort the latest created user will be at the top of the list
        sort: {
            createdAt: 1,
        }
    }
    const cursor = await user.find(options)

    if(cursor) {
        res.status(200).send({success: true , data: cursor})
    } else {
        res.status(400).send({success: false , msg: "No data found"})
    }
})

router.put('/updateRole/:userId', async (req, res) => {
  const filter = { _id: req.params.userId };
    const role = req.body.data.role;
    
    const options = {
        upsert: true,
        new: true,
    };

    try {
        const result = await user.findOneAndUpdate(filter, {role: role}, options); 
        res.status(200).send({user: result });
    } catch (error) {
        res.status(400).send({success: false , msg: "Error"})
    }
})
router.delete('/delete/:userId', async (req, res) => {
    const filter = { _id: req.params.userId };

    const result = await user.deleteOne(filter);
    if (result.deletedCount === 1) {
       return res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
       return res.status(500).send({ success: false, msg: "Data Not Found" });
    }
})

// NOTE: Create new user if decode Value ( as name, email, user_id ) is don't exists in DB
const newUserData = async (decodeValue, req, res) => {
    const newUser = new user({
      name: decodeValue.name,
      email: decodeValue.email,
      imageURL: decodeValue.picture,
      user_id: decodeValue.user_id,
      email_verified: decodeValue.email_verified,
      role: "member",
      auth_time: decodeValue.auth_time,
    });
    try {
      const savedUser = await newUser.save();
      res.status(200).send({ user: savedUser });
    } catch (err) {
      res.status(400).send({ success: false, msg: err });
    }
};
const updateNewUserData = async (decodeValue , req , res) => {
    const filter = {user_id : decodeValue.user_id};

    const options = {
        upsert : true ,
        new : true
    };

    try {
        const result = await user.findOneAndUpdate(
            filter,
            { auth_time : decodeValue.auth_time},
            options
        );
        res.status(200).send({user : result})
    } catch (error) {
        res.status(400).send({success : false, msg : error})
    }
}


module.exports = router;