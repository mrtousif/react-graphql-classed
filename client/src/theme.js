import { createMuiTheme } from "@material-ui/core/styles";
// import blue from "@material-ui/core/colors/blue";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#1976d2",
        },
        secondary: {
            main: "#f50057",
        },
    },
    // typography: {
    // tab: {
    //     textTransform: 'none',
    //     fontWeight: 700,
    //     color: 'white',
    //     fontSize: '1rem',
    // },
    // },
    // overrides: {
    //     MuiInputLabel: {
    //         root: {
    //             color: primaryColor,
    //             fontSize: '1rem',
    //         },
    //     },
    //     MuiInput: {
    //         underline: {
    //             '&:before': {
    //                 borderBottom: `2px solid ${primaryColor}`,
    //             },
    //             '&:hover:not($disabled):not($focused):not($error):before': {
    //                 borderBottom: `2px solid ${primaryColor}`,
    //             },
    //         },
    //     },
    // },
});

export default theme;
