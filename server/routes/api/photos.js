const mongoose = require("mongoose");
const router = require("express").Router();
const Photo = mongoose.model("Photo");
const Date = mongoose.model("Date");
const Person = mongoose.model("Person");
const Trip = mongoose.model("Trip");
const Destination = mongoose.model("Destination");

router.post("/", async (req, res, next) => {
    const { data } = req.body;

    console.log('data ', data)

    if (!data.tripId) {
        return res.status(422).json({
            errors: {
                tripId: "is required"
            }
        });
    }

    if (!data.url || !data.publicId) {
        return res.status(422).json({
            errors: {
                url: "is required"
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

    const params = {
        src: data.publicId,
        location: data.location || "",
    }

    if (!!data.date) {
        let dateObj = await Date.findOne({_id: data.date});
        params.date = dateObj.date;
    }

    if (!!data.destination) {
        let destinationObj = await Destination.findOne({_id: data.destination});
        params.city = destinationObj.city;
    }

    const foundPeople = data.people.map(async (person) => {
        let foundPerson = await Person.find({_id: person});
        return foundPerson;
    });
    
    await Promise.all(foundPeople)
        .then(async people=> {
            params.people = people;

            const createdPhotos = data.url.map(async p=> {
                const newParam = {...params, src: p}
                let createdPhoto = await Photo.create(newParam)
                console.log('created photo is', createdPhoto)
                return createdPhoto
            })

            await Promise.all(createdPhotos) 
                .then(async photos=> {
                    await Date.findByIdAndUpdate(data.date, {'photos': photos});                
                    await Trip.findByIdAndUpdate(data.tripId, {'photos': photos});         

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

router.patch("/:id", (req, res, next) => {
    const { body } = req;

    if (typeof body.date !== "undefined") {
        req.photo.date = body.date;
    }

    if (typeof body.src !== "undefined") {
        req.photo.src = body.src;
    }

    if (typeof body.description !== "undefined") {
        req.photo.description = body.description;
    }

    return req.photo
        .save()
        .then(() => res.json({ photo: req.photo }))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    return Photo.findByIdAndRemove(req.photo._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
