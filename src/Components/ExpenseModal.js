import React, { useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { closeModal } from '../Redux/slices/modalSlice';
import Grid from "@mui/material/Grid";
import AddIcon from "@mui/icons-material/Add";
import { ThemeProvider, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { handleFormattedChange } from '../utils';
import { setExpenses, updateExpenseAmount } from '../Redux/slices/expensesSlice';



export default function FormDialog() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.isOpen);
    const expenses = useSelector((state) => state.expenses.expenses);

    const [rows, setRows] = useState(expenses);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
   // 📌 Miktar değiştiğinde formatlı ve saf değerleri güncelle
   const handleAmountChange = (index, value) => {
    handleFormattedChange(value, 
        (formattedValue) => {
            setRows(prevRows => {
                const updatedRows = [...prevRows];
                updatedRows[index] = { ...updatedRows[index], amount: formattedValue };
                return updatedRows;
            });
            dispatch(updateExpenseAmount({ index, amount: formattedValue, rawAmount: value.replace(/\./g, "").replace(",", ".") }));
        }, 
        (rawValue) => {
            setRows(prevRows => {
                const updatedRows = [...prevRows];
                updatedRows[index] = { ...updatedRows[index], rawAmount: rawValue };
                return updatedRows;
            });
        }
    );
};

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleAddRow = () => {
        const maxId = rows.length > 0 ? Math.max(...rows.map((row) => row.id)) : -1; 
        const newRow = { id: maxId + 1, title: '', amount: '', rawAmount: '' }; 
        setRows([...rows, newRow]);
    };

    const handleInputChange = (index, field, value) => {
        const newRows = [...rows];
        newRows[index] = { ...newRows[index], [field]: value };
        setRows(newRows);
    };

    const handleSave = async () => {
        dispatch(setExpenses(rows));
        try {
            handleClose();
        } catch (error) {

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
                    }}>Gönüllü olarak ödemediğiniz ve havaya gittiğini düşündüğünüz masrafları buraya girin</DialogTitle>
                    <DialogContent sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#d3daee' : '#1F2A40',
                    }}>
                        {/* <DialogContentText sx={{ marginBottom: '2%', marginTop: "2%" }}>
                            *Gönüllü olarak ödemediğiniz ve havaya gittiğini düşündüğünüz masrafları buraya girin.
                        </DialogContentText> */}

                        <Grid container spacing={1} columns={12} sx={{ marginBottom: '2%', marginTop: "2%" }}>
                            {rows.map((row, index) => (
                                <Grid container spacing={1} columns={10} key={row.id}>
                                    <Grid item md={5}>
                                        <TextField

                                            fullWidth
                                            variant="standard"
                                            value={row.title}
                                            onChange={(e) => handleInputChange(index, 'title', e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item md={5}>
                                        <TextField
                                            fullWidth
                                            variant="standard"
                                            value={row.amount}
                                            onChange={(e) => handleAmountChange(index, e.target.value)}
                                            placeholder={row.amount === '' ? '0' : ''}
                                            inputProps={{ inputMode: 'decimal', pattern: '[0-9,]*' }}

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
                        <DialogContentText sx={{ marginBottom: '1%', marginTop: "1%", fontSize: '13px' }}>
                            *Farklı para biriminden olan ödemeleri güncel kurdan kredi ile aynı para birimine çevirip girin
                        </DialogContentText>
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