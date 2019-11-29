import React from 'react';
import {makeStyles} from "@material-ui/core/styles";
import {InputLabel, TextField} from "@material-ui/core";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(2, 0),
        padding: theme.spacing(3)
    },
    formControl: {
        display: 'flex',
        flexDirection: 'column'
    },
    formRows: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(1, 0)
    },
    firstRow: {
        width: 'calc(25% - 10px)'
    },
    contact: {
        padding: theme.spacing(2, 2, 0, 0)
    },
    evenRows: {
        width: 'calc(50% - 10px)'
    },
    contactContainer: {
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    divider: {
        margin: theme.spacing(2, 0)
    },
}));

function EducationFields({values}) {
    console.log(values);
    const classes = useStyles();
    return (
       <div className={classes.formRows}>
           <TextField
               className={classes.firstRow}
               required
               label='School Name'
               value={values.schoolName}
               disabled
           />
           <TextField
               className={classes.firstRow}
               required
               label='Subject Studied'
               value={values.subject}
               disabled
           />
           <FormControl className={classes.firstRow}>
               <InputLabel id='graduate-select-label'>Did you graduate?</InputLabel>
               <Select
                   labelId='graduate-select-label'
                   id='graduate-select'
                   value={values.graduate}
                   disabled
               >
                   <MenuItem value={"Yes"}>Yes</MenuItem>
                   <MenuItem value={"No"}>No</MenuItem>
               </Select>
           </FormControl>
           <FormControl className={classes.firstRow}>
               <InputLabel id='received-select-label'>Degree or Diploma</InputLabel>
               <Select labelId='received-select-label' id='received-select' value={values.received} disabled>
                   <MenuItem value={"Diploma"}>Diploma</MenuItem>
                   <MenuItem value={"Degree"}>Degree</MenuItem>
                   <MenuItem value={"Other"}>Other</MenuItem>
               </Select>
           </FormControl>
       </div>
    )
}

export default EducationFields;
