import React, { useRef, useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from '@mui/material/IconButton';
// import PublishIcon from '@mui/icons-material/Publish';
// import { Icon } from '@mui/material';
// import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Typography from "@mui/material/Typography";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddTaskForm = () => {
    // const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]

    // const imgRef = useRef(null)

    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    return (
        <Container>
            <Formik
                initialValues={{
                    title: '',
                    // taskImage: null,
                    status: '',
                    content: '',
                    date: null
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Title is Required'),
                    // taskImage: Yup.mixed()
                    //     .nullable()
                    //     .required('Image is required')
                    //     .test(
                    //         "FILE_FORMAT",
                    //         "invalid format",
                    //         (value) => {
                    //             if (!value) {
                    //                 return true
                    //             }
                    //             return value && SUPPORTED_FORMATS.includes(value?.type)
                    //         }
                    //     ),
                    status: Yup.string()
                        .required('Status Name is Required'),
                    content: Yup.string()
                        .required('Content is Required'),
                    date: Yup.date().required("Date is Required"),
                })}
                onSubmit={(values, actions) => {

                    //Given variable containing the date object
                    const dateObj = values.date.$d;

                    // Subtract one day from the date
                    dateObj.setDate(dateObj.getDate() - 1);

                    // Extract year, month, and day
                    const year = dateObj.getFullYear();
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const day = values.date.$D;

                    // Formatted date string
                    const formattedDate = `${year}-${month}-${day}`;


                    const formData = new FormData();

                    // Append data to the FormData object
                    formData.append('title', values.title);
                    formData.append('status', values.status);
                    formData.append('publication_date', formattedDate);
                    formData.append('content', values.content);
                    // formData.append('image_path', values.taskImage);

                    //Make a POST request using Axios
                    axios.post("http://localhost:8000/tasks", formData).then((res) => {
                        setToggle(!toggle)
                        actions.resetForm()
                        setOpen(true);
                    }).catch((err) => {
                        setError(true)
                        setOpen(true);

                    })
                }}
            >
                {props => (
                    <Form>
                        <Box
                            sx={{ "& > :not(style)": { mt: 2, width: "100%" } }}
                        >
                            <Typography
                                variant="subtitle2"
                                component="h6"
                                sx={{
                                    textAlign: "left",
                                    fontFamily: "Proxima-Nova",
                                    fontWeight: 500,
                                    color: "#858585",
                                    marginTop: 0,
                                    marginBottom: -1.2
                                }}>
                                Title*
                            </Typography>

                            <TextField
                                sx={{ width: "100%" }}
                                id="title"
                                name="title"
                                onChange={props.handleChange}
                                value={props.values.title}
                                error={props.touched.title && Boolean(props.errors.title)}
                                helperText={props.touched.title && props.errors.title}
                                variant="outlined"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Box>

                        {/* <Box
                            sx={{ "& > :not(style)": { mt: 2, width: "100%" } }}
                            noValidate
                        >
                            <Typography
                                variant="subtitle2"
                                component="h6"
                                sx={{
                                    textAlign: "left",
                                    fontFamily: "Proxima-Nova",
                                    fontWeight: 500,
                                    color: "#858585",
                                    marginTop: 0,
                                    marginBottom: -1.2
                                }}>
                                Upload Image *
                            </Typography>
                            <TextField
                                required
                                sx={{ width: "100px" }}
                                id="taskImage"
                                value={props.values.taskImage?.name}
                                variant="outlined"
                                autoComplete="off"
                                disabled
                                error={props.touched.taskImage && Boolean(props.errors.taskImage)}
                                helperText={props.touched.taskImage && props.errors.taskImage}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <TextField
                                                style={{
                                                    display: "none"
                                                }}
                                                type="file"
                                                inputProps={{
                                                    multiple: true,
                                                    accept: "image/png, image/jpeg",
                                                }}
                                                inputRef={imgRef}
                                                onChange={() => props.setFieldValue("taskImage", imgRef.current.files[0])}
                                            />
                                            <IconButton aria-label="upload" onClick={() => imgRef.current?.click()}>
                                                <PublishIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <Typography variant="caption" display="block" gutterBottom>
                                <Icon component={InfoIcon} style={{ marginRight: "5px" }}></Icon>Only Png and JPEG Images are supported
                            </Typography>
                        </Box> */}

                        <Box
                            sx={{ "& > :not(style)": { mt: 2, width: "100%" } }}
                            noValidate
                        >
                            <Typography
                                variant="subtitle2"
                                component="h6"
                                sx={{
                                    textAlign: "left",
                                    fontFamily: "Proxima-Nova",
                                    fontWeight: 500,
                                    color: "#858585",
                                    marginTop: 0,
                                    marginBottom: -1.2
                                }}>
                                Status *
                            </Typography>

                            {/* <TextField
                                sx={{ width: "100px" }}
                                id="status"
                                name="status"
                                onChange={props.handleChange}
                                value={props.values.status}
                                variant="outlined"
                                error={props.touched.status && Boolean(props.errors.status)}
                                helperText={props.touched.status && props.errors.status}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            /> */}
                            <Select
                                name='status'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // style={{ width: 258 }}
                                sx={{ width: "100px" }}
                                onChange={props.handleChange}
                                value={props.values.status}
                            >
                                <MenuItem value={"Pending"}>Pending</MenuItem>
                                <MenuItem value={"Publish"}>Completed</MenuItem>
                            </Select>
                        </Box>

                        <Box
                            sx={{ "& > :not(style)": { mt: 2, width: "100%" } }}
                            noValidate
                        >
                            <Typography
                                variant="subtitle2"
                                component="h6"
                                sx={{
                                    textAlign: "left",
                                    fontFamily: "Proxima-Nova",
                                    fontWeight: 500,
                                    color: "#858585",
                                    marginTop: 0,
                                    marginBottom: -1.2
                                }}>
                                Date *
                            </Typography>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    inputFormat="MM/DD/YYYY"
                                    value={props.values.date}
                                    onChange={value => props.setFieldValue("date", value)}
                                    textField={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                            <ErrorMessage name="date">
                                {msg => <div style={{ color: '#d32f2f', fontSize: "0.75rem", fontWeight: 400, marginLeft: '14px', marginTop: "3px" }} >{msg}</div>}
                            </ErrorMessage>
                        </Box>

                        <Box
                            sx={{ "& > :not(style)": { mt: 2, width: "100%" } }}
                            noValidate
                        >
                            <Typography
                                variant="subtitle2"
                                component="h6"
                                sx={{
                                    textAlign: "left",
                                    fontFamily: "Proxima-Nova",
                                    fontWeight: 500,
                                    color: "#858585",
                                    marginTop: 0,
                                    marginBottom: -1.2
                                }}>
                                Content *
                            </Typography>

                            <TextareaAutosize
                                aria-label="minimum height"
                                id="content"
                                name='content'
                                minRows={4}
                                onChange={props.handleChange}
                                value={props.values.content}
                            />
                            <ErrorMessage name="content">
                                {msg => <div style={{ color: '#d32f2f', fontSize: "0.75rem", fontWeight: 400, marginLeft: '14px', marginTop: "3px" }} >{msg}</div>}
                            </ErrorMessage>
                        </Box>
                        <Box
                            sx={{
                                mt: 2,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                            >
                                Create Task
                            </Button>
                        </Box>
                    </Form>
                )}
            </Formik>
            <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={() => setOpen(false)} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                    {error ? 'Error!' : 'The Task has been sucessfully added'}
                </Alert>
            </Snackbar>
        </Container>
    )
}

export default AddTaskForm