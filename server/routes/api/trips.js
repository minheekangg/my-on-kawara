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

router.patch("/:id", (req, res, next) => {
    const { data } = req.body;
    console.log('before anything data is', data)
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
    
    console.log('PEOPLE: ', data.people, typeof data.people)

    // if (typeof data.people !== "undefined") {
    //     req.trip.people = data.people;
    // } else {
        const updatedPeople = data.people.map(async (person) => {
            let foundPerson = await Person.findOne( person);
            if (!!foundPerson) {
                return foundPerson
            } else {
                let newPerson = await Person.create(person);
                return newPerson;
            }
        })
        Promise.all(updatedPeople)
            .then(people => {
                console.log('done', people);
                req.trip.people = people;
                next();
            })
            .catch(err=>console.log('error: ', err))
    // }

}, async function(req, res, next){
    console.log('moving on', req.peole)

    //go through destinations + update
    console.log('TESTING: destination', data.destinations)

    // if (typeof data.destination !== "undefined") {
    //     req.trip.destination = data.destination;
    //     next();
    // } 

    const updatedDestinations = data.destinations.map(async city => {
        let foundDestination = await Destination.findOne(city._id);
        if (!!foundDestination) {
            return foundDestination
        } else {
            let newPerson = await Destination.create(city);
            return newPerson;
        }
    })
    Promise.all(updatedDestinations)
        .then(destinations => {
            req.trip.destination = destinations
            next()
        })
        .catch(err => console.log('error: ', err))

}, async function (req, res, next) {
    console.log('FINALLY creating params are', req.trip);
    req.trip.save()
        .then(trip => res.json({ trip }))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    return Trip.findByIdAndRemove(req.trip._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
