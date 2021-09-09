import {
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { SubjectOutlined, AddCircleOutlineOutlined } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router";
import { AppBar, Toolbar } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { format } from "date-fns";
const drawWidth = 240;
const useStyles = makeStyles((theme) => {
    return {

        pages: {
            backgroundColor: "#f9f9f9",
            width: "100%",
            padding: theme.spacing(3)
        },
        drawer: {
            width: drawWidth,
        },
        drawerPaper: {
            width: drawWidth,
        },
        root: {
            display: "flex",
        },
        active: {
            backgroundColor: "#f4f4f4",
        },
        title: {
            padding: theme.spacing(2)
        },
        appBar: {
            width: `calc(100% - ${drawWidth}px)`
        },
        toolbar: theme.mixins.toolbar,
        date: {
            flexGrow: 1
        },
        avatar: {
            marginLeft: theme.spacing(2)
        }
    }
}



);
export default function Layout(props) {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const menuItems = [
        {
            text: "My Notes",
            icon: <SubjectOutlined color="secondary" />,
            path: "/",
        },
        {
            text: "Create Note",
            icon: <AddCircleOutlineOutlined color="secondary" />,
            path: "/create",
        },
    ];
    return (

        <div className={classes.root}>
            <AppBar elevation={0} className={classes.appBar}>
                <Toolbar>
                    <Typography className={classes.date}>
                        Today is the {format(new Date(), 'do MMMM Y')}
                    </Typography>
                    <Typography>
                        Harry
                    </Typography>
                    <Avatar src="/mario-av.png" className={classes.avatar} />
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                anchor="left"
                classes={{ paper: classes.drawerPaper }}
            >
                <div>
                    <Typography className={classes.title} variant="h5">Harry Notes</Typography>
                </div>
                <List>
                    {menuItems.map((item) => (
                        <ListItem
                            button
                            key={item.text}
                            onClick={() => history.push(item.path)}
                            className={location.pathname === item.path ? classes.active : null}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <div className={classes.pages}>
                <div className={classes.toolbar}></div> {props.children}</div>
        </div>
    );
}
