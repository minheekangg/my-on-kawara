const mongoose = require("mongoose");
const router = require("express").Router();
const Person = mongoose.model("Person");

router.post("/", (req, res, next) => {
    const { body } = req;

    if (!body.name) {
        return res.status(422).json({
            errors: {
                name: "is required"
            }
        });
    }

    const newPerson = new Person(body);

    return newPerson.save()
        .then((person) => {
            console.log('person created', person)
            res.json({ person });
        })
        .catch(()=> {
            console.log('error') 
            next
        });
});

router.get("/", (req, res, next) => {
    return Person.find()
        .then((people) => {
            console.log("people fetch done", people);
            res.json({ people });
        })
        .catch(next);
});

router.param("id", (req, res, next, id) => {
    return Person.findById(id, (err, person) => {
        if (err) {
            return res.sendStatus(404);
        } else if (person) {
            req.person = person;
            return next();
        }
    }).catch(next);
});

router.get("/:id", (req, res, next) => {
    return res.json({
        person: req.person,
    });
});

router.patch("/:id", (req, res, next) => {
    const { body } = req;

    if (typeof body.name !== "undefined") {
        req.person.name = body.name;
    }

    return req.person
        .save()
        .then(() => res.json({ person: req.person }))
        .catch(next);
});

router.delete("/:id", (req, res, next) => {
    return Person.findByIdAndRemove(req.person._id)
        .then(() => res.sendStatus(200))
        .catch(next);
});

module.exports = router;
