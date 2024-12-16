import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'
import multer from "multer";
import path from "path";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = "SELECT * from admin Where email = ? and password = ?";
  con.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ loginStatus: false, Error: "Query error" });
    if (result.length > 0) {
      const email = result[0].email;
      const token = jwt.sign(
        { role: "admin", email: email, id: result[0].id },
        "jwt_secret_key",
        { expiresIn: "1d" }
      );
      res.cookie('token', token)
      return res.json({ loginStatus: true });
    } else {
        return res.json({ loginStatus: false, Error:"wrong email or password" });
    }
  });
});

router.get('/category', (req, res) => {
    const sql = "SELECT * FROM category";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (`name`) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true})
    })
})

// image upload 
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'Public/Images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({
    storage: storage
})
// end imag eupload 


//ÇALIŞAN EKLEME ÇIKARTMA VS.
router.post('/add_employee', (req, res) => {
    console.log(req.body); // Gelen veriyi kontrol edin

    const sql = `INSERT INTO employee 
    (employeeId, email, password, fullname, position) 
    VALUES (?)`;

    // Password'ü hashlemeden doğrudan al
    const values = [
        req.body.employeeId,
        req.body.email,
        req.body.password, // Hashleme yok
        req.body.fullname,
        req.body.position,
    ];

    con.query(sql, [values], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message);
            return res.json({ Status: false, Error: err.message });
        }
        return res.json({ Status: true });
    });
});



router.get('/employee', (req, res) => {
    const sql = "SELECT * FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const sql = "SELECT * FROM employee WHERE employeeId = ?";
    con.query(sql,[employeeId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    
    // SQL sorgusunu düzenleyin
    const sql = `UPDATE employee 
                 SET fullname = ?, email = ?, position = ? 
                 WHERE employeeId = ?`;

    const values = [
        req.body.employeeId,
        req.body.fullname,
        req.body.email,
        req.body.position,
    ]
    con.query(sql,[...values, employeeId], (err, result) => {
        
    })
})

router.delete('/delete_employee/:employeeId', (req, res) => {
    const employeeId = req.params.employeeId;
    const sql = "delete from employee where employeeId = ?"
    con.query(sql,[employeeId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
//çalışan  ile ilgili şeylerin sonu

//proje ekleme çıkartma vs.
router.post('/add_project', (req, res) => {
    const sql = `INSERT INTO project (projectId, projectName, startDate, endDate) VALUES (?)`;
    const values = [
      req.body.projectId,
      req.body.projectName,
      req.body.startDate,
      req.body.endDate,
    ];
  
    con.query(sql, [values], (err, result) => {
      if (err) return res.json({ Status: false, Error: err.message });
      return res.json({ Status: true });
    });
});

  

router.get('/project', (req, res) => {
    const sql = "SELECT * FROM project";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/project/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const sql = "SELECT * FROM project WHERE projectId = ?";
    con.query(sql,[projectId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_project/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const sql = `UPDATE project 
        set projectId = ?, projectName = ?, startDate = ?, endDate = ?
        Where projectId = ?`
    const values = [
        req.body.projectId,
        req.body.projectName,
        req.body.startDate,
        req.body.endDate,
    ]
    con.query(sql,[...values, projectId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_project/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const sql = "delete from project where projectId = ?"
    con.query(sql,[projectId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
//proje ile ilgili şeylerin sonu

// task(göre ile ilgili şeyler)

router.post('/add_task', (req, res) => {
    const sql = `INSERT INTO task (taskId, projectId, employeeId, taskName, startDate, endDate, manDay, status, delay) VALUES (?)`;
    const values = [
      req.body.taskId,
      req.body.projectId,
      req.body.employeeId,
      req.body.taskName,
      req.body.startDate,
      req.body.endDate,
      req.body.manDay,
      req.body.status,
      req.body.delay,
    ];
  
    con.query(sql, [values], (err, result) => {
        console.log(req.query);
      if (err) return res.json({ Status: false, Error: err.message });
      return res.json({ Status: true });
    });
});

router.get('/task/:projectId', (req, res) => {
    const projectId = req.params.projectId;
    const sql = `SELECT t.taskId, t.taskName, t.startDate, t.endDate, 
                        t.status, e.fullname as assignedEmployee 
                 FROM task t 
                 LEFT JOIN employee e ON t.employeeId = e.employeeId 
                 WHERE t.projectId = ?`;
  
    con.query(sql, [projectId], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });
  

  router.get('/task/:employeeId', (req, res) => {
    const employeeId = req.params.employeeIdId;
    const sql = `SELECT t.taskId, t.taskName, t.startDate, t.endDate, 
                        t.status, e.fullname as assignedEmployee 
                 FROM task t 
                 LEFT JOIN employee e ON t.employeeId = e.employeeId 
                 WHERE t.employeeId = ?`;
  
    con.query(sql, [employeeId], (err, result) => {
      if (err) return res.json({ Status: false, Error: "Query Error" });
      return res.json({ Status: true, Result: result });
    });
  });

router.get('/task', (req, res) => {
    const sql = "SELECT * FROM task";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/task/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const sql = "SELECT * FROM task WHERE taskId = ?";
    con.query(sql,[taskId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_task/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const sql = `UPDATE task 
        set taskId = ?, taskName = ?, projectId = ?, projectName = ?, startDate = ?, endDate = ?, status = ?
        Where taskId = ?`
    const values = [
        req.body.taskId,
        req.body,taskName,
        req.body.startDate,
        req.body.endDate,
        req.body.status
    ]
    con.query(sql,[...values, taskId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_task/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const sql = "delete from task where taskId = ?"
    con.query(sql,[taskId], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})
//task(görev ile ilgili şeylerin sonu)


router.get('/admin_count', (req, res) => {
    const sql = "select count(id) as admin from admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})


router.get('/employee_count', (req, res) => {
    const sql = "select count(id) as employee from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_count', (req, res) => {
    const sql = "select sum(salary) as salaryOFEmp from employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "select * from admin"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"+err})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})

export { router as adminRouter };
