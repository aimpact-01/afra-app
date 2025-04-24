import { Alert, Card, CardActions, CardContent, Paper, TextField, Typography,} from "@mui/material"
import TextField1 from "../TextField"
import { useState } from "react"
import "./Card.css"
import React from "react";
import EditableForm from "./FormDemo";


const initialFormData = {
    fundName:'Equity',
    fundCode:'EQUITY',
    firstName: 'Rian',
    lastName: 'Doe',
    
  };

interface CardProps {
    onClose: () => void;
    title?: string;
    content?: string;
    data:any
  }



  const UploadCardComponent = ()=>{


    const [submit, setSubmit] = useState(false);
    const [data1, setData1] = useState<any>([]);
    const [details, setDetails] = useState<any>([]);
    const toggleCard = () => {
     getData()
     setSubmit(!submit);
   };
 
const CardDemo: React.FC<CardProps> = ({ onClose, title = 'Card Title', content = 'Sample content',data=data1}) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
  return (
    <div className="card-overlay">
      <div className="card">
        <div className="card-header">
          <h2>{title}</h2>
          <button className="close-button" onClick={onClose}>x</button>
        </div>
        <div className="card-content">
        <p>Kickout ID:K0_112</p>
        <p>Type: FTB_SETUP</p>
       

        </div>
        <div>
        {/* { data1.type==='FTB_SETUP'?<div> */}
        <React.Fragment >
         <p>--------FTB SETUP Options--------</p>
                   
         </React.Fragment>
                <button style={{
                       background: 'linear-gradient(45deg,#2c3e50, #3498db )',
                       border: 0,
                       borderRadius: 3,
                       boxShadow: '0 3px 5px 2px rgba(77, 58, 173, 0.3)',
                       color: 'white',
                       fontWeight:'b0lder',
                       fontSize:'14px',
                       margin:'20px',height:'40px'

                   }} onClick={() => setIsFormOpen(true)}>Dynamic FTB Form </button>
                <button style={{
                        background: 'linear-gradient(45deg,#2c3e50, #3498db )',
                        border: 0,
                        borderRadius: 3,
                        boxShadow: '0 3px 5px 2px rgba(77, 58, 173, 0.3)',
                        color: 'white',
                        fontWeight:'b0lder',
                        fontSize:'14px',height:'40px'

                   }}>Upload Template </button>
               {/* </div>:''} */}
               <EditableForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        initialData={initialFormData}
      />
               </div>
      </div>
    </div>
  );
};



  const getData =() =>{
    (async () => {
        try{
        const detail = await fetch(`https://ceefde25v6-vpce-00885819822df6078.execute-api.us-east-1.amazonaws.com/api/form/KO_113`, {mode:'cors'});
        const detailData= await detail.json();
        setDetails(detailData.details)
      }
        catch (e) {
          console.log(e)
        }
      } )();
}

return(
    <Card  sx={{height:'50%',width:'45%',marginTop:'5rem',marginLeft:'1rem'}} >

<h4 style={{textAlign:'center'}}>Kickout File Upload Section</h4>
        <CardContent sx={{marginTop:'-105px',padding:0}}><TextField1></TextField1>
      </CardContent >
              <CardActions sx={{textAlign:'center',}}>    
                   <button style={{
                       background: 'linear-gradient(45deg,#2c3e50, #3498db )',
                       border: 0,
                       borderRadius: 3,
                       boxShadow: '0 3px 5px 2px rgba(77, 58, 173, 0.3)',
                       color: 'white',
                       height: 40,
                       fontWeight:'b0lder',
                       fontSize:'16px',
                       width:'15%',
                       padding: '0 30px',
                       margin:'5px auto'

                   }} type='submit' onClick={toggleCard} name="Submit">Submit</button>
                     {submit&& (
        <CardDemo
          onClose={toggleCard}
          title="Response Panel"
          content=""
          data={initialFormData}
        />
      )}
                   </CardActions> 
    </Card>
)
}

export default UploadCardComponent