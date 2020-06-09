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
            res.json({ people });
        })
        .catch(next);
});

module.exports = router;
