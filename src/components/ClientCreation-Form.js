import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import { Typography } from '@mui/material'
import { makeStyles } from '@material-ui/styles';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import Switch from '@mui/material/Switch';
import { Box, Tab, Grid, TextField, Button, MenuItem, Menu, FormControl } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { KeyboardArrowDownRounded as KeyboardArrowDownRoundedIcon,
    AddRounded as AddRoundedIcon,
} from '@mui/icons-material';
import '../styles/FormStyle.css'
import UseForm from './Create-UseForm';
import { useSelector } from 'react-redux';


const useStyles = makeStyles({  
    formControl: {
        width: '100%'
    }

})

function CreateForm(){

    const classes = useStyles()

    async function fetchData() {
        const response = await fetch('http://localhost:4000/countries');
        const data = await response.json();
        setCountries(data)
    }

    useEffect(()=>{
        fetchData()
    },[])

    const [countries,setCountries] = useState({})
    const loc = useSelector(state => state.getaddress);
    console.log(loc,"locccccccccc")

    

    const {
        fields,
        formData,
        value,
        setformvalue,
        contacts,
        setValue,
        open,
        handleClick,
        anchorEl,
        handleClose,
        n,
        handleOthers,
        addOthers,
        handleAddOthers,
        handleSaveBtn,
        errors,
        submitForm,
        addressFields,
        handelCountry,
        handelAddressOnBlur,
    } = UseForm();


    const contactFields = fields.map(field => {
        const data = formData.contacts[value];
        return(
            <Grid item xs={12} sm={6} md={4} key={`${value}.${field.id}`}>
                <TextField 
                    variant="outlined"
                    label={field.label}
                    name={value}
                    id={field.id}
                    value={data[field.id]}
                    onChange={setformvalue}
                    onBlur={setformvalue}
                    fullWidth
                    size="small"
                    autoComplete="none"
                    {...(errors['contacts'][value][field.id] && { error: true, helperText: errors['contacts'][value][field.id] })}
                />
            </Grid>
        );
    });


    //
    const addressField = addressFields.map(field => {
        const gridStyle = field.name === 'addressLine1' || field.name === 'addressLine2' ? 12 : 6
        if (field.name === 'country'){
            return(
                <Grid item xs={12} sm={gridStyle}>
                    <FormControl size="small" className={classes.formControl}>
                        <InputLabel id="country">{field.label}</InputLabel>
                        <Select labelId="country"
                            name={field.name}
                            value={formData[field.name]}
                            label={field.label}
                            onChange={handelCountry}
                            onBlur={handelCountry}
                        >
                            {Object.keys(countries).map((key) => (
                                <MenuItem
                                    key={key}
                                    value={`${countries[key].name}-${countries[key].code}`}
                                >
                                {countries[key].name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }
        
        if (field.name === 'district' && formData.pincode !== '' && Object.keys(loc.loc['districts'])[0].length>1){
            return(
                <Grid item xs={12} sm={gridStyle}>
                    <FormControl size="small" className={classes.formControl}>
                        <InputLabel id="district">{field.label}</InputLabel>
                        <Select labelId="district"
                            name={field.name}
                            value={formData[field.name]}
                            label={field.label}
                            onChange={handelCountry}
                            onBlur={handelCountry}
                        >
                            {console.log("-----",Object.keys(loc.loc['districts']),"-----")}
                            {Object.keys(loc.loc['districts']).map((key) => (
                                <MenuItem
                                    key={key}
                                    value={key}
                                >
                                {key}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }
        
        if (field.name === 'city' && formData.district !== '' && formData.pincode !== '' && loc.loc['districts'][formData['district']] ? loc.loc['districts'][formData['district']].length>1 : false){
            return(
                <Grid item xs={12} sm={gridStyle}>
                    <FormControl size="small" className={classes.formControl}>
                        <InputLabel id="city">{field.label}</InputLabel>
                        <Select labelId="city"
                            name={field.name}
                            value={formData[field.name]}
                            label={field.label}
                            onChange={handelCountry}
                            onBlur={handelCountry}
                        >
                            {loc.loc['districts'][formData['district']].map((dist) => (
                                <MenuItem
                                    key={dist}
                                    value={dist}
                                >
                                {dist}
                                </MenuItem>
                            )) || ""}
                        </Select>
                    </FormControl>
                </Grid>
            );
        }
        return(
            <Grid item xs={12} sm={gridStyle}>
                <TextField
                    label={field.label}
                    variant="outlined"
                    name={field.name}
                    fullWidth
                    size="small"
                    value={formData[field.name]}
                    onChange={(e)=>{setformvalue(e)}}
                    onBlur={handelAddressOnBlur}
                    {...(errors[field.name] && 
                    { error: true, helperText: errors[field.name] })}
                />
                
            </Grid>
        );
    });
//

    const tabs = contacts.map(contact =>
        <Tab key={contact.title} label={contact.label} value={contact.title} sx={{textTransform: 'none'}}/>
    );

    const dropDown = (
        <Grid>
            <FormControl size="small">
                <Button 
                    size="small" 
                    id="othersBtn" 
                    sx={{color: 'gray', borderColor: 'white'}} 
                    variant="outlined"
                    aria-haspopup="true"
                    aria-controls="others"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}
                >
                    <KeyboardArrowDownRoundedIcon sx={{fontSize: "2.5rem"}}/>
                </Button>
                <Menu
                    id='others'
                    sx={{maxHeight: 230, overflow: 'visible'}}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'othersBtn',
                    }}
                >
                    {[...Array(n-3)].map((e, i) => {
                        return(
                            <MenuItem
                                key={i+1}
                                data-label={`Other Contact ${i+1}`}
                                data-title={`otherContact${i+1}`}
                                onClick={handleOthers}
                            >
                            {`Other Contact ${i+1}`}
                            </MenuItem>
                        );
                    })}
                </Menu>
            </FormControl>
        </Grid>
    );

    return(
        <>
            <div className="FormContainer">
                
                <div className="form-header">
                    <h2>
                        Client Information
                    </h2>
                    
                    <div className="header-end">
                        <div>
                            <p>Edit mode</p>
                            <Switch defaultChecked color="success" />
                        </div>
                    </div>
                </div>

                <div className="form-body">    
                    <form>
                        <Typography>
                            Legal Name of the entity
                        </Typography>
                        <TextField
                            label="enter designation"
                            variant="outlined"
                            name="designation"
                            value={formData.designation}
                            fullWidth
                            required
                            size="small"
                            onChange={(e)=>{setformvalue(e)}}
                            onBlur={setformvalue}
                            {...(errors.designation && 
                            { error: true, helperText: errors.designation })}
                            
                        />
                        <Grid container spacing={2} >
                                <Grid container item xs={6} direction="column" >            
                                    <div >
                                        <Typography>
                                            Brand Name
                                        </Typography>
                                        <TextField
                                            label="enter name"
                                            variant="outlined"
                                            name="brandname"
                                            fullWidth
                                            required
                                            size="small"
                                            onChange={(e)=>{setformvalue(e)}}
                                            onBlur={setformvalue}
                                            {...(errors.brandname && 
                                            { error: true, helperText: errors.brandname })}
                                        />
                                    </div>

                                    <div >
                                    <Typography>
                                        Base Location
                                    </Typography>
                                    <TextField
                                        label="enter location"
                                        variant="outlined"
                                        name="baselocation"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e)=>{setformvalue(e)}}
                                        onBlur={setformvalue}
                                        {...(errors.baselocation && 
                                        { error: true, helperText: errors.baselocation })}
                                    />
                                </div>     
                                </Grid>

                            <Grid container item xs={6} direction="column" >                        
                                
                                <div >
                                    <Typography>
                                        Domain/Sector
                                    </Typography>
                                    <TextField
                                        label="enter domain/sector"
                                        variant="outlined"
                                        name="domain"
                                        fullWidth
                                        required
                                        size="small"
                                        onChange={(e)=>{setformvalue(e)}}
                                        onBlur={setformvalue}
                                        {...(errors.domain && 
                                        { error: true, helperText: errors.domain })}
                                    />
                                </div>

                                <div >
                                    <Typography>
                                        Active Client
                                    </Typography>
                                    <Box sx={{ minWidth: 120 }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="label">Select a Client name</InputLabel>
                                        <Select
                                        name="clientname"
                                        onChange={setformvalue}
                                        onBlur={(e)=>{setformvalue(e)}}
                                        {...(errors.clientname && 
                                        { error: true, helperText: errors.clientname })}
                                        size="small"
                                        input={<OutlinedInput label="Select a Client name" />}
                                        >
                                        <MenuItem value={"client 1"}>client 1</MenuItem>
                                        <MenuItem value={"client 2"}>client 2</MenuItem>
                                        <MenuItem value={"client 3"}>client 3</MenuItem>
                                        </Select>
                                    </FormControl>
                                    </Box>
                                </div>
                            </Grid>
                        </Grid>

                        <Typography>
                            Complete address of the company
                        </Typography>
                        
                        <Grid container spacing={2} >    
                        {addressField}
                        </Grid>


                        <a href="/">
                            <Button
                            variant="contained"
                            color="error"
                            id="cancel-btn"
                            >
                            Cancel
                            </Button>
                        </a>
                        
                        { handleSaveBtn() 
                        ? <Button
                        disabled
                        onClick={submitForm}
                        type="submit"
                        variant="contained"
                        color="success"
                        id="save-btn"
                        >
                        Save
                        </Button>

                        : <Button
                        onClick={submitForm}
                        type="submit"
                        variant="contained"
                        color="success"
                        id="save-btn"
                        >
                        Save
                        </Button>
                        }
                        
                    </form>
                
                    <div className="contact-form">
                    <Box sx={{width: '100%', typography: 'body1'}}>
                        <TabContext value={value}>
                            <Box sx={{ borderTop: 2, borderBottom: 2, borderColor: 'divider' }}>
                                <TabList variant='scrollable' onChange={(e, newValue) => setValue(newValue)}>
                                    {tabs}
                                    {n>4? dropDown : <></>}
                                    <Grid container>
                                        <Button
                                            id="addOthersBtn" 
                                            sx={{color: 'gray', borderColor: 'white'}} 
                                            variant={!addOthers?"contained":"outlined"}
                                            onClick={handleAddOthers}
                                            disabled={!addOthers}
                                        >
                                            <AddRoundedIcon sx={{fontSize: "2rem"}} />
                                        </Button>
                                    </Grid>
                                </TabList>
                            </Box>
                            <TabPanel value={value}>
                                <Grid container spacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                    {contactFields}
                                </Grid>
                            </TabPanel>
                        </TabContext>
                    </Box> 
                    </div>
                
                </div>

            </div>
        </>
    )
}

export default CreateForm
