const mongoose = require("mongoose");
const router = require("express").Router();
const Destination = mongoose.model("Destination");

router.post("/", async (req, res, next) => {
    const { data } = req.body;

    const createdTrips = data.map((trip) => {
        console.log('creating', trip);
        const newDestination = new Destination(trip)
        return newDestination.save();
    });
    await Promise.all(createdTrips)
        .then((destinations) => {
            res.json({ destinations: destinations });
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
            console.log("here fetch done");
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
