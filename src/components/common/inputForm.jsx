import React, { useState } from "react";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Swal from "sweetalert2";
import { Stack } from "@mui/material";
import ReactFileReader from 'react-file-reader';
import { handleFileUpload } from "./utils/inputFormUtils";
import * as Constants from "./utils/Constants";

// Input form function to get short name, start/end dates, boundary coordinates, concept id
export function InputForm(props) {
    
    const [isSubmit, setIsSubmit] = useState(true);
    const [jobid, setJobid] = useState('');
    const [name, setName] = useState("GPM_3IMERGDF");
    const [boundaryCoordinates, setBoundaryCoordinates] = useState({
        Xmin: -180.0,
        Ymin: -90.0,
        Xmax: 180.0,
        Ymax: 90.0
    });
    const default_dates = {
        dateRange1: "2022-11-19",
        dateRange2: "2022-11-30"
    };

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    }

    const validationSchema = Yup.object().shape({
        shortName: Yup.string().required('ShortName is required'),
        dateRange1: Yup.date()
            .typeError("Please enter a valid start date")
            .required(),
        dateRange2: Yup.date().typeError("Please enter a valid end date")
            .min(Yup.ref('dateRange1') || new Date(), ({ min }) => `Date needs to be after ${formatDate(min)}!!`)
            .required("Please enter a valid end date"),
        Xmin: Yup.number().required('Xmin is required'),
        Ymin: Yup.number().required('Ymin is required'),
        Xmax: Yup.number().required('Xmax is required'),
        Ymax: Yup.number().required('Ymax is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const onSubmit = (formData) => {
        setIsSubmit(false);
        console.log("Submitted: ", isSubmit);
        const url = new URL('http://localhost:8000/start_download');
        url.searchParams.append('short_name', formData.shortName);
        url.searchParams.append('date_range', formatDate(formData.dateRange1));
        url.searchParams.append('date_range', formatDate(formData.dateRange2));
        url.searchParams.append('bounding_box', boundaryCoordinates.Xmin);
        url.searchParams.append('bounding_box', boundaryCoordinates.Ymin);
        url.searchParams.append('bounding_box', boundaryCoordinates.Xmax);
        url.searchParams.append('bounding_box', boundaryCoordinates.Ymax);
        url.searchParams.append('isPangeoForge', props.jobType === Constants.type_pangeoforge);

        fetch(url.toString(), {
            method: 'PUT',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            })
            .then(data => {
                setJobid(data);
                props.getJobid(data);
                Swal.fire({
                    title: `Form submitted successfully! Job ID: ${data}`,
                    text: "Navigate to status?",
                    showConfirmButton: true,
                    confirmButtonText: "OK",
                    showCancelButton: true,
                    cancelButtonText: "Cancel",
                    icon: "success"
                }).then((result) => {
                    if (result.isConfirmed) {
                        props.selectTab(1);
                    }
                });

                //setting local storage with empty status as the job is created
                localStorage.setItem(data, JSON.stringify({ shortName: formData.shortName, jobType: props.jobType, timestamp: new Date().getTime(), status: [] }));
            })
            .catch(error => {
                Swal.fire({
                    title: error,
                    text: 'Failed to submit form. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            });
    };

    const handleFiles = (files) => {
        handleFileUpload(files, setBoundaryCoordinates);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBoundaryCoordinates({ ...boundaryCoordinates, [name]: value });
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
                                {...register("shortName")}
                                value={name}
                                onChange={(event) => { setName(event.target.value) }}
                                error={!!errors.shortName}
                                helperText={errors?.shortName?.message}></TextField>
                        </Grid>
                        <Grid container item spacing={-13}>
                            <Grid item xs={3}>
                                <TextField type="date"
                                    name="dateRange1"
                                    label="Start date"
                                    variant="outlined"
                                    size='small'
                                    defaultValue={default_dates.dateRange1}
                                    {...register("dateRange1")}
                                    error={!!errors.dateRange1}
                                    helperText={errors?.dateRange1?.message}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField type="date"
                                    name="dateRange2"
                                    label="End date"
                                    variant="outlined"
                                    size='small'
                                    defaultValue={default_dates.dateRange2}
                                    {...register("dateRange2")}
                                    error={!!errors.dateRange2}
                                    helperText={errors?.dateRange2?.message}></TextField>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={-14}>
                            <Grid item xs={3}>
                                <TextField label="Bounding Box (Xmin)"
                                    name="Xmin"
                                    variant="outlined"
                                    size='small'
                                    {...register("Xmin")}
                                    value={boundaryCoordinates.Xmin}
                                    onChange={handleInputChange}
                                    error={!!errors.Xmin}
                                    helperText={errors?.Xmin?.message}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label="Bounding Box (Ymin)"
                                    name="Ymin"
                                    variant="outlined"
                                    size='small'
                                    {...register("Ymin")}
                                    value={boundaryCoordinates.Ymin}
                                    onChange={handleInputChange}
                                    error={!!errors.Ymin}
                                    helperText={errors?.Ymin?.message}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label="Bounding Box (Xmax)"
                                    name="Xmax"
                                    variant="outlined"
                                    size='small'
                                    {...register("Xmax")}
                                    value={boundaryCoordinates.Xmax}
                                    onChange={handleInputChange}
                                    error={!!errors.Xmax}
                                    helperText={errors?.Xmax?.message}></TextField>
                            </Grid>
                            <Grid item xs={3}>
                                <TextField label="Bounding Box (Ymax)"
                                    name="Ymax"
                                    variant="outlined"
                                    size='small'
                                    {...register("Ymax")}
                                    value={boundaryCoordinates.Ymax}
                                    onChange={handleInputChange}
                                    error={!!errors.Ymax}
                                    helperText={errors?.Ymax?.message}></TextField>
                            </Grid>
                        </Grid>
                        <Grid container item spacing={4}>
                            <Grid item xs={4}>
                                <TextField label="Concept id" name="Concept id" variant="outlined" size='small'></TextField>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Stack spacing={2} direction="row" justifyContent="center" paddingTop={3}>
                        <ReactFileReader handleFiles={handleFiles} fileTypes={'.geojson'}>
                            <Button variant="contained" color="primary">
                                Upload GeoJson File
                            </Button>
                        </ReactFileReader>
                        <Button type="submit" variant='contained'>Submit</Button>
                    </Stack>
                </form>
            </Box>
        </React.Fragment>
    )
}