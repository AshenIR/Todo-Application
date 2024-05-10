import React from 'react'
import { Box, Typography } from '@mui/material'

import AddTaskForm from '../Components/AddTaskForm'

const AddTask = () => {
  return (
    <Box sx={{ padding: 5 }}>
      <Box mx="auto" border={"1px solid #f1356d"} maxWidth= 'sm' paddingBottom={3}>
        <Typography mt={2} align='center' color='#f1356d' variant='h5'>Create a Task</Typography>
        <Box mt={4}>
          <AddTaskForm />
        </Box>
      </Box>

    </Box>
  )
}

export default AddTask