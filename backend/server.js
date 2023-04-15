import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT;

if(!port){
    console.log("port is not defined!");
    process.exit(1);
}

app.get('/', (request, response) => {
    response.send('Connected');
})

try{
    app.listen(port, ()=>{
        console.log(`Server listening on port ${port}`)
    })
} catch(error){
    console.error(error);
}