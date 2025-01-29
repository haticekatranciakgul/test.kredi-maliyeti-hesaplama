import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { closeModal } from '../Redux/modalSlice';
import Grid from "@mui/material/Grid";
import { ThemeProvider, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { setBlockData } from "../Redux/blockSlice";


export default function FormDialog() {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.isOpen);
    const blockData = useSelector((state) => state.block);
    const initial = blockData.initial;

   // Local state
   const [block, setBlock] = useState(blockData.block || 0);
   const [blockAmount, setBlockAmount] = useState(blockData.block_amount || 0);
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleBlockChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= 99)) {
            setBlock(value);
            if (value !== "" && initial !== null) {
                setBlockAmount(initial.toString());
            } else {
                setBlockAmount("");
            }
        }
    };

    const handleBlockAmountChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            if (initial === null || block === "" || parseFloat(value) <= parseFloat(initial || 0)) {
                setBlockAmount(value);
            }
        }
    };

    const handleSave = () => {
        dispatch(
            setBlockData({
                block: parseFloat(block) || 0,
                block_amount: parseFloat(blockAmount) || 0,
            })
        );
        try {
            handleClose();
        } catch (error) {
            console.error("Error closing modal", error);
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
                    }}>Bloke Verileri</DialogTitle>
                    <DialogContent sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#d3daee' : '#1F2A40',
                    }}>
                        <DialogContentText sx={{ marginBottom: '2%', marginTop: "2%" }}>
                            *Kullandırım sonrası kredi tutarının tamamının veya bir kısmının bir süre bankada tutulması şartı varsa buraya giriş yapın.
                        </DialogContentText>

                        <Grid container spacing={1} columns={10} >
                            <Grid item md={5}>
                                <TextField
                                    required
                                    label="Kredi tutarının blokede tutulacağı gün sayısı "
                                    fullWidth
                                    variant="standard"
                                    type="text"
                                    value={block}
                                    onChange={handleBlockChange}
                                    inputProps={{
                                        inputMode: 'numeric',
                                        pattern: '\\d*',
                                        max: 99
                                    }}
                                />
                            </Grid>
                            <Grid item md={5}>
                                <TextField
                                    required
                                    label="Blokede kalacak kredi tutarı "
                                    fullWidth
                                    variant="standard"
                                    type="text"
                                    value={blockAmount}
                                    onChange={handleBlockAmountChange}
                                    inputProps={{
                                        inputMode: 'decimal',
                                        pattern: '[0-9]*[.,]?[0-9]*',
                                        step: 'any'
                                    }}
                                />
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