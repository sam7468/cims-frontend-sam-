import React, { useState } from "react";
import {Button,
        FormControl,
        Grid,
        InputLabel,
        MenuItem,
        Select,
        Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import {Link} from 'react-router-dom'


const useStyles = makeStyles({
    menu: {
        marginTop: '6rem',
        marginRight: '5rem'
    },
    userAdmin: {
        textAlign: 'right',
        paddingRight: '2.5rem',
    },
    buttons: {
        marginTop: '0.5rem',
        marginLeft: '25%',
    },
    cimstext:{
        position:'absolute',
        left:'16%'
    }
});

export default function PageHeader() {
    const [sortBy, setSortBy] = useState("");
    const classes = useStyles();
    const values = ["None",
                    "By ID",
                    "By location",
                    "By start date",
                    "By Status",
                    "By associate name",
                    "By CompanyUID"
                ];
    const handleSortBy = (e) => {
        if (e.target.value==="None") {
            setSortBy("");
        } else {
            setSortBy(e.target.value);
        }
    };

    return(
        <div className={classes.menu}>
            <div className={classes.user}>
                <Typography variant="body1" className={classes.userAdmin}>
                    User-Admin/Approver
                </Typography>
            </div>
            <div className={classes.buttons}>
                <Grid 
                    justifyContent="space-between"
                    container 
                >
                    <Grid item >
                        <Typography variant="h4" className={classes.cimstext}>
                            CIMS
                        </Typography>
                    </Grid>
                    <Grid item>
                        <a href='/createclient'>
                            
                            <Button variant="contained" style={{backgroundColor: 'chocolate'}}>
                                Create a customer
                            </Button>
                        </a>
                        <FormControl size="small" sx={{ minWidth: 120, margin: '0 2.5rem 0 1rem' }}>
                            <InputLabel id="sortBy">sort by</InputLabel>
                            <Select labelId="sortBy"
                                id="select" 
                                value={sortBy}
                                label="sortBy"
                                onChange={handleSortBy}
                            >
                                {values.map((values) => (
                                    <MenuItem
                                        key={values}
                                        value={values}
                                    >
                                    {values}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}