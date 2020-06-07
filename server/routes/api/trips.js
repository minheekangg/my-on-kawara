const mongoose = require("mongoose");
const router = require("express").Router();
const Trip = mongoose.model("Trip");
const Person = mongoose.model("Person");
const Destination = mongoose.model("Destination");
const Sticker = mongoose.model("Sticker");
const Photo = mongoose.model("Photo");

router.post("/", async(req, res, next) => {
    const { data } = req.body;

    if (!data.title) {
        return res.status(422).json({
            errors: {
                title: "is required"
            }
        });
    }

    if (!data.startDate) {
        return res.status(422).json({
            errors: {
                startDate: "is required"
            }
        });
    }

    if (!data.endDate) {
        return res.status(422).json({
            errors: {
                endDate: "is required"
            }
        });
    }

    if (!data.people) {
        return res.status(422).json({
            errors: {
                people: "are required"
            }
        });
    }
    
    const createdPeople = data.people.map(async (person) => {
        let foundPerson = await Person.findOne(person);
        if (!!foundPerson) {
            return foundPerson
        } else {
            let newPerson = await Person.create(person);
            return newPerson;
        }
    });

    
    await Promise.all(createdPeople)
        .then((people) => {
            const tripParam = {
                people, 
                title: data.title, 
                startDate: data.startDate, 
                endDate: data.endDate,
                content: data.content,
            }
            const finalTrip = new Trip(tripParam);
            finalTrip.save()
                .then((trip) => {
                    res.json({ trip: trip });
                })  
        })
        .catch((err) => {
            console.log('error!', err)
            return next
        });
});

router.get("/", (req, res, next) => {
    return Trip.find()
        .sort({ createdAt: "descending" })
        .then(trip =>{
            res.json({ trip })
        })
        .catch(next);
});

router.param("id", (req, res, next, id) => {
    return Trip.findById(id, (err, trip) => {
        if (err) {
            return res.sendStatus(404);
        } else if (trip) {
            req.trip = trip;
            return next();
        }
    }).catch(next);
});

router.get("/:id", (req, res, next) => {
    const { photos } = req.trip;
    const sortedPhotos = photos.sort((a,b) => {
        return new Date(a.date) - new Date(b.date)
    });

    req.photos = sortedPhotos;

    return res.json({
        trip: req.trip
    });
});

router.patch("/:id", async (req, res, next) => {
    const { data } = req.body;

    if (typeof data.title !== "undefined") {
        req.trip.title = data.title;
    }

    if (typeof data.startDate !== "undefined") {
        req.trip.startDate = data.startDate;
    }

    if (typeof data.endDate !== "undefined") {
        req.trip.endDate = data.endDate;
    }

    if (typeof data.content !== "undefined") {
        req.trip.content = data.content;
    }
    
    if (typeof data.people !== "undefined" && typeof data.destinations !== "undefined") {
        req.trip.people = data.people;
        req.trip.destinations = data.destinations
        next();
    } 

    if (typeof data.people !== "undefined") {
        const updatedPeople = data.people.map(async person => {
            let foundPerson = await Person.findOne(person);
            if (!!foundPerson) {
                return foundPerson
            } else {
                let newPerson = await Person.create(person);
                return newPerson;
            }
        })
        req.trip.people = await Promise.all(updatedPeople);
    }

    if (typeof data.destinations !== "undefined") {
        const updatedDestinations = data.destinations.map(async city => {
            if (!!city._id) {
                const {_id, ...params} = city;
                let updatedCity = await Destination.findOneAndUpdate({ _id: _id }, params, { returnOriginal: false }, function (err, destination) {
                    return destination
                });
                return updatedCity
            } else {
                return await Destination.create(city);
            }
        })
        const newDestinations = await Promise.all(updatedDestinations);
        req.trip.destinations = newDestinations;
    }

    next();

}, async function (req, res, next) {

    req.trip.save()
        .then(trip => res.json({ trip }))
        .catch(()=>next);
});

router.delete("/:id", async (req, res, next) => {

    try {
        const deletedDestinations = req.trip.destinations.map(async d => {
            return await Destination.findOneAndDelete({ id: d._id })
        })
        let destinationPromise = Promise.all(deletedDestinations)
        console.log('destinations', destinationPromise);

        let deletedPhotos = req.trip.photos.map(async d => {
            return await Photo.findOneAndDelete({ id: d._id })
        })
        let photoPromise = Promise.all(deletedPhotos)
        console.log('photos', photoPromise);

        let deletedStickers = req.trip.stickers.map(async d => {
            return await Sticker.findOneAndDelete({ id: d._id })
        })
        let stickerPromise = Promise.all(deletedStickers)
        console.log('stickers', stickerPromise);

        await Promise.all([destinationPromise, photoPromise, stickerPromise])
            .then(() => {
                req.trip.delete()
                    .then(() => res.sendStatus(200))
                    .catch(next);
                })
            .catch(next)

    } catch (err) {
        console.log('err is', err)
        next()
    }
    // var promises = [
    //     new Promise(async function (resolve, reject) {
    //         // delete destinations
    //         const deletedDestnations = 

    //         await Promise.all(deletedDestnations)
    //             .then((destinations) => resolve(destinations))
    //             .catch((err)=>reject(err))
    //     }),
        // new Promise(async function (resolve, reject) {
        //     // delete photos
            
        //     await Promise.all(deletedPhotos)
        //         .then((photos) => resolve(photos))
        //         .catch((err) => reject(err))
        // }),
    //     new Promise(async function (resolve, reject) {
    //         // delete stickers
    //         const 
    //         await Promise.all(deletedStickers)
    //             .then((stickers) => resolve(stickers))
    //             .catch((err) => reject(err))
    //     })
    // ];
    
});

module.exports = router;
