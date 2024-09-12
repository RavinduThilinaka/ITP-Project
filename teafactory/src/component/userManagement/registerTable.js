import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button, styled } from '@mui/material';
import { red, blue } from '@mui/material/colors';
import Register from './register';
import  axios from "axios";
import { useEffect, useState } from "react";


// Styled components using MUI's styled utility
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  backgroundColor: '#222',
  borderRadius: theme.shape.borderRadius,
  
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  cursor:'pointer'
 
}));



const RegisterTable = ({selectedUser,deleteUser,rows}) => {
    
   
    return (
        <StyledTableContainer component={Paper}>
        <Typography variant="h6" component="div" style={{ padding: 16 }} sx={{textAlign:"center", fontFamily:"uppercase"}}>
          Nutrition Information
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="right">Email</StyledTableCell>
              <StyledTableCell align="right">Gender&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="right">password&nbsp;(g)</StyledTableCell>
              <StyledTableCell align="center">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
            
            rows && rows.length>0 ?rows.map(row => (
              <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:hover': { backgroundColor:"#333",cursor:"pointer" }}}>
                <TableCell align="right" sx={{color:"silver"}}>{row.name}</TableCell>
                <TableCell align="right" sx={{color:"#fff"}}>{row.email}</TableCell>
                <TableCell align="right" sx={{color:"silver"}}>{row.gender}</TableCell>
                <TableCell align="right" sx={{color:"#fff"}}>{row.password}</TableCell>

                <TableCell align="center" >
                    <Button variant="contained" sx={{ backgroundColor: blue[500], '&:hover': { backgroundColor:blue[700] }, color: '#fff' }} onClick={()=>selectedUser({name: row.name, email: row.email,gender:row.gender,password:row.password})}>Update</Button>
                    <Button variant="contained" sx={{ backgroundColor: red[500], '&:hover': { backgroundColor: red[700] }, color: '#fff',marginLeft:"5px" }}> Delete</Button>
                </TableCell>
              </TableRow>
            )):(
                <TableRow sx={{'&:last-child td, &:last-child th' :{border:0}}}>
                    <TableCell component='th' scope="row">No data</TableCell>
                </TableRow>
            )}
          </TableBody>
        </Table>
      </StyledTableContainer>
        
    );
}

export default RegisterTable;