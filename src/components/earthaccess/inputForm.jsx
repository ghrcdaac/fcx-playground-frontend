import React, { useState, useCallback } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


export function InputForm(props){

    

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString()
    }

    const validationSchema = Yup.object().shape({
        shortName: Yup.string().required('ShortName is required'),
        dateRange1: Yup.date()
                    // .transform(function(value, originalValue) {
                    //     if (this.isType(value)) {
                    //         return value;
                    //       }
                    //     const result = parse(originalValue, "dd/mm/yyyy", new Date());
                    //     return result;
                    // })
                    .typeError("Please enter a valid start date")
                    .required(),
        dateRange2: Yup.date().typeError("Please enter a valid end date")
        .min(Yup.ref('dateRange1') || new Date(), ({ min }) => `Date needs to be after ${formatDate(min)}!!`)
        .required("Please enter a valid end date")
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
      } = useForm({
        resolver: yupResolver(validationSchema)
      });

    const [isSubmit, setIsSubmit] = useState(true);
    const [jobid, setJobid] = useState('');


    // const [formData, setFormData] = useState({
    //     // shortName: 'GPM_3IMERGDF',
    //     // dateRange1: '2019-11-19',
    //     // dateRange2: '2023-04-06'
    //     shortName: '',
    //     dateRange1: '',
    //     dateRange2: ''
    // });

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: value,
    //     }));
    // };

    const onSubmit = (formData) => {
        console.log(formData)
        console.log(formData.shortName)
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

    };

    return (
        <React.Fragment>
            <Box sx={{ p: 3 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={4}>
                    <Grid item xs={3}>
                    <TextField label="Short Name" 
                        id="shortName"
                        name="shortName" 
                        variant="outlined" 
                        size='small' 
                        // onChange={(e) => handleInputChange(e)} 
                        // value={formData.shortName}
                        {...register("shortName")}
                        error={!!errors.shortName}
                        helperText={errors?.shortName?.message}></TextField>
                    </Grid>
                    <Grid container item spacing={4}>
                    <Grid item xs={3}>
                        <TextField type="date" 
                            name="dateRange1" 
                            variant="outlined" 
                            size='small'
                            // onChange={handleInputChange} 
                            // value={formData.dateRange1}
                            {...register("dateRange1")}
                            error={!!errors.dateRange1}
                            helperText={errors?.dateRange1?.message}></TextField>
                    </Grid>
                    <Grid item xs={3}>
                        <TextField type="date" 
                            name="dateRange2" 
                            variant="outlined" 
                            size='small' 
                            // onChange={handleInputChange} 
                            // value={formData.dateRange2}
                            {...register("dateRange2")}
                            error={!!errors.dateRange2}
                            helperText={errors?.dateRange2?.message}></TextField>
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