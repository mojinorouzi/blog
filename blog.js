const express = require('express');
const bodyparser =require('body-parser');
const models = require('./models');
const api = require('./routers/api')
const auth = require('./routers/auth')
const app = express();


app.use(bodyparser.json())

app.use('/api' , api)
app.use('/api' , auth)


app.listen(4000 , ()=>{
    console.log("server is active");
    
})





















