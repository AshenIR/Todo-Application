import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";


const DeleteModel = ({ isDelete, setIsDelete, taskData, setSnackBar, setToggle, toggle, setError }) => {


    const handleClose = () => {
        setIsDelete(false);
    };

    //Delete Request
    const handleDelete = () => {
        axios.delete(`https://localhost:7034/api/Todo/${taskData.id}`).then((res) => {
            setIsDelete(false);
            setSnackBar(true)
            setError(false)
            setToggle(!toggle)
        }).catch((err) => {
            setSnackBar(true)
            setError(true)
        })
    };

    return (
        <React.Fragment>
            <Dialog
                open={isDelete}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    Are you Sure?
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you want to Delete {taskData.title} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>No</Button>
                    <Button color='error' onClick={handleDelete} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    )
}

export default DeleteModel