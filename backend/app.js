const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
const db = mysql.createConnection({
    user: "root",
    password: "root123",
    host: "localhost",
    database: "LoginSystem",
});

app.post("/register", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query("INSERT INTO userlogin (username,password) values (?,?)", [username, password], (err, response) => {
        if (err) {
            console.log(err);
        }
        else { console.log(response) }
    })
});


app.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    db.query("SELECT * FROM userlogin WHERE username = ? and password = ?  ", [username, password], (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        }
        else {
            res.send({ message: "wrong username and password" })
        }
    })

});

app.get("/menware", (req, res) => {
    db.query("SELECT * FROM menware", (err, result) => {
        if (err) {
            res.send({ err: err });
        }
        else if (result.length > 0) {
            res.send(result);
        }
    })
})


app.listen(port, () => console.log(`Example port listening on port ${port}!`));



