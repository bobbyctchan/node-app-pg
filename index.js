const express = require("express");
const app = express();
const path = require('path')
const port = process.env.PORT || 3001;

const { Pool } = require('pg')
var pool = new Pool({
    connectionString: process.env.DATABASE_URL || "postgres://postgres@localhost/postgres"
})


app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('index', { title: "My App" }))
app.get('/db', (req,res)=> {
    data = [
        {name:'bob',age:41},
        {name:'jane',age:44}
    ]
    res.render('db', {result: data})
})
app.get('/api/people',async(req,res)=>{
    
    var allusersquery = `SELECT * FROM people`;
    try{

        const result = await pool.query(allusersquery)
        const data = { results: result.rows }
        res.render('people', data)
        
    }
    catch (error) {
        res.end(error)
    }
   
})


app.listen(port, () => console.log(`Example app listening on port ${port}!`));


