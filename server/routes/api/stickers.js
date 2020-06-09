const mongoose = require("mongoose");
const router = require("express").Router();
const Trip = mongoose.model("Trip");
const Sticker = mongoose.model("Sticker");

router.post("/", (req, res, next) => {
    const { data } = req.body;

    if (!data.tripId) {
        return res.status(422).json({
            errors: {
                tripId: "is required"
            }
        });
    }
    

    Sticker.insertMany(data.photos)
        .then(async photos=> {
            Trip.findByIdAndUpdate(data.tripId, { $push: {'stickers': photos }})
                .then(trip=> res.json(trip))
                .catch(err=>console.log('error updating trip: ', err))
        })
        .catch(err=>console.log('error creating stickers: ', err))

    
});

router.get("/", (req, res, next) => {
    return Stickers.find()
        .then((people) => {
            res.json({ people });
        })
        .catch(next);
});

router.param("id", (req, res, next, id) => {
    return Sticker.findById(id, (err, sticker) => {
        if (err) {
            return res.sendStatus(404);
        } else if (sticker) {
            req.sticker = sticker;
            return next();
        }
    }).catch(next);
});

router.get("/:id", (req, res, next) => {
    return res.json({
        sticker: req.sticker,
    });
});

router.delete("/:id", (req, res, next) => {
    if (!req.body.tripId) {
        return res.status(422).json({
            errors: {
                tripId: "is required"
            }
        });
    }

    return Sticker.findByIdAndRemove(req.sticker._id)
        .then((sticker) =>
            Trip.findByIdAndUpdate(req.body.tripId, { $pull: { 'stickers': { _id: sticker._id } } })
                .then(trip => {
                    res.json({ trip: trip })
                })
                .catch(next)
        )
        .catch(next)
});

module.exports = router;
