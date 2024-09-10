import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import useStore from '../store/index.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Cards({ title, description, tags, city, postedDate, salaryLow, salaryHigh, yrsXPExpected, active, remote }) {
  const { isAuthenticated } = useStore();
  const [open, setOpen] = useState(false);

  const clickNonLogin = () => {
    toast.error("You must login too see details!")
  }

  const handleClickOpen = () => {
    if (isAuthenticated) {
      setOpen(true);
    } else {
      clickNonLogin();
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Card variant="outlined" sx={{ maxWidth: 560, minHeight: 500, marginBottom: '20px' }}>
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ flexDirection: 'column' }}
          >
            <Typography gutterBottom variant="h5" component="div" sx={{ display: 'flex', justifyContent: 'center' }}>
              {title}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={2} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <>
                <Chip label={tag} size="small" />
              </>
            ))}
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          {isAuthenticated ? <Button onClick={handleClickOpen} variant="contained">
            Learn More
          </Button> : <Button onClick={clickNonLogin} variant="contained">Learn More</Button>}
        </Box>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Job Details:</Typography>
          <Typography variant="h6">City: {city}</Typography>
          <Typography variant="body2" color="text.secondary">
            Posted Date: {new Date(postedDate).toLocaleDateString()}
          </Typography>
          <Typography variant="body1">
            Salary: {salaryLow}$ - {salaryHigh}$
          </Typography>
          <Typography variant="body1">
            Required YoE: {yrsXPExpected} years or higher
          </Typography>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            {description}
          </Typography>
          <Typography variant="h6">Skills: </Typography>
          <Stack direction="row" spacing={1} sx={{ marginTop: 2, display: 'flex', flexWrap: 'wrap' }}>
            {tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Cards