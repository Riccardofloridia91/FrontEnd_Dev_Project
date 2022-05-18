import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function Editcustomer(props) {
  const [open, setOpen] = useState(false);
	const [customer, setCust] = useState({
		firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
	})

  let handleClickOpen = () => {
    fetch(props.link)
    .then(response => response.json())
    .then(data => setCust(data))
    .catch(err=> console.log(err))
    setOpen(true);
  };
    
	let handleClose = () => {
    setOpen(false);
  };

	let handleInputChange=(event)=> {
		setCust({...customer, [event.target.name]: event.target.value})
	}

let updateCustomer = () => {
  props.updateCustomer(customer, props.link);
  handleClose();
}  

	return(
    <div>
	<Button style={{color: 'red'}} startIcon = {<EditIcon />} size="small" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialig-title">
        <DialogTitle id="form-dialog-title">Edit</DialogTitle>
        <DialogContent>

          <TextField
            autoFocus
            margin="dense"
            name="firstname"
			value={customer.firstname}
            label="First Name"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />

			<TextField
            margin="dense"
            name="lastname"
			value={customer.lastname}
            label="Las Name"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />

			<TextField
            margin="dense"
            name="email"
			value={customer.email}
            label="Email"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />
		    <TextField
            margin="dense"
            name="phone"
			value={customer.phone}
            label="Phone"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />

		    <TextField
            margin="dense"
            name="streetaddress"
			value={customer.streetaddress}
            label="Street address"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />

			<TextField
            margin="dense"
            name="postcode"
			value={customer.postcode}
            label="Postcode"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />

          <TextField
            margin="dense"
            name="city"
			value={customer.city}
            label="City"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel editing</Button>
          <Button onClick={updateCustomer}>Save changes</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}