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
    const [moisturisingError, setMoisturisingError] = useState('');
    const [errors, setErrors] = useState({});
    const [nameError, setNameError] = useState('');
    const [weightError, setWeightError] = useState('');

    useEffect(()=>{
        if(!submitted){
            const newId = Math.floor(Math.random() * 10000); 
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

    const resetFields = () => {
        setName('');
        setMoisturisingLevel('');
        setWight('');
        setDate('');
        setLeafType('');
        setErrors({});
        setNameError(''); 
        setWeightError(''); // Reset weight error
    };

    const validateMoisturisingLevel = (level) => {
        return level === '' || (Number(level) >= 0 && Number(level) <= 100);
    };

    const handleNameKeyPress = (e) => {
        if (!isValidTextChar(e.key)) {
            e.preventDefault();
            setNameError('You can only use characters and spaces.');
        }
    };

    const handleMoisturisingLevelChange = (e) => {
        const value = e.target.value;
        if (validateMoisturisingLevel(value)) {
            setMoisturisingLevel(value);
            setMoisturisingError('');
        } else {
            setMoisturisingError('Moisturising level must be between 0 and 100.');
        }
    };

    const handleWeightChange = (e) => {
        const value = e.target.value;
        if (Number(value) >= 0) {
            setWight(value);
            setWeightError(''); // Clear error if weight is valid
        } else {
            setWeightError('Weight cannot be a negative number.'); // Set error message for negative weight
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!sName) newErrors.sName = "Supplier Name is required.";
        if (!moisturisingLevel || !validateMoisturisingLevel(moisturisingLevel)) newErrors.moisturisingLevel = "Valid Moisturising Level is required.";
        if (!wight) newErrors.weight = "Weight is required.";
        if (!checkDate) newErrors.checkDate = "Date is required.";
        if (!leafType) newErrors.leafType = "Leaf Type is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            isEdit ? updateQulity({ qId, sName, moisturisingLevel, wight, checkDate, leafType }) : addQulity({ qId, sName, moisturisingLevel, wight, checkDate, leafType });
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
                {errors.sName && <Typography sx={{ color: "red" }}>{errors.sName}</Typography>}
                {nameError && <Typography sx={{ color: "red" }}>{nameError}</Typography>} {/* Display name error */}
        </Grid>
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Moisturising level</Typography>
            <div className="input"><input type="number" placeholder="Enter Moisturising level" value={moisturisingLevel}  onChange={handleMoisturisingLevelChange}></input></div>
            {moisturisingError && <Typography sx={{ color: "red" }}>{moisturisingError}</Typography>}
        </Grid>
       
        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Weight</Typography>
                <div className="input"><input type="number" placeholder="Enter Weight" value={wight} onChange={handleWeightChange} maxLength={6}></input></div>
                {weightError && <Typography sx={{ color: "red" }}>{weightError}</Typography>}
                {errors.weight && <Typography sx={{ color: "red" }}>{errors.weight}</Typography>}
        </Grid>

        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Date</Typography>
                <div className="input"><input type="date" placeholder="Enter Date" value={checkDate} min={getCurrentDate()} onChange={e=>setDate(e.target.value)}></input></div>
                {errors.checkDate && <Typography sx={{ color: "red" }}>{errors.checkDate}</Typography>}
        </Grid>


        <Grid item xs={6} sm={0}>
            <Typography sx={{fontSize:"20px"}}>Leaf type</Typography>
                <div className="input" value={leafType} onChange={e=>setLeafType(e.target.value)}  style={{ fontWeight: "normal" }}><select>
                    <option>-----Select Tea Type----</option>
                    <option value="Hight Qulity">Hight Qulity</option>
                    <option value="Mid Qulity">Mid Qulity</option>
                    <option value="Low Qulity">Low Qulity</option>
                   
                </select></div>
                {errors.leafType && <Typography sx={{ color: "red" }}>{errors.leafType}</Typography>}
        </Grid>

        <Grid>
           <Typography sx={{marginLeft:"42%"}} className="supplierBtn">
           <button onClick={handleSubmit}>
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