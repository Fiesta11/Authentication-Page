const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const db = 'mongodb+srv://roots:roots@cluster0.sa900ye.mongodb.net/'
mongoose.connect(db)
  .then(() => console.log('Connection is successful'))
  .catch(err => console.error('Couldn\'t connect to MongoDB:', err));


const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", userSchema);

// Routes

app.get("/", (req, res) => {
  res.send("MY API");
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        res.send({ message: "User not registered" });
        return;
      }

      if (password === user.password) {
        res.send({ message: "Login successful", user: user });
      } else {
        res.send({ message: "Password does not match" });
      }
    })
    .catch(err => {
      res.status(500).send({ error: err.message });
    });
});

// ...

app.post("/register", (req, res) => {
    const { name, email, password } = req.body;
    
    User.findOne({ email: email })
      .then(existingUser => {
        if (existingUser) {
          res.send({ message: "User already registered" });
        } else {
          const user = new User({
            name,
            email,
            password
          });
          
          user.save()
            .then(() => {
              res.send({ message: "Successfully registered , Login Now"  });
            })
            .catch(err => {
              res.status(500).send({ error: err.message });
            });
        }
      })
      .catch(err => {
        res.status(500).send({ error: err.message });
      });
  });
  
  // ...
  

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
