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


import { setExpenses } from '../Redux/expensesSlice'; // Redux aksiyonunu import ediyoruz



export default function FormDialog() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.isOpen); 
    const expenses = useSelector((state) => state.expenses.expenses); 

    const [rows, setRows] = useState(expenses);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);


    const handleClose = () => {
        dispatch(closeModal()); 
    };

    const handleAddRow = () => {
        setRows([...rows, { title: '', amount: '' }]); 
    };

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: value };
        setRows(newRows); 
    };

    const handleSave = async () => {
        dispatch(setExpenses(rows)); 
        console.log("expenses", rows);
        try {
            handleClose();
        } catch (error) {
            console.error('Hata:', error);
        }
    };

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Dialog open={open} onClose={handleClose} PaperProps={{
                    component: 'form',
                    sx: {
                        width: '800px',
                        maxWidth: '80%',
                        borderRadius: "20px"
                    },
                }}>
                    <DialogTitle sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#4d6eb1ad' : '#101624',
                    }}>Masraf Ekle</DialogTitle>
                    <DialogContent sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#d3daee' : '#1F2A40',
                    }}>
                        <DialogContentText sx={{ marginBottom: '2%', marginTop: "2%" }}>
                            *Masraf bilgilerinizi buraya giriniz. Girdiğiniz bilgiler kaydedilecektir.
                        </DialogContentText>
                        <Grid container spacing={1} columns={12}>
                            {rows.map((row, index) => (
                                <Grid container spacing={1} columns={10} key={index}>
                                    <Grid item md={5}>
                                        <TextField
                                            required
                                            label="Masraf Açıklaması"
                                            fullWidth
                                            variant="standard"
                                            value={row.title}
                                            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item md={5}>
                                        <TextField
                                            required
                                            label="Masraf Tutarı"
                                            fullWidth
                                            variant="standard"
                                            value={row.amount}
                                            onChange={(e) => handleInputChange(index, 'amount', e.target.value)}
                                            type="number"
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
                    <DialogActions sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#4d6eb1ad' : '#101624',
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
                            onClick={handleSave}
                        >
                            Kaydet
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}