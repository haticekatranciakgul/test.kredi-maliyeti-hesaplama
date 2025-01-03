import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../api";
import Divider from '@mui/material/Divider';

function Calculate() {
    const [inputCount, setInputCount] = useState("");
    const [credits, setcredits] = useState("");
    const [initial, setInitial] = useState("");
    const [otherExpenses, setOtherExpenses] = useState("");
    const [generatedRows, setGeneratedRows] = useState([]);
    const [irrValue, setIrrValue] = useState(null);



    useEffect(() => {
        const fetchIrrValue = async () => {
            try {
                const response = await axios.post(
                    `${BASE_URL}/api/v1/credits/create`,
                    {
                        initial: parseFloat(initial) || 0,
                        credits: generatedRows.map((row) => parseFloat(row.value2) || 0),
                    }

                );
                setIrrValue(response.data.irr);

            } catch (error) {
                if (error.response) {
                    console.error("API Yanıt Hatası:", error.response);
                    console.log("Hata Kodu:", error.response.status);
                    console.log("Hata Mesajı:", error.response.data);
                } else if (error.request) {
                    console.error("API İsteği Hatası:", error.request);
                } else {
                    console.error("API Hatası:", error.message);
                }
                setIrrValue(null);
            }
        };

        if (initial && otherExpenses && inputCount && generatedRows.length > 0) {
            fetchIrrValue();
        }
    }, [initial, otherExpenses, inputCount, generatedRows]);



    useEffect(() => {
        const count = parseInt(inputCount) || 0;
        if (credits) {
            const newRows = Array.from({ length: count }, () => ({
                value1: "",
                value2: credits,
            }));
            setGeneratedRows(newRows);
        }
    }, [inputCount, credits]);


    useEffect(() => {
        if (irrValue !== null) {
            console.log("Hesaplanan IRR: ", irrValue);
        }
    }, [irrValue]);


    const handleAddRow = () => {
        setGeneratedRows((prevRows) => [...prevRows, { value1: "", value2: "" }]);
    };

    const handleInputChange = (index, field, newValue) => {
        const updatedRows = [...generatedRows];
        updatedRows[index][field] = newValue;
        setGeneratedRows(updatedRows);
    };

    const handleDeleteRow = (indexToDelete) => {
        const isConfirmed = window.confirm("Silmek istediğinizden emin misiniz?");
        if (isConfirmed) {
            setGeneratedRows((prevRows) =>
                prevRows.filter((_, index) => index !== indexToDelete)
            );
        }
    };

    const handleSave = async () => {
        try {
            const credits = generatedRows.map((row) => parseFloat(row.value2) || 0);
            const payload = {
                initial: parseFloat(initial) || 0,
                credits,
            };

            const response = await axios.post(`${BASE_URL}/api/v1/credits/create`, payload);
            if (response.data && response.data.irr !== undefined) {
                setIrrValue(response.data.irr);
            } else {
                console.error("IRR değeri yanıt verisi içinde bulunamadı.");
                setIrrValue(null);
            }
            //alert("Veriler başarıyla kaydedildi.");
        } catch (error) {
            if (error.response) {
                console.error("API yanıt hatası:", error.response);
            } else if (error.request) {
                console.error("API isteği hatası:", error.request);
            } else {
                console.error("API hatası:", error.message);
            }
            //alert("Veriler kaydedilirken bir hata oluştu.");
        }
    };


    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                <Typography variant="h1" gutterBottom sx={{
                    fontSize: {
                        xs: '20px', // Varsayılan font boyutu
                        sm: '20px', // sm için font boyutu
                        md: '23px', // md için font boyutu
                        lg: '25px', // lg için font boyutu
                    },
                    fontWeight: 'bold',
                }}>
                    IRR HESAPLAMA
                </Typography>
            </Box>
            <Divider></Divider>

            <Box sx={{
                flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 0.43)',
                webkitBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
                mozBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
            }}>
                <Grid container spacing={2}>

                    <Grid item xs={12} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>

                        <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '2%', paddingBottom: '2%' }}>
                            <Box sx={{
                                display: 'flex', justifyContent: 'center', flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                                boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 1)',
                                webkitBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
                                mozBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',

                            }}>
                                <Typography sx={{
                                    fontWeight: 'bold', fontSize: {
                                        xs: '14px', // Varsayılan font boyutu
                                        sm: '14px', // sm için font boyutu
                                        md: '16px', // md için font boyutu
                                        lg: '18px', // lg için font boyutu
                                    },
                                }} variant="h4" >
                                     {irrValue !== null
                                        ? ` IRR = ${irrValue}`
                                        : "IRR değeri henüz hesaplanmadı."}
                                </Typography>
                            </Box>
                        </Box><br />

                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", paddingBottom: '2%' }}>
                        <Typography>*Kredi Tutarı, Diğer Masraflar, Vade Periyodu ve Ödeme Tutarını Giriniz</Typography>

                    </Grid>
                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2} >
                        <TextField fullWidth
                            required
                            label="Kredi Tutarı"
                            value={initial}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) {
                                    setInitial(value);
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
                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                        <TextField fullWidth
                            required
                            label="Diğer Masraflar"
                            value={otherExpenses}
                            onChange={(e) => {

                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) {
                                    setOtherExpenses(value);
                                }
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
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
                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                        <TextField fullWidth
                            required
                            label="Vade Periyodu"
                            value={inputCount}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= 99)) {
                                    setInputCount(value);
                                }
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*',
                                max: 999
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
                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2}>
                        <TextField fullWidth
                            required
                            label="Ödeme Tutarı"
                            value={credits}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^\d*\.?\d*$/.test(value)) {
                                    setcredits(value);
                                }
                            }}
                            inputProps={{
                                inputMode: 'numeric',
                                pattern: '[0-9]*'
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
                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                        <Button 
                            variant="contained"
                            startIcon={<AddIcon />}
                            fullWidth
                            size="small"
                            color="primary"
                            onClick={handleAddRow}
                        >
                            EKLE
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                        <Button
                            variant="contained"
                            fullWidth
                            size="small"
                            color="primary"
                            onClick={handleSave}
                        >
                            Hesapla
                        </Button>
                    </Grid>
                </Grid>
                <Box mt={4}>
                    <Grid container spacing={2}>
                        {generatedRows.map((row, index) => (
                            <React.Fragment key={index}>

                                <Grid item xs={5}>
                                </Grid>
                                <Grid item xs={5}>
                                    <TextField
                                        fullWidth
                                        value={row.value2}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            if (/^\d*\.?\d*$/.test(value)) {
                                                handleInputChange(index, "value2", value);
                                            }
                                        }}
                                        inputProps={{
                                            inputMode: 'numeric',
                                            pattern: '[0-9]*'
                                        }}
                                    />
                                </Grid>
                                <Grid
                                    item
                                    xs={2}
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteRow(index)}
                                    >
                                        SİL
                                    </Button>
                                </Grid>
                            </React.Fragment>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default Calculate
