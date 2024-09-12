import { useEffect, useState } from "react";

const { Container, Grid, Typography, Button } = require("@mui/material");


const isValidTextChar = (char) => /^[A-Za-z\s]$/.test(char);

const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
};
const QulityForm=({addQulity,submitted,data,isEdit,updateQulity})=>{

    const [qId,setId]=useState(0);
    const [sName,setName]=useState();
    const [moisturisingLevel,setMoisturisingLevel]=useState();
    const [wight,setWight]=useState();
    const [checkDate,setDate]=useState(0);
    const [leafType,setLeafType]=useState();

    useEffect(()=>{
        if(!submitted){
            const newId = Math.floor(Math.random() * 10000); // Example: Random ID between 0 and 9999
            setId(newId);
            setName('');
            setMoisturisingLevel('');
            setWight('');
            setDate('');
            setLeafType('');
        }
    },[submitted])

    useEffect(()=>{
        if(data?.qId && data.qId !==0){

            setId(data.qId);
            setName(data.sName);
            setMoisturisingLevel(data.moisturisingLevel);
            setWight(data.wight);
            setDate(data.checkDate);
            setLeafType(data.leafType);
        }
    },[data])

    const handleNameKeyPress = (e) => {
        if (!isValidTextChar(e.key)) {
            e.preventDefault();
        }
    };
    

    return(
        <Container>
        <Grid
         spacing={1}
         sx={{
            backgroundImage: "url('./image/supplierDashboard.png')",  
           padding: "20px",
           borderRadius: "10px",
           boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
           marginTop:"12px",
           width:"80%",
           borderBottom:"3px solid #131313",
           marginLeft:"100px"
           
          

         }}>
        <Grid>
            <Typography sx={{fontSize:"20px",marginLeft:"40%",color:"#000000",fontWeight:"1000",fontFamily:""}}>
                Quantity Assurence
            </Typography>
        </Grid>
              
        </Grid>

        <Grid 
        spacing={1} 
        sx={{ backgroundImage: "url('./image/TeaLeaf5_Login.png')",  
          backgroundPosition:"center",
          
          padding: "30px",
          borderRadius: "10px",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
          marginTop:"12px",
          width:"80%",
          color:"#222",
         borderBottom:"3px solid #131313",
         marginLeft:"100px"
        }}>
        

        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}} >Supplier Name</Typography>
                <div className="input"><input type="text" placeholder="Enter Supplier Name" onKeyPress={handleNameKeyPress} value={sName} onChange={e=>setName(e.target.value)}></input></div>
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Moisturising level</Typography>
                <div className="input"><input type="number" placeholder="Enter Moisturising level" value={moisturisingLevel} onChange={e=>setMoisturisingLevel(e.target.value)}></input></div>
        </Grid>
       
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Weight</Typography>
                <div className="input"><input type="number" placeholder="Enter Weight" value={wight} onChange={e=>setWight(e.target.value)}></input></div>
        </Grid>

        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Date</Typography>
                <div className="input"><input type="date" placeholder="Enter Date" value={checkDate} min={getCurrentDate()} onChange={e=>setDate(e.target.value)}></input></div>
        </Grid>


        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Leaf type</Typography>
                <div className="input" value={leafType} onChange={e=>setLeafType(e.target.value)}><select>
                    <option>-----Select Tea Type----</option>
                    <option value="Hight Qulity">Hight Qulity</option>
                    <option value="Mid Qulity">Mid Qulity</option>
                    <option value="Low Qulity">Low Qulity</option>
                   
                </select></div>
        </Grid>

        <Grid>
           <Typography sx={{marginLeft:"42%"}} className="supplierBtn">
           <button onClick={()=> isEdit ? updateQulity({qId,sName,moisturisingLevel,wight,checkDate,leafType}) : addQulity({qId,sName,moisturisingLevel,wight,checkDate,leafType})}
                >
                    {
                    isEdit? 'Update' : 'Submit'
                    }
            </button>
           </Typography>
        </Grid>
            
        </Grid>
    </Container>
    );
}

export default QulityForm;