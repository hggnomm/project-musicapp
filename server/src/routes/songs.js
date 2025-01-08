const express = require('express');
const router = express.Router();

const songs = require('../models/song')

router.post('/save', async (req, res) => {
    const newSong = songs({
        name: req.body.name,
        imageURL: req.body.imageURL,
        songURL: req.body.songURL,
        album: req.body.album,
        artist: req.body.artist,
        language: req.body.language,
        category: req.body.category,
    })

    try {
        const savedSong=  await newSong.save();
        return res.status(200).send({success : true, song : savedSong })
    } catch (error) {
        return res.status(400).send({success : false, msg : error})
    } 
})

router.get('/getOne/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await songs.findOne(filter);

    if(data) {
        return res.status(200).send({success : true, song : data })
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
    const data = await songs.find(options);

    if(data) {
        return res.status(200).send({success : true, songs : data })
    } else {
        return res.status(400).send({success : false, msg : "Data not found"})
    }
})
router.put('/update/:id', async (req, res) => {
    const filter = { _id : req.params.id }  ;
    
    const options = {
        ursert: true,
        new: true
    }

    try {
        const result = await songs.findOneAndUpdate(
            filter, 
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                songURL: req.body.songURL,
                album: req.body.album,
                artist: req.body.artist,
                language: req.body.language,
                category: req.body.category,
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

    const result = await songs.deleteOne(filter);

    if(result) {
       return res.status(200).send({success : true, msg: "Deleted success", data: result });
    } else {
       return res.status(400).send({success : true, msg: "Data not found" });
    }
})
module.exports = router