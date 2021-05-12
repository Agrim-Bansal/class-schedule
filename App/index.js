require('dotenv').config();
express = require('express');
fetch= require('node-fetch');
cors = require('cors')
app = express();
app.use(express.json());
app.use(cors());
const url = 'https://api.airtable.com/v0';
const base_ID = process.env.base_ID;

app.get('/', (req, res)=> {res.send('HelloWorld')});

app.get('/api/:table', async (req, res)=> {
    var table = req.params.table;
    data =  await (await fetch(`${url}/${base_ID}/${table}/?api_key=${process.env.API_KEY}&view=Grid%20view`)).json();
    console.log(data)
    res.send(data)
});


app.listen(process.env.PORT, ()=>{});