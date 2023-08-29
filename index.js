import express, { json } from 'express';
import cors from 'cors';
import { loginWithEmailAndPassword, registerUserWithEmailAndPassword } from './api/firebaseAuth/signupAndsignIn.js';
const app = express();
app.use(json())
app.use(cors());

app.post("/signIn", async (req, res)=>{
  const data = req.body;
  res.send({msg:await loginWithEmailAndPassword(data['email'],data['password'])})
});
app.post("/register", async (req,res)=>{
  const data = req.body;
  res.send({msg:await registerUserWithEmailAndPassword(data.name,data.photo,data.email,data.password)})
})
const port = process.env.PORT || 4000;
app.listen(port,()=>console.log('Server up and running at *Port:4000*'));