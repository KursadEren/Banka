import express from 'express'
import postgresClient from '../config/db.js';



function generateExchangeRate() {
    const min = 4.0; // minimum exchange rate
    const max = 10.0; // maximum exchange rate
  
    // Generate a random exchange rate between min and max
    const exchangeRate = (Math.random() * (max - min)) + min;
  
    return exchangeRate;
  }

const router = express.Router();

router.get('/',async (req,res) =>{
    try{
        const text = "SELECT * FROM  users "
        
        const {rows} = await postgresClient.query(text)
        return res.status(200).json(rows)
        
    } catch (error){
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
})
// banka flatlist hesap 
router.get('/hesap/:email', async (req,res) => {
    try {
        const { email } = req.params;
        const text ="select h.usershesapid as id,h.hesapno,h.hesapbakiye,  u.userid, u.fullname, u.telno, t.hesapadi \
        from users u \
        INNER JOIN usershesap h on u.userid = h.usersid \
        INNER JOIN hesaptur t on t.hesapturid = h.hesapturid\
        WHERE email = $1"; 
                       const value = [email]
        const {rows} = await postgresClient.query(text,value)
        return res.status(200).json(rows)
    } catch (error) {
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
})

// CREATE USERS


router.post('/users/:email',async (req,res) =>{
    try{
        const email  = req.params.email
        const emailCheckQuery = 'SELECT * FROM users WHERE email = $1';
        const emailCheckValues = [email];
        const result = await postgresClient.query(emailCheckQuery, emailCheckValues);
        if(result.rows.length>0)
        {
            return res.status(400).json({ error: 'A user with the same email already exists' });
        }

        const text = "INSERT INTO users (fullname,username,telno,dogumtarih,tcno,password,email,userhesapid) VALUES($1,$2,$3,$4,$5,$6,$7,$8)  "
        const values = [req.body.fullname,req.body.username, req.body.telno, req.body.dogumtarih, req.body.tcno ,req.body.password, req.body.email, req.body.userhesapid || 5]
        const {rows} = await postgresClient.query(text,values)
        return res.status(201).json({createdUser: rows[0] })
        
    } catch (error){
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
})

router.get('/doviz', (req, res) => {
    const exchangeRate = generateExchangeRate();
    const response = { usd_try: exchangeRate }; // Convert the exchange rate to an object with a property name
    res.json(response);
  });


//Authenticate user

router.post('/login', async (req,res) =>{
    try {
        const text = "SELECT * FROM users Where email = $1 AND password = $2 "
        const values = [req.body.email, req.body.password]
        const {rows} = await postgresClient.query(text,values)
        if(!rows.length)
        {
            return res.status(404).json({message:'user not found. '})
        }
        return res.status(200).json({ message:' authentication succesfull'})
    } catch (error) {
        console.log('error occured', error.message)
        return res.status(400).json({message:error.message})
    }
})

export default router;