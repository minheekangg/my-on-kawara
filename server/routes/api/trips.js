const mongoose = require("mongoose");
const router = require("express").Router();
const Trip = mongoose.model("Trip");

router.post("/", (req, res, next) => {
    const { body } = req;

    if (!body.dates) {
        return res.status(422).json({
            errors: {
                title: "Dates are required"
            }
        });
    }

    if (!body.people) {
        return res.status(422).json({
            errors: {
                people: "People is required"
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

    const finalTrip = new Trip(body);

    return finalTrip.save()
        .then(() => {
            console.log('success', finalTrip);
            res.json({ trip: finalTrip.toJSON() })
        })
        .catch(()=> {
            console.log('error') 
            next
        });
});

router.get("/", (req, res, next) => {
    return Trip.find()
        .sort({ createdAt: "descending" })
        .then(trip =>{
            console.log('here fetch done')
            res.json({ trip: trip.map(trip => trip.toJSON()) })
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
    return Trip.findByIdAndRemove(req.trip._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
