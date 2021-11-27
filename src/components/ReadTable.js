import React, { useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@material-ui/core/Button";
import EditIcon from "@mui/icons-material/Edit";
import axios from 'axios'
import '../styles/FormStyle.css'
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux'
import addClientData from "../actions/GetClientData";
import editMode from "../actions/EditModeEnable"
import '../styles/tableStyle.css'
import editModeEnable from "../actions/EditModeEnable";
import editModeDisable from "../actions/EditModeDisable"



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.grey[300],
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 15,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


function CIMSTable() {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [clientsList,setclientsList] = useState([])
  const [clientInfoForm,setClientInfoForm] = useState({})
  useEffect(async()=>{
    await axios.post('http://localhost:4000/login')
    .then(data=>data)
    .then(tokenObject=>{
      console.log(tokenObject.data.Token)
      localStorage.setItem('authorization',tokenObject.data.Token)
    })

    const token = localStorage.getItem('authorization')
    await axios.get('http://localhost:4000/cims', {headers: {
                                                      'authorization': `bearer ${token}`
                                                      }})
    .then(data=>data)
    .then(list=>{
      setclientsList(list.data)
      console.log(list.data)
    })
  },[])

  const editEnablefn = () =>{
    dispatch(editModeEnable())
  }

  const editDisablefn = () =>{
    dispatch(editModeDisable())
  }

  function EditButton (){ 
    return (
      <div>
        <Button  variant="outlined" className="edit-btn" endIcon={<EditIcon color="warning" />}>
          Edit
        </Button>
      </div>
    );
  }

  const handleClientData = async(e) => {
      const clientId = e
      const token = localStorage.getItem('authorization')
      await axios.get('http://localhost:4000/getclientinfo', {headers: {'authorization': `bearer ${token}`,
                                                                         'id':clientId }})
      .then(clientdata=>clientdata)
      .then(clientInfo => {
        dispatch(addClientData(clientInfo.data))
        console.log(clientInfo.data,"from normal comp")})
        navigate(`/clientdetails/${clientId}`)
  } 

  


  return (

    <div className="FormContainer"> {/*//using form container's alignment*/}
        <TableContainer component={Paper} align="right" >
        <Table   sx={{ maxWidth: '100%'}} aria-label="customized table">
            <TableHead>
            <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="left">CompanyUID</StyledTableCell>
                <StyledTableCell align="left">Company Name</StyledTableCell>
                <StyledTableCell align="left">Primary Contact</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {clientsList.map((client,idx) => (
                <StyledTableRow className="table-row" key={client.id}>
                  <StyledTableCell component="th" scope="client">
                      {idx+1}
                  </StyledTableCell>
                  <StyledTableCell onClick={(e) => {editDisablefn()
                     handleClientData(client._id)}} align="left">{client._id}</StyledTableCell>
                  
                  
                  <StyledTableCell onClick={(e) => {editDisablefn()
                  handleClientData(client._id)}} align="left">{client.brandname}</StyledTableCell>
                  
                  
                  <StyledTableCell onClick={(e) => {editDisablefn()
                  handleClientData(client._id)}} align="left">{client.contacts.primaryContact ? client.contacts.primaryContact.title : ""}</StyledTableCell>
                  
                  
                  <StyledTableCell onClick={(e) => {handleClientData(client._id)
                  editEnablefn()}} align="left">{EditButton()}</StyledTableCell>
                </StyledTableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>
  );
 return {
   clientInfoForm
  }
}

export default CIMSTable;