import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    AppBar,
    Button,
    Tab,
    Tabs,
    Grid,
    // IconButton,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
// import MenuIcon from "@material-ui/icons/Menu";
import UserProvider from "../contexts/UserProvider";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBottom: "2rem",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const userCtx = React.useContext(UserProvider.context);
    const [activeTab, setActiveTab] = useState(0);

    React.useEffect(() => {
        switch (window.location.pathname) {
            case "/":
                if (activeTab !== 0) setActiveTab(0);
                break;
            case "/login":
                if (activeTab !== 1) setActiveTab(1);
                break;
            case "/signup":
                if (activeTab !== 2) setActiveTab(2);
                break;

            default:
                break;
        }
    }, [activeTab]);

    const userNotLoggedIn = (
        <Tabs value={activeTab} onChange={(event, activeTab) => setActiveTab(activeTab)}>
            <Tab
                // className={classes.tab}
                label="Home"
                component={RouterLink}
                to="/"
            />
            <Tab
                // className={classes.tab}
                style={{ marginLeft: "auto" }}
                label="Log in"
                component={RouterLink}
                to="/login"
            />
            <Tab
                // className={classes.tab}
                label="Sign up"
                component={RouterLink}
                to="/signup"
            />
        </Tabs>
    );

    const userLoggedIn = (
        <Tabs value={0} onChange={(event, activeTab) => setActiveTab(activeTab)}>
            <Tab
                // className={classes.tab}
                label="Home"
                component={RouterLink}
                to="/"
            />
        </Tabs>
    );

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Grid container>
                    <Grid item>{userCtx.user ? userLoggedIn : userNotLoggedIn}</Grid>
                    {userCtx.user ? (
                        <Grid item style={{ marginLeft: "auto" }}>
                            <Button
                                color="inherit"
                                onClick={() => {
                                    userCtx.logout();
                                    setActiveTab(0);
                                }}
                                style={{
                                    // textTransform: "none",
                                    height: "100%",
                                    // paddingLeft: "0.6rem",
                                    marginRight: "2rem",
                                    borderRadius: 0,
                                }}
                            >
                                Log out
                            </Button>
                        </Grid>
                    ) : null}
                </Grid>
            </AppBar>
        </div>
    );
}
