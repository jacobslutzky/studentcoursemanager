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

app.get('/create_student_info_table', (req, res) => {
    db.query("CREATE TABLE student_information (student_id int primary key NOT NULL AUTO_INCREMENT, name VARCHAR(100), major VARCHAR(100), year VARCHAR(100),password VARCHAR(100))", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created...")
    });
});
// app.get('/create_gpa_info_table', (req, res) => {
//     db.query("CREATE TABLE gpa_information (student_id int primary key, gpa numeric)", (err,result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send("table created...")
//     });
// });
app.get('/create_gradebook', (req, res) => {
    db.query("CREATE TABLE gradebook (student_id int , course_id VARCHAR(100), final_grade numeric, primary key(student_id,course_id))", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created...")
    });
});

app.get('/create_course_table', (req, res) => {
    db.query("CREATE TABLE courses (course_id int primary key, faculty_id int, name VARCHAR(100), description VARCHAR(100), credits numeric)", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created...")
    });
});


app.get('/create_review_table', (req, res) => {
    db.query("CREATE TABLE reviews (course_id int primary key, date datetime, rating int)", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created...")
    });
});
app.get('/create_teacher_table', (req, res) => {
    db.query("CREATE TABLE teacher (faculty_id int primary key, name VARCHAR(100))", (err,result) => {
        if(err) throw err;
        console.log(result);
        res.send("table created...")
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

app.post("/get_available_courses", (req, res) => {
        db.query(
            "select * from courses where course_id not in (select course_id from gradebook where student_id = ?) and course_id LIKE concat(?,'%')",
            [req.body.student_id, req.body.course_subname],
            (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
            }
        );
        });
    //"select * from courses where course_id not in (select course_id from gradebook where student_id = ? and final_grade = Null)"

app.post("/get_selected_course", (req, res) => {
    db.query(
        "select * from gradebook where student_id = ? and course_id = ?",
        [req.body.student_id, req.body.course_id],
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                res.send(result);
            }
        }
    )
});

app.post("/get_all_reviews", (req, res) => {
    db.query(
        "select * from reviews",
        (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                res.send(result);
            }
        }
    )

})

app.post("/add_review", (req, res) => {
        const insertQuery = "INSERT INTO reviews (course_id, date, rating) VALUES (?,?,?)";
        const course_id = req.body.data.course_id;
        const date = req.body.data.date;
        const rating = req.body.data.rating;
        console.log(date)
        db.query(insertQuery, [course_id, date, rating], (err, result) => {
            if (err) {
                console.log(err);
                } else {
                res.send(result);
                }
        });

    });

app.post("/get_curr_courses", (req, res) => {
    db.query(
        "select * from gradebook where student_id = ?",
        [req.body.student_id],
        (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
        }
    );
    });

app.post("/add_course", (req, res) => {
    const insertQuery = "INSERT INTO gradebook (student_id, course_id, final_grade) VALUES (?,?, 0)";
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;
    db.query(insertQuery, [student_id, course_id], (err, result) => {
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
    });
    
});

app.delete("/drop_course", (req, res) => {
    const deleteQuery = "delete from gradebook where student_id = ? and course_id = ?";
    console.log(req.params, req.body)
    const student_id = req.body.student_id;
    const course_id = req.body.course_id;
    db.query(deleteQuery, [student_id, course_id], (err, result) => {
        if (err) {
        console.log(err);
        } else {
        res.send(result);
        }
    });
    
});

// app.get("/get_gpa", (req, res) => {
        // db.query(
        //     "",
        //     req.params.student_id,
        //     (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         res.send(result);
        //     }
        //     }
        // );
        // });



