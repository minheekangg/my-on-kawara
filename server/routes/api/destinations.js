const mongoose = require("mongoose");
const router = require("express").Router();
const Destination = mongoose.model("Destination");
const Trip = mongoose.model("Trip");

router.post("/", async(req, res, next) => {
    const { data } = req.body;

    if (!data.tripId) {
        return res.status(422).json({
            errors: {
                tripId: "is required"
            }
        });
    }

    const createdDestinations = data.destinations.map(async (trip) => {
        console.log('trip is', trip)
        if (!trip.startDate) {
            return res.status(422).json({
                errors: {
                    startDate: "is required"
                }
            });
        }

        if (!trip.endDate) {
            return res.status(422).json({
                errors: {
                    endDate: "is required"
                }
            });
        }

        let createdDestination = await Destination.create({
            startDate: trip.startDate,
            endDate: trip.endDate,
            city: trip.city,
        })
        return createdDestination;
    });

    await Promise.all(createdDestinations)
        .then((destinations) => {
            Trip.findByIdAndUpdate(data.tripId, { 'destinations': destinations })
            .then((trip)=> {
                console.log('new trip is', trip);
                    res.json({ destinations: destinations, trip: trip });
                })
                .catch((err) => {
                    console.log('error updating trip', err)
                    return next
                });
        })
        .catch((err) => {
            console.log('error!', err)
            return next
        });
});

router.get("/", (req, res, next) => {
    return Destination.find()
        .sort({ createdAt: "descending" })
        .then((destination) => {
            res.json({
                destination: destination.map((destination) =>
                    destination.toJSON()
                ),
            });
        })
        .catch(next);
});

router.param("id", (req, res, next, id) => {
    return Destination.findById(id, (err, destination) => {
        if (err) {
            return res.sendStatus(404);
        } else if (destination) {
            req.destination = destination;
            return next();
        }
    }).catch(next);
});

router.get("/:id", (req, res, next) => {
    return res.json({
        destination: req.destination.toJSON(),
    });
});

router.patch("/:id", (req, res, next) => {
    const { body } = req;

    if (typeof body.date !== "undefined") {
        req.destination.date = body.date;
    }

    if (typeof body.destination !== "undefined") {
        req.destination.destination = body.destination;
    }

    return req.destination
        .save()
        .then(() => res.json({ destination: req.destination.toJSON() }))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    return Destination.findByIdAndRemove(req.destination._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
