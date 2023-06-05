import express from 'express'
import postgresClient from '../config/db.js';





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
// doviz Combobx veri
router.get('/doviztipi',async (req,res) =>{
    try{
        const text = "SELECT d.dovizadi \
        FROM doviz d\
        LEFT JOIN usershesap h ON d.doviztipiid = h.doviztipiid\
        WHERE h.usersid IS NULL\
        "
        
        const {rows} = await postgresClient.query(text)
        return res.status(200).json(rows)
        
    } catch (error){
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
})
//şube combobox
router.get('/sube',async (req,res) =>{
    try{
        const text = "select subeadi from sube"
         const {rows} = await postgresClient.query(text)
        return res.status(200).json(rows)
        
    } catch (error){
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
})
//hesaptur combobox
router.get('/hesaptur',async (req,res) =>{
    try{
        const text = "SELECT * FROM hesaptur "
        
        const {rows} = await postgresClient.query(text)
        return res.status(200).json(rows)
        
    } catch (error){
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
})
// banka flatlist hesap 
router.get('/hesap/:tcno', async (req,res) => {
    try {
        const { tcno } = req.params;
        const text ="select h.usershesapid as id,h.hesapno,h.hesapbakiye,  u.userid, u.fullname, u.telno, t.hesapadi \
        from users u \
        INNER JOIN usershesap h on u.userid = h.usersid \
        INNER JOIN hesaptur t on t.hesapturid = h.hesapturid\
        WHERE tcno = $1"; 
                       const value = [tcno]
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
    const exchangeRates = generateExchangeRates();
    const response = {
      usd_try: exchangeRates.usd_try,
      euro_try: exchangeRates.euro_try,
      gbp_try: exchangeRates.gbp_try,
      chf_try: exchangeRates.chf_try
    };
    res.json(response);
  });
  
  function generateExchangeRates() {
    const exchangeRates = {
      usd_try: generateExchangeRate(),
      euro_try: generateExchangeRate(),
      gbp_try: generateExchangeRate(),
      chf_try: generateExchangeRate()
    };
    return exchangeRates;
  }
  
  function generateExchangeRate() {
    // Burada döviz kuru üretimi için istediğiniz yöntemi veya API'yi kullanabilirsiniz.
    // Örneğin, rastgele bir döviz kuru üretmek için Math.random() kullanabilirsiniz.
    // Aşağıdaki örnekte, döviz kurları 1 ile 10 arasında rastgele değerler alır:
    const rate = (Math.random() * 9) + 1;
    return rate.toFixed(2);
  }
  

//Authenticate user

router.post('/login', async (req,res) =>{
    try {
        const text = "SELECT * FROM users Where tcno = $1 AND password = $2 "
        const values = [req.body.tcno, req.body.password]
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