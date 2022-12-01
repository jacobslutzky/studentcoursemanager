const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json()); // parses incoming requests with JSON payloads

//create connection to database
const db = mysql.createConnection({
    host: '127.0.0.1', //localhost
    user: "root", //root
    password: "", //password
    database: "StudentCourseManager"
  });

app.get('/createdb', (req, res) => {
    db.query("CREATE DATABASE StudentCourseManager", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created...")
    });
});

app.get('/createstudentinfotable', (req, res) => {
    db.query("CREATE TABLE student_information (student_id int primary key NOT NULL AUTO_INCREMENT, name VARCHAR(100), major VARCHAR(100), class VARCHAR(100))", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created...")
    });
});

app.get('/delete', (req, res) => {
    db.query("Drop TABLE student_information ", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created...")
    });
});






app.get("/studentsinfo", (req,res) => {
    db.query("SELECT * FROM student_information", (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    });

app.post("/studentsinfo", (req, res) => {
    const insertQuery = "INSERT INTO student_information SET ?";
    db.query(insertQuery, req.body, (err, result) => {
        if (err) {
        console.log(err);
        } else {
        res.send("Student Added to Database");
        }
    });
    });
    
app.put("/studentsinfo", (req, res) => {
const updateQuery =
    "UPDATE student_information SET name = ?, major = ?, class = ? WHERE student_id = ?";
db.query(
    updateQuery,
    [req.body.name, req.body.major, req.body.class, req.body.student_id],
    (err, result) => {
    if (err) {
        console.log(err);
    } else {
        res.send(result);
    }
    }
);
});

app.delete("/studentsinfo/:student_id", (req, res) => {
    db.query(
        "DELETE FROM student_information WHERE student_id = ?",
        req.params.student_id,
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        }
    );
    });

    const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
});