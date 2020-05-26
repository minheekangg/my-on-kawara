const mongoose = require("mongoose");
const router = require("express").Router();
const Trip = mongoose.model("Trip");
const Person = mongoose.model("Person");

router.post("/", async(req, res, next) => {
    const { data } = req.body;
    console.log('******* here', data )
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

    console.log('request is', data);

    const createdPeople = data.people.map(async (person) => {
        let foundPerson = await Person.find(person);
        console.log('found', foundPerson)
        if (!!foundPerson && foundPerson.length > 0) {
            return foundPerson
        } else {
            let newPerson = await new Person(person);
            return newPerson;
        }
    });

    
    await Promise.all(createdPeople)
        .then((people) => {
            console.log('create people', people)
            const tripParam = {
                people, 
                title: data.title, 
                startDate: data.startDate, 
                endDate: data.endDate,
            }
            const finalTrip = new Trip(tripParam);
            finalTrip.save()
                .then((trip) => {
                    console.log('success', finalTrip);
                    res.json({ trip: trip });
                })  
        })
        .catch((err) => {
            console.log('error!', err)
            return next
        });
});

router.get("/", (req, res, next) => {
    console.log('here')
    return Trip.find()
        .sort({ createdAt: "descending" })
        .then(trip =>{
            console.log('here fetch done')
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
    const { body } = req;

    if (typeof body.title !== "undefined") {
        req.trip.title = body.title;
    }

    if (typeof body.startDate !== "undefined") {
        req.trip.startDate = body.startDate;
    }

    if (typeof body.endDate !== "undefined") {
        req.trip.endDate = body.endDate;
    }

    if (typeof body.people !== "undefined") {
        req.trip.people = body.people;
    }

    return req.trip
        .save()
        .then(() => res.json({ trip }))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    return Trip.findByIdAndRemove(req.trip._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
