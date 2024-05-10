import React, { useRef } from 'react'
import Typography from '@mui/material/Typography';
import InputAdornment from "@mui/material/InputAdornment";
import Button from '@mui/material/Button';
import Box from "@mui/material/Box";
import axios from 'axios'
import { Formik, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import PublishIcon from '@mui/icons-material/Publish';
// import { Icon } from '@mui/material';
// import InfoIcon from '@mui/icons-material/Info';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import PropTypes from 'prop-types';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    }
}));

const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};


const EditModel = ({ open, setOpen, taskData }) => {

    // const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"]
    // const imgRef = useRef(null)

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                PaperProps={{ sx: { mt: 5, minWidth: 700 } }}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {taskData.title}
                </BootstrapDialogTitle>
                <Formik
                    initialValues={{
                        title: taskData ? taskData.title : '',
                        // taskImage: taskData ? taskData.image_path : null,
                        status: taskData ? taskData.status : '',
                        content: taskData ? taskData.content : '',
                        date: null,
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

                        //Make a PUT request using Axios
                        axios.put(`http://localhost:8000/tasks/${taskData.id}`, formData).then((res) => {
                            actions.resetForm()
                            setOpen(false);
                        }).catch((err) => {
                        })
                    }}
                >
                    {props => (
                        <Form>
                            <DialogContent style={{ minwidth: '700px' }} dividers>
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
                            </DialogContent>
                            <div style={{ margin: '15px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Button autoFocus onClick={handleClose} variant='contained' color="error">
                                        Close
                                    </Button>
                                    {props.dirty &&
                                        <Button onClick={props.submitForm} variant='contained' >
                                            Save
                                        </Button>
                                    }
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </BootstrapDialog>
        </>
    )
}

export default EditModel