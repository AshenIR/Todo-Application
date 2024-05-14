import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Tooltip from '@mui/material/Tooltip';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function TaskCard({ task, setTaskData, setOpen, setIsDelete }) {
    const navigate = useNavigate()

    const handleClickOpen = () => {
        setOpen(true);
        setTaskData(task)
    };

    const handleDeleteModel = () => {
        setIsDelete(true)
        setTaskData(task)
    }

    return (
        <>
            <Card sx={{ maxWidth: 345, mx: 'auto' }}>
                <CardActionArea onClick={() => navigate(`/viewtask/${task.id}`)}>
                    <CardHeader
                        title={task.title}
                    />
                    <CardContent>
                        <Typography variant="body1" color="#EFA491">
                            Status - {task.status}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions >
                    <Tooltip title="View">
                        <IconButton sx={{ bgcolor: '#ABA7A6' }} onClick={() => navigate(`/viewtask/${task.id}`)}>
                            <VisibilityIcon  />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                        <IconButton onClick={handleClickOpen} sx={{ bgcolor: '#757ce8' }} >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDeleteModel} sx={{ bgcolor: 'red' }} >
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>

                </CardActions>
            </Card>
        </>

    );
}