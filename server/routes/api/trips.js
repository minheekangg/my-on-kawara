const mongoose = require("mongoose");
const router = require("express").Router();
const Trips = mongoose.model("Trips");

router.post("/", (req, res, next) => {
    const { body } = req;

    if (!body.dates) {
        return res.status(422).json({
            errors: {
                title: "Dates are required"
            }
        });
    }

    if (!body.author) {
        return res.status(422).json({
            errors: {
                author: "Author is required"
            }
        });
    }

    if (!body.body) {
        return res.status(422).json({
            errors: {
                body: "Body is required"
            }
        });
    }

    const finalTrips = new Trips(body);

    return finalTrips.save()
        .then(() => {
            console.log('success', finalTrips);
            res.json({ trips: finalTrips.toJSON() })
        })
        .catch(()=> {
            console.log('error') 
            next
        });
});

router.get("/", (req, res, next) => {
    return Trips.find()
        .sort({ createdAt: "descending" })
        .then(trips =>{
            console.log('here fetch done')
            res.json({ trips: trips.map(trip => trip.toJSON()) })
        })
        .catch(next);
});

router.param("id", (req, res, next, id) => {
    return Trips.findById(id, (err, trip) => {
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
        trip: req.trip.toJSON()
    });
});

router.patch("/:id", (req, res, next) => {
    const { body } = req;

    if (typeof body.title !== "undefined") {
        req.trip.title = body.title;
    }

    if (typeof body.author !== "undefined") {
        req.trip.author = body.author;
    }

    if (typeof body.body !== "undefined") {
        req.trip.body = body.body;
    }

    return req.trip
        .save()
        .then(() => res.json({ trip: req.trip.toJSON() }))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    return Trips.findByIdAndRemove(req.trip._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
