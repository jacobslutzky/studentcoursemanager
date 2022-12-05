const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();


app.use(express.json()); // parses incoming requests with JSON payloads
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials:true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    key: "userId",
    secret: "benotham",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
    },
}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
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
    db.query("CREATE TABLE student_information (student_id int primary key NOT NULL AUTO_INCREMENT, name VARCHAR(100), major VARCHAR(100), year VARCHAR(100),password VARCHAR(100))", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created...")
    });
});

app.get('/delete', (req, res) => {
    db.query("Drop TABLE student_information ", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database deleted...")
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

app.post("/register", (req, res) => {
    const insertQuery = "INSERT INTO student_information (name, password, major, year) VALUES (?,?, ?, ?)";
    const name = req.body.name;
    const password = req.body.password;
    const major = req.body.major;
    const year = req.body.year;
    db.query(insertQuery, [name, password,major,year], (err, result) => {
        if (err) {
        console.log(err);
        } else {
        db.query("select * from student_information where student_id = (select MAX(student_id) from student_information)", (err, result) => {
        if (err) {
            console.log(err);
            } else {
            res.send(result);
        }
    });
        }
    });
    
});
    
app.put("/studentsinfo", (req, res) => {
const updateQuery =
    "UPDATE student_information SET name = ?, major = ?, year = ? WHERE student_id = ?";
db.query(
    updateQuery,
    [req.body.name, req.body.major, req.body.year, req.body.student_id],
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


app.post("/login_student", (req, res) => {
    db.query(
        "Select * FROM student_information WHERE student_id = ?",
        [req.body.student_id], 
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            if(result.length > 0 && result[0].password === req.body.password) {
                console.log(result)
                res.send(result);
            }
            else{
                res.send({message: "User does not exist"});
            }
        }
        }
    );
    });
    const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App is listening on port ' + listener.address().port)
    
    
});