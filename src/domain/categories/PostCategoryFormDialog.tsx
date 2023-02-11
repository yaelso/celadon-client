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


const PostCategoryFormDialog: React.FC<Props> = props => {
    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Create a Category</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a title and description for your category below!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="category title"
                    type="title"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="description"
                    label="category description"
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

export default PostCategoryFormDialog;
