// Config Express
const express = require('express');
const mongoose = require('mongoose');
//config env
require("dotenv").config({ path: "./config/.env" });

const app = express();
const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;


// Start the server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}...`);
});



// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB...'))
    .catch((err) => console.error('Could not connect to MongoDB...', err));

/* require user model*/
const User = require("./models/user");
app.use(express.json())

//Create users

// User.create([{ name: "wael", email: "wael@gmail.com", password: "5555555", age:26 },
// { name: "leila", email: "leila@gmail.com", password: "5555555", age:26 },
// { name: "ahlem", email: "ahlem@gmail.com", password: "5555555", age:26 }])

/*get users*/
app.get("/users", (req, res) =>
    User.find()
        .then((el) => res.json(el))
        .catch((err) => console.log(err))
);

/*add user*/
app.post("/add", (req, res) => {

    let newUser = new User(req.body);
    newUser
        .save()
        .then(() => res.json({ msg: "User added " }))
        .catch((err) => console.log(err));
});

/* edit user by id*/
app.put('/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        .then((el) => res.json(el)).catch((err) => console.log(err))
}
)

/* delete user by id*/
app.delete('/delete/:id', (req, res) => {

    User.deleteOne({ _id: req.params.id })
        .then((el) => res.json(el)).catch((err) => console.log(err))

})