const express = require('express')
const nunjucks = require('nunjucks')
const mysqlConn = require('./src/config/db.config')
const app = express()
const port = 3000;

nunjucks.configure('src/views', {
    autoescape:  true,
    express:  app
  })

app.get('/', async (req,res) => {

    const sql = "SELECT * FROM names";

    mysqlConn.query(sql, (err, result) => {
        if(err) throw err;
        const data = {
            title: 'Full Cycle Rocks!',
            names: result
        }
    
        return res.render('index.njk', data);
    })
})

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})