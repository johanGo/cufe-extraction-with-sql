const express = require('express');
const app = express();
const mysql = require('mysql')

app.use(express.static(__dirname+'/'));
app.use(express.urlencoded({extended:false}));
app.use(express.json())

const connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'12345',
    database:'website'
})
connection.connect((err,res)=>{
    if(err) throw err
    console.log('conexion establecida')
});
// connection.query('truncate cufenumbers');

// connection.query(insertar,(err,res)=>{
//     if(err) throw err
//     console.log('se insertaron los datos correctamente')
// })

connection.query('select*from cufenumbers',(err,res)=>{
    if(err) throw err
    console.log(res)
});

app.post('/send', (req, res) => {    
    res.redirect('/');
    const {provider,number,code} = req.body
    console.log(provider);
    console.log(number);
    console.log(code);

    const insertar = `insert into cufeNumbers(provider,numbers,code) VALUES ('${provider}','${number}','${code}')`;    

    if (!provider || !number || !code) {
        console.log('El campo de entrada no puede estar vacío');
    } 
    connection.query(insertar, (err, res) => {
        try {
          if (err && err.code === 'ER_DUP_ENTRY') {
            console.log('Ya existe un registro con el valor del cufe');
          } else if (err) {
            console.log('Ocurrió un error al insertar los datos');
          } else {
            console.log('Se insertaron los datos correctamente');
          }
        } catch (er) {
          console.log('Ocurrió un error al insertar los datos');
        }
      });
});

app.listen(4000,()=>{
    console.log('El servidor esta escuchando en el puerto 4000')
})

