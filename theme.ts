'use client';
import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    background: {
        default: "#F5F5F5",
    },
    secondary: {
        main: "#616161",
        light: "#F5F5F5",
        dark: grey[300],
    },
    primary: {
        main: "#0070B3",
        light: "#0070B3",
        dark: "#395987",
    },
    mode: "light",
},

components: {
    MuiTab: {
        styleOverrides: {
            root: {
                color: "#000000ed",
                fontSize: 12
            },
        }
    },
    MuiLink: {
        styleOverrides: {
            root: {},
        },
    },
    MuiDivider: {
        styleOverrides: {
            root: {
                marginTop: 10,
                marginBottom: 10,
            },
        },
    },
    MuiMenuItem: {
        styleOverrides: {
            root: {
                fontSize: 14,
                fontWeight: 400,
                gap: 8,
                padding: "6px 12px"
            }
        }
    },
    MuiMenuList: {
        styleOverrides: {
            root: {
                padding: "4px 0px"
            }
        }
    },
    MuiList: {
        styleOverrides: {
            root: {
                padding: "4px 0px"
            }
        }
    },

    MuiTextField: {
        styleOverrides: {
            root: {
                borderRadius: 1,
                color: "var(--clr-blue-footer)",
            },
        },
    },
    MuiInputLabel: {
        styleOverrides: {
            root: {
                padding: "6px 0px",
                fontSize: '14px',
                fontWeight: 500,
                color: "#595959"
            },
        },
    },
    MuiPaper: {
        styleOverrides: {
            root: {
                boxShadow: "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 255, 0.05) 0px 0px 0px 1px, rgba(0, 0, 255, 0.1) 0px 10px 15px -3px, rgba(0, 0, 255, 0.05) 0px 4px 6px -2px",
            }
        }
    },
    MuiDataGrid: {
        styleOverrides: {
            root: {
                border: "none"
            },
            columnHeader: {
                backgroundColor: "rgba(107, 174, 222, 0.25)",
                color: "#4A4A4A",
                borderLeft: "1px solid rgba(107, 174, 222,0.3)",
                paddingtop: 2,
                // padding: "10px 12px"
            },
            columnHeaderTitle: {
                fontSize: 14,
                fontWeight: 600,
                color: '#4A4A4A'
            },
            cell: {
                padding: 1
            },
            row: {
                height: 50,
                backgroundColor: "white",
                fontWeight: 400,
                fontSize: 14,
                color: "#4A4A4A",
            }

        },
    },
    // MuiDataGrid: {
    //     styleOverrides: {
    //         root: {
    //             border: "none"
    //         },
    //         columnHeader: {
    //             backgroundColor: "#FAFAFA",
    //             fontWeight: 700,
    //             borderTop: `1.5px solid #ccc `,
    //         },
    //         row: {
    //             height: 50,
    //             fontWeight: 500,
    //             fontSize: 14
    //         }

    //     },
    // },
    // MuiListItemText: {
    //     styleOverrides: {
    //         primary: {
    //             fontSize: 14,
    //             fontWeight: 400,
    //             color: "#212121"

    //         }
    //     }

    // },
    MuiTypography: {
        styleOverrides: {
            caption: {
                fontSize: 14,
                color: "#0070B3",
                fontWeight: 500,
            },
            h4: {
                fontSize: 18,
                fontWeight: 500,
                color: "#0070B3",
            },
            h5: {
                fontSize: 18,
                fontWeight: 600,
                color: "#0070B3",
            },
            h6: {
                color: "#0070B3",
                fontSize: 16,
                fontWeight: "bolder",
                fontStyle: 'normal',
            },
            root: {
                color: "#000000de",
                fontSize: 13.8
            },
            subtitle1: {
                fontSize: 14,
                fontWeight: 500,
                color: "#616161",
            },
            subtitle2: {
                color: '#424242',
                fontWeight: 600,
                fontSize: 14
            },
            body1: {
                color: grey[800],
                fontSize: 15
            },
            paragraph: {

            },
            body2: {
                fontSize: 14,
                fontWeight: 500,
                color: grey[800]
            },
            boldWhite:{
                fontSize: 14,
                fontWeight: 600,
                color: "white"
            },
            timelineTitle: {
                fontSize: 13,
                fontWeight: 700,
                color: "#424242"

            },
            timelineDescription: {
                fontSize: 14,
                fontWeight: 400,
                color: "#616161",
                display: "block"
            },
            timelineTimeStamp: {
                fontSize: 12,
                fontWeight: 400,
                color: "#8C8C8C",
                display: "block"
            },
            integrationsTitle:{
                fontSize: 16,
                fontWeight: 400,
                color: "rgba(0, 0, 0, 0.85)",
                display: "block"

            },
            integrationsDescription:{
                fontSize: 12,
                fontWeight: 400,
                color: "rgba(0, 0, 0, 0.45)",
                display: "block"

            },
            redirect:{
                color:"#0070B3",
                cursor:"pointer"
            },
            facetLabel:{
                color:"rgba(0,0,0,0.85)",
                fontSize:18
            },
            facetListing:{
                color:"rgba(0,0,0,0.85)",
                fontSize:16
            }

        },
    },
},
});

export default theme;
