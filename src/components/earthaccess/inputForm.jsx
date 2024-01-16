import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";



export function InputForm(props){

    const [isSubmit, setIsSubmit] = useState(true);
    const [jobid, setJobid] = useState('');


    const [formData, setFormData] = useState({
        shortName: '',
        dateRange1: '',
        dateRange2: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitHandler = (event) => {
        event.preventDefault();
        setIsSubmit(false);
        console.log("Submitted: ", isSubmit);
        const url = new URL('http://localhost:8000/start_download');
        url.searchParams.append('short_name', formData.shortName);
        url.searchParams.append('date_range', formData.dateRange1);
        url.searchParams.append('date_range', formData.dateRange2);

        fetch(url.toString(), {
            method: 'PUT',
        })
        .then( response => response.json() )
        .then( data => {
            setJobid(data);
            console.log(data);
            props.getJobid(data);
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error('Error:', error);
        });
    }

    return (
        <React.Fragment>
            <Box sx={{ p: 3 }}>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={4}>
                    <Grid item xs={3}>
                    <TextField label="Short Name" 
                        name="shortName" 
                        variant="outlined" 
                        size='small' 
                        onChange={(e) => handleInputChange(e)} 
                        value={formData.shortName}></TextField>
                    </Grid>
                    <Grid container item spacing={4}>
                    <Grid item xs={3}>
                        <TextField type="date" 
                            name="dateRange1" 
                            variant="outlined" 
                            size='small' 
                            onChange={handleInputChange} 
                            value={formData.dateRange1}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField type="date" 
                            name="dateRange2" 
                            variant="outlined" 
                            size='small' 
                            onChange={handleInputChange} 
                            value={formData.dateRange2}></TextField>
                        {/* <DateField format="YYYY-MM-DD"></DateField> */}
                    </Grid>
                    </Grid>
                    <Grid container item spacing={4}>
                        <Grid item xs={3}>
                        <TextField label="Bounding Box" name="BoundingBox" variant="outlined" size='small' defaultValue={-180.0}></TextField>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField label="Bounding Box" name="BoundingBox" variant="outlined" size='small' defaultValue={-90.0}></TextField>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField label="Bounding Box" name="BoundingBox" variant="outlined" size='small' defaultValue={180.0}></TextField>
                        </Grid>
                        <Grid item xs={3}>
                        <TextField label="Bounding Box" name="BoundingBox" variant="outlined" size='small' defaultValue={90.0}></TextField>
                        </Grid>
                    </Grid>
                    <Grid container item spacing={4}>
                    <Grid item xs={4}>
                    <TextField label="Concept id" name="Concept id" variant="outlined" size='small'></TextField>
                    </Grid>
                    </Grid>
                    </Grid>
                    <Grid container justifyContent="center">
                    <Box mt={2}>
                    <Button type="submit" variant='contained'>Submit</Button>
                    </Box>
                    </Grid>
                </form>
            </Box>
        </React.Fragment>
    )
}