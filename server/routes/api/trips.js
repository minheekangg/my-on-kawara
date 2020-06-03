const mongoose = require("mongoose");
const router = require("express").Router();
const Trip = mongoose.model("Trip");
const Person = mongoose.model("Person");
const Destination = mongoose.model("Destination")

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
                let updatedCity =  await Destination.findOneAndUpdate(city._id, city);
                console.log('updated', city)
                return updatedCity
            // } else {
            //     return await Destination.create(city);
            }
        })
        req.trip.destinations = await Promise.all(updatedDestinations);
        console.log('new ', req.trip.destinations)
    }

    console.log('before', req.trip);
    next();

}, async function (req, res, next) {
    console.log('FINALLY creating params are', req.trip);
    req.trip.save()
        .then(trip => res.json({ trip }))
        .catch(err=>console.log('error', err));
});

router.delete("/:id", (req, res, next) => {
    return Trip.findByIdAndRemove(req.trip._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
