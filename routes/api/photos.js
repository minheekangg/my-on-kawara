const mongoose = require("mongoose");
const router = require("express").Router();
const Photo = mongoose.model("Photo");
const Person = mongoose.model("Person");
const Trip = mongoose.model("Trip");
const Destination = mongoose.model("Destination");

router.post("/", async (req, res, next) => {
    const { data } = req.body;
    
    if (!data.tripId) {
        return res.status(422).json({
            errors: {
                tripId: "is required"
            }
        });
    }

    if (!data.src) {
        return res.status(422).json({
            errors: {
                src: "is required"
            }
        });
    }

    if (!data.date) {
        return res.status(422).json({
            errors: {
                date: "is required"
            }
        });
    }

    if (!data.date) {
        return res.status(422).json({
            errors: {
                date: "is required"
            }
        });
    }

    if (!data.destination) {
        return res.status(422).json({
            errors: {
                city: "is required"
            }
        });
    }

    const params = {
        location: data.location || "",
        date: data.date,
    }

    if (!!data.destination) {
        let destinationObj = await Destination.findOne({_id: data.destination});
        params.city = destinationObj.city;
    }

    const foundPeople = data.people.map(async (person) => {
        let foundPerson = await Person.findOne({_id: person});
        return foundPerson;
    });
    
    await Promise.all(foundPeople)
        .then(async people=> {
            params.people = people;
            const createdPhotos = data.src.map(async p=> {
                const newParam = {...params, src: p.url, publicId: p.publicId}
                let createdPhoto = await Photo.create(newParam);
                return createdPhoto
            })

            await Promise.all(createdPhotos) 
                .then(async photos=> {
                    await Destination.findByIdAndUpdate(data.destination, { $push: {'photos': photos}});                
                    await Trip.findByIdAndUpdate(data.tripId, { $push: {'photos': photos}});         

                    res.json(photos);
                })
                .catch((err) => {
                    console.log('error updating trip', err)
                    return next
                });
        })
        .catch((err) => {
            console.log('error finding people!', err)
            return next
        });
});

router.get("/", (req, res, next) => {
    return Photo.find()
        .then((photos) => {
            res.json({photos});
        })
        .catch(next);
});

router.param("id", (req, res, next, id) => {
    return Photo.findById(id, (err, photo) => {
        if (err) {
            return res.sendStatus(404);
        } else if (photo) {
            req.photo = photo;
            return next();
        }
    }).catch(next);
});

router.get("/:id", (req, res, next) => {
    return res.json({
        photo: req.photo,
    });
});

router.patch("/:id", async (req, res, next) => {
    const { data } = req.body;

    if (typeof data.destination !== "undefined") {
        req.photo.city = data.destination;
    }

    if (typeof data.date !== "undefined") {
        req.photo.date = data.date;
    }

    if (typeof data.location !== "undefined") {
        req.photo.location = data.location;
    }

    req.photo.save()
        .then(async photo => {
            const {_id, ...params} = photo;
            let query = {
                _id: data.tripId,
                'photos._id':  _id
            }
            let update;
            if (params && params._doc) {
                update = {
                    $set: {
                        'photos.$.date': params._doc.date,
                        'photos.$.location': params._doc.location,
                        'photos.$.city': params._doc.city,
                    }
                }
            }
            let options = { upsert: false }

            Trip.findOneAndUpdate(query, update, options)
                .then(trip => {
                    res.json({ trip })
                }).catch(err=>console.log('her', err))
            })    
});

router.delete("/:id", (req, res, next) => {
    if (!req.body.tripId) {
        return res.status(422).json({
            errors: {
                tripId: "is required"
            }
        });
    }

    return Photo.findByIdAndRemove(req.photo._id)
        .then((photo) => 
            Trip.findByIdAndUpdate(req.body.tripId, {$pull:{ 'photos': {_id: photo._id} }})
                .then(trip=> {
                    res.json({trip: trip})
                })
                .catch(next)
        )
        .catch(next)
});

module.exports = router;
