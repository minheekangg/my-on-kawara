const mongoose = require("mongoose");
const router = require("express").Router();
const Photo = mongoose.model("Photo");

router.post("/", (req, res, next) => {
    const { body } = req;
    console.log('body', body);

    if (!body.src) {
        return res.status(422).json({
            errors: {
                src: "Src is required"
            }
        });
    }

    if (!body.description) {
        return res.status(422).json({
            errors: {
                description: "Description is required"
            }
        });
    }

    if (!body.date) {
        return res.status(422).json({
            errors: {
                date: "Date is required"
            }
        });
    }

    const newPhoto = new Photo(body);

    return newPhoto.save()
        .then(() => {
            console.log('success', newPhoto);
            res.json({ photo: newPhoto})
        })
        .catch(()=> {
            console.log('error') 
            next
        });
});

router.get("/", (req, res, next) => {
    return Photo.find()
        // .sort({ createdAt: "descending" })
        .then((photos) => {
            console.log("here fetch done");
            res.json({photos});
        })
        .catch(next);
});

router.param("id", (req, res, next, id) => {
    return Photo.findById(id, (err, photo) => {
        if (err) {
            return res.sendStatus(404);
        } else if (photo) {
            req.photo = photo;
            return next();
        }
    }).catch(next);
});

router.get("/:id", (req, res, next) => {
    return res.json({
        photo: req.photo,
    });
});

router.patch("/:id", (req, res, next) => {
    const { body } = req;

    if (typeof body.date !== "undefined") {
        req.photo.date = body.date;
    }

    if (typeof body.src !== "undefined") {
        req.photo.src = body.src;
    }

    if (typeof body.description !== "undefined") {
        req.photo.description = body.description;
    }

    return req.photo
        .save()
        .then(() => res.json({ photo: req.photo }))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    return Photo.findByIdAndRemove(req.photo._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
