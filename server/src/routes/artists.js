const express = require('express');
const { off } = require('../models/artist');
const router = express.Router();

const artists = require('../models/artist')

router.post('/save', async (req, res) => {
    const newArtist = artists({
        name: req.body.name,
        imageURL: req.body.imageURL,
        twitter: req.body.twitter,
        instagram: req.body.instagram
    })

    try {
        const savedArtist =  await newArtist.save();
        return res.status(200).send({success : true, artist : savedArtist })
    } catch (error) {
        return res.status(400).send({success : false, msg : error})
    }
})

router.get('/getOne/:id', async (req, res) => {
    const filter = { _id: req.params.id };

    const data = await artists.findOne(filter);

    if(data) {
        return res.status(200).send({success : true, artist : data })
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
    const data = await artists.find(options);

    if(data) {
        return res.status(200).send({success : true, artists : data })
    } else {
        return res.status(400).send({success : false, msg : "Data not found"})
    }
});
router.put('/update/:id', async (req, res) => {
    const filter = { _id : req.params.id }  ;
    
    const options = {
        ursert: true,
        // NOTE: upsert is a combination of update and insert (update + insert = upsert). If the value of this option is set to true and the document or documents found that match the specified query, then the update operation will update the matched document or documents
        new: true
    }

    try {
        const result = await artists.findOneAndUpdate(
            filter, 
            {
                name: req.body.name,
                imageURL: req.body.imageURL,
                twitter: req.body.twitter,
                instagram: req.body.instagram
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

     const result = await artists.deleteOne(filter);

     if(result) {
        return res.status(200).send({msg: "Deleted success",success : true, data: result });
    } else {
        return res.status(400).send({success : true, msg: "Data not found" });
     }
})

module.exports = router