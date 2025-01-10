import React, { useState, useContext } from 'react';
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
import { ThemeProvider, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";



export default function FormDialog() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.isOpen); // Modal durumunu Redux'tan al
    const [rows, setRows] = useState([{ text: '', amount: '' }]); // Dinamik form satırları için state
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

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
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
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
                                borderRadius: "20px"
                            },
                        }}
                    >
                        <DialogTitle sx={{ 
                            backgroundColor: (theme) => theme.palette.mode === 'light' ? '#727681' : '#101624',
                         }}>Masraf Ekle</DialogTitle>
                        <DialogContent
                         sx={{ 
                            backgroundColor: (theme) => theme.palette.mode === 'light' ? '#a1a4ab' : '#1F2A40',
                         }}>
                            <DialogContentText sx={{ marginBottom: '2%', marginTop:"2%" }}>
                                *Masraf bilgilerinizi buraya giriniz. Girdiğiniz bilgiler kaydedilecektir.
                            </DialogContentText>

                            <Grid container spacing={1} columns={12} >
                                {rows.map((row, index) => (
                                    <Grid container spacing={1} columns={10} key={index}>

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
                                                        color: (theme) => theme.palette.mode === 'light' ? '#5e5b54' : '#5e5b54',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: (theme) => theme.palette.mode === 'light' ? '#5e5b54' : '#ffffff',
                                                    }, '& .MuiInputLabel-root.Mui-focused': {
                                                        color: (theme) => theme.palette.mode === 'light' ? '#5e5b54' : '#ffffff',
                                                    },
                                                }}
                                            />
                                        </Grid>
                                        <Grid item md={5}>
                                            <TextField fullWidth variant="standard"
                                                required 
                                                label="Masraf Tutarı"
                                                onChange={(e) => {
                                                    const value = e.target.value;
                                            
                                                    // Sadece sayıları kabul et
                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                        e.target.value = value;
                                                    } else {
                                                        e.target.value = value.replace(/\D/g, ''); // Sayı olmayan karakterleri sil
                                                    }
                                                }}
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
                                                        color: (theme) => theme.palette.mode === 'light' ? '#5e5b54' : '#5e5b54',
                                                    },
                                                    '& .MuiInputLabel-root': {
                                                        color: (theme) => theme.palette.mode === 'light' ? '#5e5b54' : '#ffffff',
                                                    }, '& .MuiInputLabel-root.Mui-focused': {
                                                        color: (theme) => theme.palette.mode === 'light' ? '#5e5b54' : '#ffffff',
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
                        <DialogActions 
                        sx={{ 
                            backgroundColor: (theme) => theme.palette.mode === 'light' ? '#727681' : '#101624',
                         }}>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={handleClose}

                            >
                                İptal
                            </Button>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"

                            >
                                Kaydet
                            </Button>
                            {/* <Button onClick={handleClose}>İptal</Button>
                                <Button type="submit">Kaydet</Button> */}
                        </DialogActions>
                    </Dialog>
                </React.Fragment>
            </ThemeProvider>
        </ColorModeContext.Provider>


    );
}
