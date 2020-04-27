const mongoose = require("mongoose");
const router = require("express").Router();
const Trip = mongoose.model("Trip");

router.post("/", (req, res, next) => {
    const { body } = req;

    if (!body.title) {
        return res.status(422).json({
            errors: {
                title: "is required"
            }
        });
    }

    if (!body.startDate) {
        return res.status(422).json({
            errors: {
                startDate: "is required"
            }
        });
    }

    if (!body.endDate) {
        return res.status(422).json({
            errors: {
                endDate: "is required"
            }
        });
    }

    if (!body.people) {
        return res.status(422).json({
            errors: {
                people: "are required"
            }
        });
    }

    // if (!body.destination) {
    //     return res.status(422).json({
    //         errors: {
    //             destination: "is required"
    //         }
    //     });
    // }

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
