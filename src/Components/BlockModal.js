import React, { useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { closeModal } from '../Redux/slices/modalSlice';
import Grid from "@mui/material/Grid";
import { ThemeProvider, useTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { ColorModeContext } from "../theme";
import { setBlockData } from "../Redux/slices/blockSlice";

import { setInitial } from "../Redux/slices/blockSlice";
import { handleFormattedChange } from '../utils';

const FormDialog = () => {
    const dispatch = useDispatch();
    const open = useSelector((state) => state.modal.isOpen);
    const blockData = useSelector((state) => state.block);
    const initial = blockData.initial;


    // Local state
    const [block, setBlock] = useState(blockData.block || "");
    const [blockAmount, setBlockAmount] = useState("");
    const [rawBlockAmount, setRawBlockAmount] = useState("0");

    useEffect(() => {
        if (block !== "" && initial) {
            let initialString = initial.toString();

            if (!initialString.includes('.')) {
                initialString += '.00';
            }

            initialString = initialString.replace('.', ',');

            handleFormattedChange(initialString, setBlockAmount, setRawBlockAmount);
        } else {
            setBlockAmount("");
            setRawBlockAmount("0");
        }
    }, [block, initial]);

    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const handleClose = () => {
        dispatch(closeModal());
    };

    const handleBlockChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= 99)) {
            setBlock(value);

        }
    };



    const handleBlockAmountChange = (e) => {
        handleFormattedChange(e.target.value, setBlockAmount, setRawBlockAmount);

        if (initial && parseFloat(rawBlockAmount) > initial) {

            handleFormattedChange(initial.toString(), setBlockAmount, (prev) => prev);
        }
    };
    useEffect(() => {
        if (blockAmount) {
            handleFormattedChange(blockAmount, setBlockAmount, setRawBlockAmount);
        }
    }, [blockAmount]);

    const handleSave = () => {

        let formattedRawBlockAmount = "0";
        handleFormattedChange(blockAmount, setBlockAmount, (value) => {
            formattedRawBlockAmount = value;
        });

        dispatch(setInitial(initial));

        dispatch(setBlockData({
            block: parseFloat(block) || 0,
            block_amount: parseFloat(blockAmount) || 0,
            raw_block_amount: formattedRawBlockAmount,
        }));
        console.log("Kaydedilen rawBlockAmount:", formattedRawBlockAmount);

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
                    }}>Kredi tutarının tamamının veya bir kısmının bankada bloke edilmesi şartı varsa buraya giriş yapın</DialogTitle>
                    <DialogContent sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'light' ? '#d3daee' : '#1F2A40',
                    }}>


                        <Grid container spacing={1} columns={10} sx={{ marginBottom: '2%', marginTop: "2%" }}>
                            <Grid item md={5}>
                                <TextField
                                    label="Bloke Gün Sayısı"
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
                                    // label="Blokede kalacak kredi tutarı "
                                    label="Bloke Edilecek Kredi Tutarı"
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

export default FormDialog;