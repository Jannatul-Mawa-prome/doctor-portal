const express = require('express');
const mongoose = require('mongoose');
const app = express()
const port = 5000
var cors = require('cors');
app.use(cors());


app.use(express.urlencoded({
    extended: true
  }));

app.use(express.json());


app.get('/', (req, res) => {
  res.send('Hello World!')
})


const uri = "mongodb+srv://Jannatul:allAppointments@cluster0.vpwxt.mongodb.net/doctoraPortal?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

 mongoose.connection.on('connected', ()=>{
   console.log('mongoose  connection successfully !!!!')
 })

 // Create Schema

const Schema = mongoose.Schema;

const AppointmentScheme = new Schema({
    time: String,
    name:{
      type: String,
      required:true,
    },
    phone: {
      type: Number,
      required:true
    },
    email: {
      type:String,
      unique:true
    },
    date: {
      type:String,
      required:true
    }
})


//create Model - model measn create a document

const Appointment = mongoose.model('Appointment', AppointmentScheme);
const small = new Appointment();
  small.save(function (err) {
    if (err){
      //console.log(err)
    };
    // saved!
  });

  


  

app.post('/appointment',(req,res)=>{

  const newAppointment = req.body;
  Appointment.create({
    time: newAppointment.time,
    name:newAppointment.name,
    phone:newAppointment.phone,
    email:newAppointment.email,
    date:newAppointment.date
  },(err,result)=>{
      if(err){
        //console.log(err)
      }
      else{
        res.send(result)
      }
  })
  
})

app.post('/appointmentByDate',(req,res)=>{
  console.log(req.body)
  Appointment.find({date:req.body.newDate},(err,data)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(data)
      console.log(data)
    }

  })
 
})


app.get('/allPatinets',(req,res)=>{
  Appointment.find({},(err,data)=>{
    if(err){
      console.log(err)
    }
    else{
      res.send(data)
      console.log(data)
    }

  })
 
})


app.post('/removePatients',(req,res)=>{
  console.log(req.body)
  Appointment.deleteOne({phone:req.body.phoneNo},(err,data)=>{
    if(err){
      console.log(err)
    }
    else{
      console.log(data)
    }

  })
 
})





// client.connect(err => {
//   const newPatient = client.db("doctoraPortal").collection("Appointments");
//   console.log('db connection successfully');
  
    


  
// });





app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})