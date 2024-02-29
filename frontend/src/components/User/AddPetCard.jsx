import {
  Box,
  Button,
  ImageListItem,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { uploadImage } from '../../utilities/helperFuncs';
import { useState, useContext } from 'react';
import { UserContext } from '../../pages/Homepage';
import { useAddPetMutation } from '../../hooks/userHook';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function AddPetCard({ open, setOpen, refresh, setRefresh }) {
  const [base64, setBase64] = useState('');
  const [formData, setFormData] = useState({});
  const states = useContext(UserContext);
  // console.log('States: ', states);
  // console.log('Form Data', formData);
  const { mutateAsync: addPet } = useAddPetMutation();

  function handleClose() {
    setOpen(false);
  }

  function handleChange(evt) {
    const { name, value } = evt.target;
    let newFormData = {};
    newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
  }

  async function handleUpload(evt) {
    const imgURL = await uploadImage(evt);
    let newFormData = { ...formData, imgURL: imgURL };
    setFormData(newFormData);
    setBase64(imgURL);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    const bodyToUpdate = { ...formData, userID: states.userID };
    console.log('bodyToUpdate', bodyToUpdate);
    await addPet(bodyToUpdate);
    setRefresh(!refresh);
    setOpen(false);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 0,
          border: '1px solid',
          borderColor: 'grey.main',
          borderRadius: 5,
          p: 4,
        }}
      >
        <TextField
          autoComplete="Pet Name"
          name="petName"
          required
          fullWidth
          id="petName"
          label="Pet Name"
          sx={{ mt: 2, mb: 2 }}
          onChange={handleChange}
          autoFocus
        />
        <TextField
          label="DESCRIPTION"
          placeholder="How's your pet like"
          fullWidth
          multiline
          rows={4}
          name="petDescription"
          onChange={handleChange}
        />
        <Box my={2}>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={handleUpload}
          >
            Upload file
            <VisuallyHiddenInput type="file" />
          </Button>
        </Box>
        <Box>
          <Typography variant="subtitle1" color="#616161" gutterBottom>
            Image Preview
          </Typography>
          <ImageListItem>
            <img src={base64 || null} style={{ borderRadius: '8px' }} />
          </ImageListItem>
        </Box>
        <Button onClick={handleSubmit} variant="outlined">
          Add Pet
        </Button>
      </Box>
    </Modal>
  );
}
