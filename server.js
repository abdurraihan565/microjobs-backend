import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';

//import data from './data.js';
import products from './routes/products.js';
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

/* img upload*/
const UPLOADS_FOLDER = './public/uploads/';
var upload = multer({
  dest: UPLOADS_FOLDER,
});

app.post('/upload', upload.single('avater'), (req, res) => {
  const img = req.file.filename;
  const id = req.body.id;
  const area = req.body.area;
  const name = req.body.name;
  const country = req.body.country;
  const price = req.body.price;

  console.log(area);
  db.query(
    'INSERT INTO microdatabase.image (id,img,provedes,name,country,price) VALUES (?,?,?,?,?,?)',
    [id, img, area, name, country, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        //res.send({ message: 'value submitted' });
        console.log('value submitted');
      }
    }
  );
});

// get img
app.get('/uploads', (req, res) => {
  db.query('SELECT * FROM microdatabase.image', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/* img upload ends*/
import mysql from 'mysql';
app.use('/api', products);

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '93c37b664cd',
});
// get data from mysql
app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM microdatabase.products', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// get data from mysql
app.get('/api/message', (req, res) => {
  db.query('SELECT * FROM microdatabase.message', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//post data to mysql provedata
app.post('/provedata', (req, res) => {
  const proveDes = req.body.proveDes;
  const id = req.body.id;
  const name = req.body.name;
  const country = req.body.country;
  const price = req.body.price;

  db.query(
    'INSERT INTO microdatabase.provedata (id,provedes,name,country,price) VALUES (?,?,?,?,?)',
    [id, proveDes, name, country, price],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: 'value submitted' });
      }
    }
  );
});
//get data form provedata
app.get('/provedata', (req, res) => {
  db.query('SELECT * FROM microdatabase.provedata', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//get data form payments
app.get('/payments', (req, res) => {
  db.query('SELECT * FROM microdatabase.payments', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// register
app.post('/register', (req, res) => {
  const id = req.body.id;
  const username = req.body.UserName;
  const country = req.body.Country;
  const email = req.body.Email;
  const password = req.body.Password;
  db.query(
    'INSERT INTO microdatabase.userdata (id,username,country,email,password) VALUES (?,?,?,?,?)',
    [id, username, country, email, password],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: 'value submitted' });
      }
    }
  );
});
app.post('/login', (req, res) => {
  const loginemail = req.body.loginemail;
  const loginpassword = req.body.loginpassword;
  db.query(
    'SELECT * FROM microdatabase.userdata WHERE email = ? AND password = ? ',
    [loginemail, loginpassword],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: 'wrong username/password' });
      }
    }
  );
});
//createpost post
app.post('/createPost', (req, res) => {
  const id = req.body.id;
  const PostSelectValue = req.body.PostSelectValue;
  const PostSelectValueCountry = req.body.PostSelectValueCountry;
  const PostSelectValueAudience = req.body.PostSelectValueAudience;
  const SelectValue = req.body.SelectValue;
  const PostLink = req.body.PostLink;
  const PostInput = req.body.PostInput;
  const PostInputTwo = req.body.PostInputTwo;
  db.query(
    'INSERT INTO microdatabase.createpost (id,PostSelectValue,PostSelectValueCountry,PostSelectValueAudience,SelectValue,PostLink,PostInput,PostInputTwo) VALUES (?,?,?,?,?,?,?,?)',
    [
      id,
      PostSelectValue,
      PostSelectValueCountry,
      PostSelectValueAudience,
      SelectValue,
      PostLink,
      PostInput,
      PostInputTwo,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          message:
            'Dear rayhan Your Post was succesfully submitted ! Our Clint review Your Post . Please wait 24/h bussnees Time',
        });
      }
    }
  );
  //console.log(SelectValue);
});
// createpost get
app.get('/api/createpost', (req, res) => {
  db.query('SELECT * FROM microdatabase.createpost', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// get deposit balance
app.get('/api/depositbalance', (req, res) => {
  db.query('SELECT * FROM microdatabase.depositbalance', (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
// withdraw
app.post('/api/withdraw', (req, res) => {
  const id = req.body.id;
  const Wallet = req.body.Wallet;
  const Account_Number = req.body.Account_Number;
  const Wallet_Input = req.body.Wallet_Input;
  console.log(Wallet_Input);
  db.query(
    'INSERT INTO microdatabase.withdraw (id,wallet,accountnumber,withdraw) VALUES (?,?,?,?)',
    [id, Wallet, Account_Number, Wallet_Input],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          message:
            'Your  payout request accept Our Clint please wait for 24/h Business Time',
        });
      }
    }
  );
});
//deposit  money
app.post('/deposit', (req, res) => {
  const id = req.body.id;
  const deposit_value = req.body.deposit_value;
  const deposit = req.body.Deposit;
  const deposit_des = req.body.Deposit_des;
  console.log(deposit);

  db.query(
    'INSERT INTO microdatabase.deposit (id,account,deposit,depositdes) VALUES (?,?,?,?)',
    [id, deposit_value, deposit, deposit_des],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({
          message:
            'Your  Deposit request accept Our Clint please wait for 24/h Business Time',
        });
      }
    }
  );
});

//userinfo
app.get('/userinfo', (req, res) => {
  const userinfo = db.query(
    'SELECT * FROM microdatabase.userinfo',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
// userdata
app.get('/api/userdata', (req, res) => {
  const userinfo = db.query(
    'SELECT * FROM microdatabase.userdata',
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

/*app.get('/api/products', (req, res) => {
  res.send(data.products);
});*/

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`server at http://localhost:${port}`);
});
