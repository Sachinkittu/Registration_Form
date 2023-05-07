const express = require('express');
const app = express();
const cors = require('cors');

const pool = require('./db');


app.use(cors());
app.use(express.json());

app.post("/form",async(req,res) => {
    try {
        const {name,dob,sex,mobile,id_type,govt_num,g_title,g_name,email,e_con_num,address,state,city,country,pincode,occupation,religion,m_status,b_group,nationality} = req.body;
        
        const gua_name = g_title + " " + g_name;
 
        const formData = await pool.query(
            `insert into public."Reg_form" (name,dob,sex,mobile,id_type,id_num,g_name,email,emer_contact,address,state,city,country,pin_code,occupation,religion,marital_status,blood_group,nationality) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19)`,
            [name,dob,sex,mobile,id_type,govt_num,gua_name,email,e_con_num,address,state,city,country,pincode,occupation,religion,m_status,b_group,nationality]
        );

        if(formData.rowCount != 0) {
            res.status(201).json({message: "message sent success"});
        }
        else 
            res.status(422).json({message: "Something went wrong.Please try again later"});
    }
    catch(err) {
        console.log(err.message);
    }
})

app.get("/table",async(req,res) => {
    try {
        const tableData = await pool.query(
            `select name,dob||'/'||sex as age,mobile,address||','||city||','||state||','||country as address,id_num,g_name,nationality from public."Reg_form"`
        );

        if(tableData.rowCount != 0){
            res.json(tableData.rows);
        }
        else
            res.json("");
    }
    catch(err) {
        console.log(err.message);
    }
})


app.listen(5001, () => {
    console.log("listen to port 5001");
})