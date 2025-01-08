const express = require('express');
const router = express.Router();

const albums = require('../models/album')

router.post('/save', async (req, res) => {
    const newAlbum = albums({
        name: req.body.name,
        imageURL: req.body.imageURL,
    })

    try {
        const savedAlbum=  await newAlbum.save();
        return res.status(200).send({success : true, album : savedAlbum })
    } catch (error) {
        return res.status(400).send({success : false, msg : error})
    } 
})

router.get('/getOne/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await albums.findOne(filter);

    if(data) {
        return res.status(200).send({success : true, album : data })
    } else {
        return res.status(400).send({success : false, msg : "Data not found"})
    }
})
router.get('/getAll', async (req, res) => {
    const options = {
        // NOTE: sort() corresponds to the ORDER BY statement in SQL.
        sort: {
            createdAt : 1,
        },
    };
    const data = await albums.find(options);

    if(data) {
        return res.status(200).send({success : true, albums : data })
    } else {
        return res.status(400).send({success : false, msg : "Data not found"})
    }
});
router.put('/update/:id', async (req, res) => {
    const filter = { _id : req.params.id }  ;
    
    const options = {
        ursert: true,
        new: true
    }

    try {
        const result = await albums.findOneAndUpdate(
            filter, 
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
            },
            options
        );
        return res.status(200).send({success: true, data: result})
    } catch (error) {
        return res.status(400).send({success: false, msg: error})
    }   
})

router.delete('/delete/:id', async (req, res) => {
    const filter = { _id : req.params.id } ;

    const result = await albums.deleteOne(filter);

    if(result) {
        return res.status(200).send({msg: "Deleted success",success : true, data: result });
    } else {
       return res.status(400).send({success : true, msg: "Data not found" });
    }
})


module.exports = router