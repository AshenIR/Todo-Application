import React, { useEffect, useState } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';


const ViewTask = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    const [task, setTask] = useState();

    useEffect(() => {
        // Get Request for fetch a task
        function getTask() {
            axios.get(`http://localhost:8000/tasks/${id}`).then((res) => {
                setTask(res.data);
            }).catch((err) => {
                alert(err.message);
            })
        }
        getTask()
    }, [id])

    return (
        <Box padding={3}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <IconButton sx={{ bgcolor: '#f1356d' }} onClick={() => navigate(-1)}><ArrowBackIcon /></IconButton>
                <Typography sx={{ margin: 'auto' }} color='#f1356d' variant='h4'>{task && task.title}</Typography>
            </Box>

            <Box textAlign={"center"} mt={2}>
                {task &&
                <img src={`http://localhost:8000/${task.image_path}`}
                    alt='img' style={{ maxWidth: '40%', height: 'auto' }} />
                }
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
                <Typography variant="body1" color="#EFA491">Publication Date: {task && task.publication_date}</Typography>
                <Typography variant="body1" color="#EFA491">Author: {task && task.author}</Typography>
            </Box>
            <Box sx={{ mt: 2, ml: 4, mr: 4, textAlign: 'center' }}>
                <Typography variant='body2'>{task && task.content}</Typography>

            </Box>

        </Box>
    )
}

export default ViewTask