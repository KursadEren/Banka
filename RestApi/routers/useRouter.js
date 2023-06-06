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
        const text = "SELECT d.dovizadi,d.doviztipiid \
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
        const text = "select subeid, subeadi from sube"
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
        const text ="select h.usershesapid as id,h.hesapno,h.hesapbakiye,u.tcno,s.subeadi  ,u.userid, u.fullname, u.telno, t.hesapturadi \
        from users u \
        INNER JOIN usershesap h on u.userid = h.usersid \
        INNER JOIN hesaptur t on t.hesapturid = h.hesapturid\
        INNER JOIN sube s on s.subeid = h.subeid\
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


router.post('/users/:tcno',async (req,res) =>{
    try{
        
        const emailCheckQuery = 'SELECT * FROM users WHERE tcno = $1';
        const emailCheckValues = [ req.params.tcno];
        const result = await postgresClient.query(emailCheckQuery, emailCheckValues);
        if(result.rows.length>0)
        {
            return res.status(400).json({ error: 'A user with the same tcno already exists' });
        }

        const text = "INSERT INTO users (fullname,telno,dogumtarih,tcno,password,email) VALUES($1,$2,$3,$4,$5,$6)  "
        const values = [req.body.fullname, req.body.telno, req.body.dogumtarih, req.body.tcno ,req.body.password, req.body.email]
        const {rows} = await postgresClient.query(text,values)
        return res.status(201).json({createdUser: rows[0] })
        
    } catch (error){
        console.log('errorasdasd occured', error.message)
        return res.status(400).json({message: error.message})
    }
})
// hesap ekle ekleme
router.post('/dovizhesap',async (req,res) =>{
    try{
        const text = " Insert into usershesap (usersid,hesapturid,hesapbakiye,subeid,doviztipiid,iban) VALUES($1,$2,$3,$4,$5,$6)  "
        const values = [req.body.usersid,req.body.selectedOptionhesap,  req.body.hesapbakiye, req.body.selectedOptionsube ,req.body.selectedOptiondoviz, req.body.selectedIBAN]
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