const mongoose = require("mongoose");
const router = require("express").Router();
const Destination = mongoose.model("Destination");

router.post("/", (req, res, next) => {
    const { body } = req;

    if (!body.date) {
        return res.status(422).json({
            errors: {
                date: "is required"
            }
        });
    }

    if (!body.destination) {
        return res.status(422).json({
            errors: {
                destination: "is required"
            }
        });
    }

    const newDestination = new Destination(body);

    return newDestination.save()
        .then(() => {
            console.log('success', newDestination);
            res.json({ destination: newDestination.toJSON() })
        })
        .catch(()=> {
            console.log('error') 
            next
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
