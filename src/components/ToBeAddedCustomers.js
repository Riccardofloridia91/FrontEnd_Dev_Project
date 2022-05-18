import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';

export default function Addingcustomer({saveCust}) {
     const [open, setOpen] = useState(false);
	const [customer, setCustomer] = useState({
    firstname: '', lastname: '', streetaddress: '', postcode: '', city: '', email: '', phone: ''
	})

     const handleClickOpen = () => {
    setOpen(true);
  };
    
	const handleCl = () => {
    setOpen(false);
  };

	const handleInputChange=(event)=> {
		setCustomer({...customer, [event.target.name]: event.target.value})
	}

	const addCust = () => {
		saveCust(customer);
		handleCl();
	}

	return(
    <div>
	  <Button startIcon = {<AddIcon />} color='secondary' size="big" style={{margin:7,}} variant="contained" onClick={handleClickOpen}>
        ADD
      </Button>
      <Dialog open={open} onClose={handleCl} aria-labelledby="form-dialig-title">
        <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
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
            label="Last Name"
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
            label="Street Address"
            fullWidth
            variant="standard"
			onChange={e => handleInputChange(e)}
          />

			<TextField
            margin="dense"
            name="postcode"
			value={customer.postcode}
            label="Post Code"
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
          <Button onClick={handleCl}>Cancel</Button>
          <Button onClick={addCust}>Save new customer</Button>
        </DialogActions>
      </Dialog>
    </div>
    )
}