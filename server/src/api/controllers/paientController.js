const {validationResult}=require("express-validator");
const { schema } = require("./../models/patientModel");
const  fs = require('fs');
const Patient=require("./../models/patientModel");
const { request } = require("http");
const { response } = require("express");

exports.getAllPatient=(request,response,next)=>{
    Patient.find({})
    // .populate({path:"Doctor",model:"Doctor"})
    // .populate({path:"Appointment",model:"Appointment"})
    // .populate({path:"Prescription",model:"Prescription"})
   // .populate([{path:"Doctor"},{path:"Appointment"},{path:"Prescription"}])
              .then(data=>{
                response.status(200).json(data)

              }).catch(error=>next(error))
           
}
exports.getPatient=(request,response,next)=>{
    console.log(request.params._id); 
     Patient.findOne({_id:request.params._id})
    // .populate({path:"Doctor"})
    // .populate({path:"Appointment"})
    // .populate({path:"Prescription"})
  
              .then(data=>{
            
                  if(data==null) next(new Error("Patent id not Found"))

                    response.status(200).json(data)
              })
              .catch(error=>next(error))

}
exports.createPatient=(request,response,next)=>{ 
      console.log("add")
    
    let errors=   validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    console.log(request.body);
    

   // let image = request.body != undefined || null ? request.body.profile_img : request.body.gender+".png"
 
       // console.log(image);
       
      let object = new  Patient({
       
        first_name: request.body.first_name,
        last_name : request.body.last_name,
        phone_number:request.body.phone_number,
        age:request.body.age,
        gender:request.body.gender,
        address:request.body.address,
        profile_img:request.body.profile_img 
        
    
     
     
      })
 
      console.log(object);
      object.save()
            .then(data=>{

                response.status(201).json({message:"added",data})

            })
            .catch(error=>next(error))
}

exports.updatePatient=(request,response,next)=>{
        Patient.findByIdAndUpdate(request.body._id,{
            $set:{
            
          first_name: request.first_name,
        last_name : request.body.last_name,
        phone_number:request.body.phone_number,
        age:request.body.age,
        gender:request.body.gender,
        address:request.body.address,
        // profile_img: { data: fs.readFileSync(path.join(__dirname + './../../../../images/' + request.file.path)),
        //     //data:fs.readFileSync(request.body.profile_img),
        //    contentType: 'image/png'},
     
        
            }
        })
                  .then(data=>{
                      if(data==null) throw new Error("Patient Is not Found!")
                    response.status(200).json({message:"updated",data})

                  })
                  .catch(error=>next(error))
}

exports.deletePatient=(request,response,next)=>{
        Patient.findByIdAndDelete(request.params._id)
                  .then(data=>{
                      if(data==null) throw new Error("Patient Is not Found!")
                      response.status(200).json({message:"deleted"})
                    
                  })
                  .catch(error=>next(error))
}
////////////////////////////////////////////////////////////
exports.addDoctortoPatient=(request,response,next)=>{
    let errors=   validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    else{
        Patient.updateOne({_id:request.body._id},
        {
            $addToSet:{Doctor: request.body.doctor}
        }).then(data=>{
            if(data==null) throw new Error("Patient Is not Found!")
            response.status(200).json({message:"Doctor add to Patient"})
          
        })
        .catch(error=>next(error))
    }
 
}
exports.addAppointmenttoPatient=(request,response,next)=>{
    let errors=   validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    else{
        Patient.updateOne({_id:request.body._id},
        {
            $addToSet:{Appointment: request.body.appointment}
        }).then(data=>{
            if(data==null) throw new Error("Patient Is not Found!")
            response.status(200).json({message:"Appointment add to Patient"})
          
        })
        .catch(error=>next(error))
    }
 
}
exports.addPrescriptiontoPatient=(request,response,next)=>{
    let errors=   validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    else{
        Patient.updateOne({_id:request.body._id},
        {
            $addToSet:{Prescriptions: request.body.prescription}
        }).then(data=>{
            if(data==null) throw new Error("Patient Is not Found!")
            response.status(200).json({message:"Prescription add to Patient"})
          
        })
        .catch(error=>next(error))
    }
 
}
////////////////////////////////////////////
exports.deleteDoctorfromPatient=(request,response,next)=>{
    let errors=   validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    else{
        Patient.updateOne({_id:request.body._id},
        {
            $pull:{Doctor: request.body.doctor}
        }).then(data=>{
            if(data==null) throw new Error("Patient Is not Found!")
            response.status(200).json({message:"Doctor delete from Patient"})
          
        })
        .catch(error=>next(error))
    }
 
}
exports.deleteAppointmentfromPatient=(request,response,next)=>{
    let errors=   validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    else{
        Patient.updateOne({_id:request.body._id},
        {
            $pull:{Appointment: request.body.appointment}
        }).then(data=>{
            if(data==null) throw new Error("Patient Is not Found!")
            response.status(200).json({message:"Appointment delete from Patient"})
          
        })
        .catch(error=>next(error))
    }
 
}
exports.deletePrescriptionfromPatient=(request,response,next)=>{
    let errors=   validationResult(request);
    if(!errors.isEmpty())
    {
           let error=new Error();
           error.status=422;
           error.message=errors.array().reduce((current,object)=>current+object.msg+" ","")
           throw error;
    }
    else{
        Patient.updateOne({_id:request.body._id},
        {
            $pull:{Prescriptions: request.body.prescription}
        }).then(data=>{
            if(data==null) throw new Error("Patient Is not Found!")
            response.status(200).json({message:"Prescription delete from Patient"})
          
        })
        .catch(error=>next(error))
    }
 
}




