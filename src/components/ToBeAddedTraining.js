import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';


export default function Addtraining(props) {
  const [open, setOpen] = useState(false);
	const [training, setTraining] = useState({
    activity: '', date: '', duration: '', customer: props.link
	})

  const handleClickOpen = () => {
    setOpen(true);
  };
    
	const handleClose = () => {
    setOpen(false);
  };

	const handleInputChange=(event)=> {
		setTraining({...training, [event.target.name]: event.target.value})
	}

	const addTraining = () => {
    training.date = new Date(training.date).toISOString();
    props.saveTraining(training)
    setOpen(true);
	}



	return(
    <div>
			<Button startIcon = {<AddIcon />}  style={{margin:7}} onClick={handleClickOpen}>
        Add 
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialig-title">
        <DialogTitle id="form-dialog-title">Add new Training</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              name="activity"
              value={training.activity}
              label="Activity"
              fullWidth
              variant="standard"
              onChange={e => handleInputChange(e)}
            />
          <TextField
                id="datetime-local"
                type="datetime-local"
                margin="dense"
                name="date"
                value={training.date}
                onChange={handleInputChange}
                fullWidth
              />

		  	<TextField
            margin="dense"
            name="duration"
			      value={training.duration}
            label="Duration in minutes"
            fullWidth
            variant="standard"
		      	onChange={e => handleInputChange(e)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addTraining}>Save new training</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}