import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Typography } from "@mui/material";
import '../styles/SidebarStyle.css'

export default function CollapsibleSidebar() {
  const [openTasks, setOpenTasks] = React.useState(false);
  const [openPMO, setOpenPMO] = React.useState(false);
  const [openCMS, setOpenCMS] = React.useState(false);

  const handleClickTasks = () => {
    setOpenTasks(!openTasks);
  };
  const handleClickPMO = () => {
    setOpenPMO(!openPMO);
  };
  const handleClickCMS = () => {
    setOpenCMS(!openCMS);
  };

  return (
    <div className="mui-sidebar-div">
        <List
            sx={{ width: "100%", maxWidth: 220, bgcolor: "background.paper"}}
            component="nav"
            aria-labelledby="nested-list-subheader"
            >
            <ListItemButton className="Listitem">
                <ListItemText primary="My Profile" />
            </ListItemButton>

            <ListItemButton sx={{ marginTop:"13px" }} className="Listitem" onClick={handleClickTasks}>
                <ListItemText primary="Tasks" />
                {openTasks ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openTasks} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton className="Listitem" sx={{ pl: 5 ,fontSize:"30px"}}>
                    <ListItemText primary="Create Profile" />
                </ListItemButton>
                </List>
                <List component="div" disablePadding>
                <ListItemButton className="Listitem" sx={{ pl: 5 }}>
                    <ListItemText primary="Reviews" />
                </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton sx={{ marginTop:"13px" }} className="Listitem">
                <ListItemText primary="Network" />
            </ListItemButton>

            <ListItemButton sx={{ marginTop:"13px" }} className="Listitem">
                <ListItemText primary="Contract Mgmt" />
            </ListItemButton>

            <ListItemButton sx={{ marginTop:"13px" }} className="Listitem" onClick={handleClickPMO}>
                <ListItemText primary="PMO" />
                {openPMO ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openPMO} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton className="Listitem" sx={{ pl: 5 }}>
                    <ListItemText primary="Projects" />
                </ListItemButton>
                </List>
                <List component="div" disablePadding>
                <ListItemButton className="Listitem" sx={{ pl: 5 }}>
                    <ListItemText primary="Create Project" />
                </ListItemButton>
                </List>
                <List component="div" disablePadding>
                <ListItemButton className="Listitem" sx={{ pl: 5 }}>
                    <ListItemText primary="Allocations" />
                </ListItemButton>
                </List>
            </Collapse>

            <ListItemButton sx={{ marginTop:"13px" }} className="Listitem">
                <ListItemText primary="CIMS" />
            </ListItemButton>

            <ListItemButton sx={{ marginTop:"13px" }} className="Listitem" onClick={handleClickCMS}>
                <ListItemText primary="CMS" />
                {openCMS ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCMS} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton className="Listitem" sx={{ pl: 5 }}>
                    <ListItemText primary="POW/SO" />
                </ListItemButton>
                </List>
                <List component="div" disablePadding>
                <ListItemButton className="Listitem" sx={{ pl: 5 }}>
                    <ListItemText primary="Invoicing" />
                </ListItemButton>
                </List>
            </Collapse>
            
            <ListItemButton sx={{ marginTop:"13px" }} className="Listitem">
                <ListItemText primary="R&R" />
            </ListItemButton>
        </List>
    </div>

  );
}

