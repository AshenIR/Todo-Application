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
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
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
                        status: taskData ? taskData.status : '',
                        content: taskData ? taskData.description : '',
                    }}
                    validationSchema={Yup.object({
                        title: Yup.string()
                            .required('Title is Required'),
                        status: Yup.string()
                            .required('Status  is Required'),
                        content: Yup.string()
                            .required('Content is Required'),
                    })}
                    onSubmit={(values, actions) => {


                        const formData = new FormData();

                        // Append data to the FormData object
                        formData.append('Title', values.title);
                        formData.append('Status', values.status);
                        formData.append('Description', values.content);

                        //Make a PUT request using Axios
                        axios.put(`https://localhost:7034/api/Todo/${taskData.id}`, formData).then((res) => {
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