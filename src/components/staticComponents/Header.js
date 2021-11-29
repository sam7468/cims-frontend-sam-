import React, { useState, useEffect } from "react";
import { AppBar,
        Toolbar,
        FormControl,
        TextField,
        IconButton,
        Drawer,
        Typography} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { HomeRounded as HomeRoundedIcon,
         ArrowBackRounded as ArrowBackRoundedIcon,
         ArrowForwardRounded as ArrowForwardRoundedIcon,
         SearchRounded as SearchRoundedIcon,
         MenuRounded as MenuRoundedIcon} from '@mui/icons-material';

const useStyles = makeStyles({
    root: {
        marginLeft: 'auto',
    }
});

export default function Header() {
    const iconStyle = {color: 'gray', fontSize: '2.5rem', margin: '0.5rem auto'};
    const menuStyle = {color: 'gray', fontSize: '2.5rem', margin: '0.5rem 1.5rem'};
    const searchStyle = {color: 'gray', fontSize: '2.5rem'};
    const [searchText, setSearchText] = useState("");
    const [state, setState] = useState({
        mobileView: false,
        drawerOpen: false
    });

    const classes = useStyles();
    
    const { mobileView, drawerOpen } = state;
    
    useEffect(() => {
        const setResponsiveness = () => {
          return window.innerWidth < 768
            ? setState((prevState) => ({ ...prevState, mobileView: true }))
            : setState((prevState) => ({ ...prevState, mobileView: false }));
        };
    
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
    
        return () => {
          window.removeEventListener("resize", () => setResponsiveness());
        }
    }, []);


    const leftMenu = (
        <div>
                <HomeRoundedIcon sx={iconStyle} />

        </div>
    );

    const rightMenu = (
        <div className={classes.root}>
            <form>
                <FormControl>
                    <Typography variant="body1" align="center" mt={2} mr={1}>
                        Username
                    </Typography>
                </FormControl>
                <FormControl sx={{width: 160}}>
                    <TextField
                        label="enter user name"
                        variant="outlined"
                        size="small"
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        margin="dense"
                    />
                </FormControl>
                <IconButton
                type="submit"
                >
                <SearchRoundedIcon sx={searchStyle} />
                </IconButton>
            </form>
        </div>
    );

    const displayDesktop = () => {
        return (
            <Toolbar className="toolbar">
                {leftMenu}
                {rightMenu}
            </Toolbar>
        );
    };

    const displayMobile = () => {
        const handleDrawerOpen = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: true }));
        const handleDrawerClose = () =>
            setState((prevState) => ({ ...prevState, drawerOpen: false }));
        return (
          <Toolbar>
            <IconButton
              {...{
                edge: "start",
                color: "inherit",
                "aria-label": "menu",
                "aria-haspopup": "true",
                onClick: handleDrawerOpen,
              }}
            >
              <MenuRoundedIcon sx={menuStyle} />
            </IconButton>
            <Drawer
                {...{
                    anchor: "top",
                    open: drawerOpen,
                    onClose: handleDrawerClose,
                }}
                >
                <div>{rightMenu}</div>
            </Drawer>
            <div>{leftMenu}</div>
            </Toolbar>
        );
    };

    return(
        <header>
            <AppBar color="transparent">
                {mobileView ? displayMobile() : displayDesktop()}
            </AppBar>
        </header>
    );
}