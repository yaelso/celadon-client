import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


type Props = {
    open: boolean;
    onClose: () => void;
};


const PostChecklistFormDialog: React.FC<Props> = props => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Create a Checklist</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a title and description for your checklist below!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="checklist title"
                    type="title"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="checklist description"
                    type="description"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions sx={{ pb: 2 }}>
                <Button variant="contained">Submit</Button>
                <Button variant="contained" onClick={props.onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostChecklistFormDialog;
