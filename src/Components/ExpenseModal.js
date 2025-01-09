import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { closeModal } from '../Redux/modalSlice'; // Redux aksiyonlarını içe aktar
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";



export default function FormDialog() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.isOpen); // Modal durumunu Redux'tan al
    const [rows, setRows] = useState([{ text: '', amount: '' }]); // Dinamik form satırları için state


    const handleClose = () => {
        dispatch(closeModal()); // Modal'ı kapa
    };

    const handleAddRow = () => {
        setRows([...rows, { text: '', amount: '' }]); // Yeni satır ekle
    };

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index][field] = value;
        setRows(newRows); // İlgili satırı güncelle
    };

    return (
        <React.Fragment>

            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                    sx: {
                        width: '800px', // Dialog genişliği
                        maxWidth: '80%', // Maksimum genişlik (responsive için)
                    },
                }}
            >
                <DialogTitle>Masraf Ekle</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ marginBottom: '20px' }}>
                        Masraf bilgilerinizi buraya giriniz. Girdiğiniz bilgiler kaydedilecektir.
                    </DialogContentText>

                    <Grid container spacing={1} columns={12} >
                        {rows.map((row, index) => (
                            <Grid container spacing={1} columns={10}>

                                <Grid item md={5}>
                                    <TextField
                                        autoFocus
                                        required
                                        id="name"
                                        name="text"
                                        label="Masraf Açıkla"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        value={row.text}
                                        onChange={(e) => handleInputChange(index, 'text', e.target.value)}
                                        inputProps={{

                                            style: { color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#5e5b54', }
                                        }}
                                        InputLabelProps={{
                                            style: { color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#5e5b54', },
                                        }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#5e5b54',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#ffffff',
                                            }, '& .MuiInputLabel-root.Mui-focused': {
                                                color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#ffffff',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item md={5}>
                                    <TextField fullWidth variant="standard"
                                        required
                                        label="Masraf Tutarı"
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*',
                                            style: { color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#5e5b54', }
                                        }}
                                        InputLabelProps={{
                                            style: { color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#5e5b54', },
                                        }}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#5e5b54',
                                            },
                                            '& .MuiInputLabel-root': {
                                                color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#ffffff',
                                            }, '& .MuiInputLabel-root.Mui-focused': {
                                                color: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#ffffff',
                                            },
                                        }}
                                    />
                                </Grid>

                            </Grid>
                        ))}
                        <Grid item md={2}>
                            <Button
                                variant="contained"
                                startIcon={<AddIcon />}
                                fullWidth
                                size="large"
                                color="primary"
                                onClick={handleAddRow}

                            >
                                EKLE
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>İptal</Button>
                    <Button type="submit">Kaydet</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
