import { Box, Typography, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import TaskCard from '../Components/TaskCard'
import axios from 'axios'
import EditModel from '../Components/EditModel';
import DeleteModel from '../Components/DeleteModel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {

    const [tasks, setTasks] = useState([])
    const [taskData, setTaskData] = useState([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [snackBar, setSnackBar] = useState(false);
    const [error, setError] = useState(false);
    const [toggle, setToggle] = useState(false);

    useEffect(() => {
        // Get Request for fetch all tasks
        function getTasks() {
            setLoading(true)
            axios.get(`https://localhost:7034/api/Todo`).then((res) => {
                setTasks(res.data)
                setLoading(false)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getTasks()
    }, [toggle])

    return (
        <Box sx={{ padding: 5 }}>
            <Typography align='center' color='#f1356d' variant='h4'>Todo List</Typography>
            {loading &&
                <Box sx={{ display: 'flex', justifyContent: 'center', pt: 10 }}>
                    <CircularProgress size={60} />
                </Box>}
            <Grid paddingLeft={5} container spacing={3}>
                {!loading &&
                    (
                        tasks.map((task, index) => (
                            <Grid sx={{ mt: 3 }} item xs={12} md={6} lg={4} >
                                <TaskCard key={index} setOpen={setOpen} task={task}
                                    setTaskData={setTaskData} setIsDelete={setIsDelete} />
                            </Grid>
                        ))
                    )
                }

            </Grid>
            <EditModel open={open} setOpen={setOpen} taskData={taskData} />
            <DeleteModel isDelete={isDelete} setIsDelete={setIsDelete}
                taskData={taskData} setSnackBar={setSnackBar} setToggle={setToggle} toggle={toggle} setError={setError} />
            <Snackbar open={snackBar} autoHideDuration={5000} onClose={() => setSnackBar(false)} anchorOrigin={{
                vertical: "top",
                horizontal: "center"
            }}>

                <Alert onClose={() => setSnackBar(false)} severity={error ? "error" : "success"} sx={{ width: '100%' }}>
                    {error ? 'Error!' : 'The Task has been sucessfully Deleted'}
                </Alert>
            </Snackbar>
        </Box>
    )
}

export default Home