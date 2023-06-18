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
router.get('/users/:tcno',async (req,res) =>{
  try{
     const { tcno } = req.params;
      const text = "SELECT * FROM  users where tcno = $1 "
      const value = [tcno]
      const {rows} = await postgresClient.query(text,value)
      return res.status(200).json(rows)
      
  } catch (error){
      console.log('error occured', error.message)
      return res.status(400).json({message: error.message})
  }
})

// doviz Combobx veri
router.get('/doviztipi/:tcno',async (req,res) =>{
    try{
        const { tcno } = req.params;
        const text = `SELECT d.dovizadi, d.doviztipiid
        FROM doviz d
        WHERE d.doviztipiid NOT IN (
          SELECT h.doviztipiid
          FROM usershesap h
          INNER JOIN users u ON h.usersid = u.userid
          WHERE u.tcno = $1
        )
        
        `
        const value = [tcno]
       
   
        
        const {rows} = await postgresClient.query(text,value)
        return res.status(200).json(rows)
        
    } catch (error){
        console.log('error occured', error.message)
        return res.status(400).json({message: error.message})
    }
})

router.get('/doviztipiF',async (req,res) =>{
  try{
      const text = "SELECT * from doviz "
      
      
      const {rows} = await postgresClient.query(text)
      return res.status(200).json(rows)
      
  } catch (error){
      console.log('error occured', error.message)
      return res.status(400).json({message: error.message})
  }
})




router.get('/dovizsatis/:tcno',async (req,res) =>{
    try{
        const { tcno } = req.params;
        const text = "select h.doviztipiid,d.dovizadi from users u INNER JOIN usershesap h on u.userid = h.usersid INNER JOIN doviz d on d.doviztipiid = h.doviztipiid where tcno = $1"
        const value = [tcno]
        
        const {rows} = await postgresClient.query(text,value)
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

// satis alis işlemleri

router.get('/dovizgetir/:dovizadi', async (req,res) => {
    try {
        const { dovizadi } = req.params;
        const text ="select doviztipiid from doviz where dovizadi = $1";
        const value = [dovizadi]
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
      usd_try: generateExchangeRateusd(),
      euro_try: generateExchangeRateeuro(),
      gbp_try: generateExchangeRatesterlin(),
      chf_try: generateExchangeRatefrang()
    };
    return exchangeRates;
  }
  
  function generateExchangeRateusd() {
    
     
    const rate = Math.random() + 23;
    return rate.toFixed(2);
  }
  function generateExchangeRateeuro() {
   
     
    const rate = Math.random() + 25;
    return rate.toFixed(2);
  }
  function generateExchangeRatesterlin() {
    
     
    const rate = Math.random() + 29;
    return rate.toFixed(2);
  }
  function generateExchangeRatefrang() {
    
     
    const rate = Math.random() + 25;
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

router.post('/dovizkontrol', async (req,res) =>{
    try {
        
        const text = "SELECT * FROM users u INNER JOIN usershesap h ON h.usersid = u.userid  INNER JOIN doviz d ON d.doviztipiid = h.doviztipiid  WHERE u.tcno = $1  AND  h.doviztipiid = $2  AND  h.hesapbakiye >= $3   "
        const values = [req.body.tcno, req.body.doviztipiid,req.body.dolarmiktar]
        const {rows} = await postgresClient.query(text,values)
        console.log(rows)
        if(!rows.length)
        {
           

            return res.status(404).json()
        }
        return res.status(200).json({ message:' authentication succesfull'})
    } catch (error) {
        console.log('error occured', error.message)
        return res.status(400).json({message:error.message})
    }
})

router.get('/ozetbilgi/:tcno', async (req,res) =>{
    try {
        const {tcno} = req.params
        const text = "SELECT * FROM users u INNER JOIN usershesap h ON h.usersid = u.userid  INNER JOIN doviz d ON d.doviztipiid = h.doviztipiid  WHERE u.tcno = $1    "
        const values = [tcno]
        const {rows} = await postgresClient.query(text,values)
        console.log(rows)
        if(!rows.length)
        {
            

            return res.status(404).json()
        }
        return res.status(200).json({rows})
    } catch (error) {
        console.log('error occured', error.message)
        return res.status(400).json({message:error.message})
    }
})
/*insert into islem 
(satilanparatutari,alinacakparatutari,tarih,usersid,alinanparatipi,satilanparatipi,satildiğikur)
values($1,$2,$3,$4,$5,$6,$7)*/

router.post('/dovizozet', async (req,res) =>{
    try {
      console.log(typeof req.body.chechdoviz,typeof req.body.chechdoviz2)
        const text = `INSERT INTO islem
        (satilanparatutari, alinacakparatutari, tarih, usersid, alinanparatipi, satilanparatipi, satildigikur, alimsatim)
      VALUES
        (
          COALESCE(NULLIF($1, ''), NULL),
          COALESCE(NULLIF($2, ''), NULL),
          $3,
          $4,
          COALESCE(NULLIF($5, ''), NULL),
          COALESCE(NULLIF($6, ''), NULL),
          COALESCE(NULLIF($7, ''), NULL),
          COALESCE(NULLIF($8, ''), NULL)
        )`
        const values = [req.body.dolarmiktar,req.body.hesaplananpara,req.body.tarih,req.body.userid,req.body.chechdoviz,req.body.chechdoviz2,req.body.secilenDoviz,req.body.islemtipi]
        const {rows} = await postgresClient.query(text,values)
        console.log(rows)
        
        
        return res.status(201).json({ message:' authentication succesfull'})
    } catch (error) {
        console.log('dovizozet')
        console.log('error occured', error.message)
        console.log('dovizozet')
        return res.status(400).json({message:error.message})
    }
})
//
//
//;//hesapcikart

// hesap silme
/*
/
*/
router.post('/silme', async (req,res) =>{
  try {
   
      const text = `DELETE FROM usershesap
      WHERE usersid = (
        SELECT userid
        FROM users
        WHERE tcno = $1
      )
        AND doviztipiid = $2
        AND hesapbakiye = 0;
      `
      const values = [req.body.tcno,req.body.chechdoviz]
      const {rows} = await postgresClient.query(text,values)
      console.log(rows)
      
      
      return res.status(200).json({ message:'silme işlemi başarılı'})
  } catch (error) {
     
      return res.status(400).json({message:error.message})
  }
})





router.post('/hesapekle', async (req, res) => {
    try {
      const Text1 = "SELECT * FROM usershesap WHERE usersid = $1 AND doviztipiid = $2 "
      const values = [ req.body.userid, req.body.chechdoviz]
      const result = await postgresClient.query(Text1, values)
      
      if (result.rows.length <= 0) {
        
        return res.status(404).json({ message: "Kaynak bulunamadı" })
      }
  
      const text = "UPDATE usershesap SET hesapbakiye = hesapbakiye + $1 WHERE usersid = $2 AND doviztipiid = $3"
  
      const updatevalues = [req.body.dolarmiktar, req.body.userid, req.body.chechdoviz]
     
      const {rows} =  await postgresClient.query(text, updatevalues)
  
      return res.status(200).json({ message: 'Hesap güncelleme işlemi başarılı' })
    } catch (error) {
       
        console.log('hesapekle')
      console.log('Hata oluştu:', error.message)
      return res.status(400).json({ message: error.message })
    }
  })


  //satiş 
  router.post('/hesapekleSatis', async (req, res) => {
    try {
      console.log(req.body.hesaplananpara, req.body.userid, req.body.chechdoviz2)
      const Text1 = "SELECT * FROM usershesap WHERE usersid = $1 AND doviztipiid = $2 "
      const values = [ req.body.userid, req.body.chechdoviz2]
      const result = await postgresClient.query(Text1, values)
      
      if (result.rows.length <= 0) {
        
        return res.status(404).json({ message: "Kaynak bulunamadı" })
      }
  
      const text = "UPDATE usershesap SET hesapbakiye = hesapbakiye + $1 WHERE usersid = $2 AND doviztipiid = $3"
  
      const updatevalues = [req.body.hesaplananpara, req.body.userid, req.body.chechdoviz2]
     
      const {rows} =  await postgresClient.query(text, updatevalues)
  
      return res.status(200).json({ message: 'Hesap güncelleme işlemi başarılı' })
    } catch (error) {
       
        console.log('hesapekle')
      console.log('Hata oluştu:', error.message)
      return res.status(400).json({ message: error.message })
    }
  })
//SATİS
  router.post('/hesapcikartSatis', async (req, res) => {
    try {
        
        const Text1 = " SELECT * FROM usershesap WHERE usersid = $2 AND doviztipiid = $3 AND hesapbakiye >= $1  "
        const values = [req.body.dolarmiktar, req.body.userid,req.body.chechdoviz];
        const result = await postgresClient.query( Text1 , values)
        
        if (result.rows.length <=0) {
           
          return res.status(404).json({ message:  "Kaynak bulunamadı" })
        }
        
        const text = "UPDATE usershesap SET hesapbakiye = hesapbakiye - $3 WHERE usersid = $1 AND doviztipiid = $2"
        
        const updateValues =  [req.body.userid, req.body.chechdoviz,req.body.dolarmiktar];
        await postgresClient.query(text, updateValues)
        
        return res.status(200).json({ message: 'Hesap güncelleme işlemi başarılı' })
      
      

    } catch (error) {
        console.log('hesapcikart')
      console.log('Hata oluştu:', error.message)
      return res.status(400).json({ message: error.message })
    }
  })


  router.post('/hesapcikart', async (req, res) => {
    try {
        
        const Text1 = " SELECT * FROM usershesap WHERE usersid = $2 AND doviztipiid = $3 AND hesapbakiye >= $1  "
        const values = [req.body.hesaplananpara, req.body.userid,req.body.chechdoviz2];
        const result = await postgresClient.query( Text1 , values)
        
        if (result.rows.length <=0) {
           
          return res.status(404).json({ message:  "Kaynak bulunamadı" })
        }
        
        const text = "UPDATE usershesap SET hesapbakiye = hesapbakiye - $3 WHERE usersid = $1 AND doviztipiid = $2"
        
        const updateValues =  [req.body.userid, req.body.chechdoviz2,req.body.hesaplananpara];
        await postgresClient.query(text, updateValues)
        
        return res.status(200).json({ message: 'Hesap güncelleme işlemi başarılı' })
      
      

    } catch (error) {
        console.log('hesapcikart')
      console.log('Hata oluştu:', error.message)
      return res.status(400).json({ message: error.message })
    }
  })









    // içinde para varmı kontolü için
  router.post('/hesapKontrol', async (req, res) => {
    try {
      const Text1 = " SELECT * FROM usershesap WHERE usersid = $2 AND doviztipiid = $3 AND hesapbakiye >= $1  "
      const values = [req.body.dolarmiktar, req.body.userid, req.body.doviztipi]
      const result = await postgresClient.query( Text1 , values)
  
      if (!result.rows.length) {
       
        return res.status(404).json({ message:  "Kaynak bulunamadı" })
      }
      console.log('merhaba')
      return res.status(200).json({ message: 'Hesap güncelleme işlemi başarılı' })
    } catch (error) {
        
      console.log('Hata oluştu:', error.message)
      return res.status(400).json({ message: error.message })
    }
  })
  /*select i.satilanparatutari,i.alinacakparatutari , i.tarih, i.alinanparatipi,i.satilanparatipi, i.satildigikur, i.alimsatim
from users u
INNER JOIN islem i on i.usersid = u.userid
where tcno = '27337851310'
*/
router.get('/user-transactions', async (req, res) => {
  const { tcno, page, sort } = req.query;
  const perPage = 10; // Sayfa başına gösterilecek veri sayısı

  try {
    // Toplam işlem sayısını al
    const totalCountResult = await postgresClient.query(
      `SELECT COUNT(*) as count
      FROM users u
      INNER JOIN islem i ON i.usersid = u.userid
      WHERE u.tcno = $1`,
      [tcno]
    );
    const totalCount = totalCountResult.rows[0].count;
    const totalPages = Math.ceil(totalCount / perPage);

    // Geçerli sayfa sınırlarını belirle
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

         let query = `SELECT DISTINCT
         i.satilanparatutari,
         i.alinacakparatutari,
         i.tarih,
         i.alinanparatipi,
         i.satilanparatipi,
         i.satildigikur,
         (SELECT dovizadi FROM doviz WHERE doviztipiid = i.alinanparatipi::integer) AS alinanparatipi_adi,
         (SELECT dovizadi FROM doviz WHERE doviztipiid = i.satilanparatipi::integer) AS satilanparatipi_adi
       FROM
         users u
         INNER JOIN islem i ON i.usersid = u.userid
         INNER JOIN usershesap h ON h.usersid = u.userid
         INNER JOIN doviz d ON h.doviztipiid = d.doviztipiid
       WHERE
         u.tcno = $1
         AND i.satilanparatipi != '0'
       ORDER BY
         i.tarih ${sort === 'descending' ? 'DESC' : 'ASC'}
       LIMIT
         $2 OFFSET $3
       
       `;

    const userTransactionsResult = await postgresClient.query(query, [tcno, perPage, startIndex]);

    const userTransactions = userTransactionsResult.rows;

    res.json({
      transactions: userTransactions,
      totalPages: totalPages,
      currentPage: page,
    });
  } catch (error) {
    console.error('Sorgu sırasında bir hata oluştu:', error);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});


  
  
  
router.get('/ozetbilgi/:tcno', async (req,res) =>{
    try {
        const {tcno} = req.params
        const text = "SELECT * FROM users u INNER JOIN usershesap h ON h.usersid = u.userid  INNER JOIN doviz d ON d.doviztipiid = h.doviztipiid  WHERE u.tcno = $1    "
        const values = [tcno]
        const {rows} = await postgresClient.query(text,values)
        console.log(rows)
        if(!rows.length)
        {
            

            return res.status(404).json()
        }
        return res.status(200).json({rows})
    } catch (error) {
        console.log('error occured', error.message)
        return res.status(400).json({message:error.message})
    }

   
    
})


router.post('/hesapduzenle', async (req, res) => {
  try {
      
      const Text1 = `select 
      * from users u 
      INNER JOIN usershesap h on  u.userid = h.usersid
      where u.tcno = $1  AND h.doviztipiid = $2 `
      const values = [req.body.tcno, req.body.chechdoviz];
      const result = await postgresClient.query( Text1 , values)
      

      console.log(result.rows)
      
      if (!result.rows.length) {
       
        return res.status(404).json({ message:  "Kaynak bulunamadı" })
      }
      const text = `UPDATE usershesap
      SET doviztipiid = $3,
          subeid = $5,
          hesapturid = $4
       WHERE usersid = (SELECT userid FROM users WHERE tcno = $1) AND doviztipiid = (select doviztipiid from usershesap where doviztipiid = $2 )
`
      
      const updateValues =  [req.body.tcno, req.body.chechdoviz,req.body.selectedOptiondoviz,req.body.selectedOptionhesap,req.body.selectedOptionsube];
      await postgresClient.query(text, updateValues)
      
       
      
      
      return res.status(200).json({ message: 'Hesap güncelleme işlemi başarılı' })
    
    

  } catch (error) {
   
    return res.status(400).json({ message: error })
  }
})


/*const text = `BEGIN;

SELECT *
FROM users u
INNER JOIN usershesap h ON u.userid = h.usersid
WHERE u.tcno = $1 AND h.doviztipiid = $2;


IF FOUND THEN
   
    ROLLBACK;
ELSE
    
    UPDATE usershesap
    SET doviztipiid = $3,
        subeid = $5,
        hesapturid = $4
    WHERE usersid = (SELECT userid FROM users WHERE tcno = $1);
END IF;

COMMIT;
`
      
      const updateValues =  [req.body.tcno, req.body.chechdoviz,req.body.selectedOptiondoviz,req.body.selectedOptionhesap,req.body.selectedOptionsube];
      await postgresClient.query(text, updateValues)*/


export default router;