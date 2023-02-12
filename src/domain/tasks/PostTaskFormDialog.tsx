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
    onClickSubmit: () => void;
    onChangeTitle: (title: string) => void;
};


const PostTaskFormDialog: React.FC<Props> = props => {
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const titleText = event.target.value;
        props.onChangeTitle(titleText);
    }

    return (
        <Dialog open={props.open} onClose={props.onClose}>
            <DialogTitle>Create a Task</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Please enter a title for your task below!
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="title"
                    label="task title"
                    type="title"
                    fullWidth
                    variant="standard"
                    onChange={handleChangeTitle}
                    required
                />
            </DialogContent>
            <DialogActions sx={{ pb: 2 }}>
                <Button variant="contained" onClick={props.onClickSubmit}>Submit</Button>
                <Button variant="contained" onClick={props.onClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
};

export default PostTaskFormDialog;
