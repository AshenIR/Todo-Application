import React, { useState } from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Typography from "@mui/material/Typography";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from "axios";

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddTaskForm = () => {

    const [toggle, setToggle] = useState(false);
    const [open, setOpen] = React.useState(false);
    const [error, setError] = React.useState(false);

    return (
        <Container>
            <Formik
                initialValues={{
                    title: '',
                    status: '',
                    content: ''
                }}
                validationSchema={Yup.object({
                    title: Yup.string()
                        .required('Title is Required'),
                    status: Yup.string()
                        .required('Status Title is Required'),
                    content: Yup.string()
                        .required('Content is Required'),
                })}
                onSubmit={(values, actions) => {

                    const body = {
                        Title: values.title,
                        Status: values.status,
                        Description: values.content
                    }

                    //Make a POST request using Axios
                    axios.post("https://localhost:7034/api/Todo", body).then((res) => {
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
                                <MenuItem value={"Completed"}>Completed</MenuItem>
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