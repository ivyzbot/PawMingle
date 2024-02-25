import {
  Box,
  Button,
  ImageListItem,
  Input,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import { uploadImage } from '../../utilities/helperFuncs';
import { useState, useContext } from 'react';
import { UserContext } from '../../pages/Homepage';
import { useAddPetMutation } from '../../hooks/userHook';

export default function AddPetCard({ open, setOpen }) {
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
          border: '2px solid #000',
          boxShadow: 24,
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
          multiline
          name="petDescription"
          onChange={handleChange}
        />
        <Input
          type="file"
          sx={{ mt: 2, mb: 2 }}
          onChange={handleUpload}
        ></Input>
        <Box>
          <Typography>Image Preview</Typography>
          <ImageListItem>
            <img src={base64 || null} />
          </ImageListItem>
        </Box>
        <Button onClick={handleSubmit}> Add Pet</Button>
      </Box>
    </Modal>
  );
}
