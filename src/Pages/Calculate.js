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


import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";


//import { useDispatch } from 'react-redux';
//import { fetchData } from '../Redux/dataSlice';
import CreateTable from "../Components/CreateTable";
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
// import { saveAs } from 'file-saver';
// import Createtable from '../Components/CreateTable';

function Calculate() {
    const [inputCount, setInputCount] = useState("");
    const [credits, setcredits] = useState("");
    const [initial, setInitial] = useState("");
    const [otherExpenses, setOtherExpenses] = useState("");
    const [generatedRows, setGeneratedRows] = useState([]);
    const [irrValue, setIrrValue] = useState(null);

   // const [showTable, setShowTable] = useState(false);
    //const dispatch = useDispatch();

    const [tableData, setTableData] = useState([]);
    const [error, setError] = useState("");

    const handleFormSubmit = async () => {
        const credits = generatedRows.map((row) => parseFloat(row.value2) || 0);
        if (!initial || !credits) {
            setError("Lütfen tüm alanları doldurun!");
            return;
        }
        setError("");

        const payload = {
            initial: parseFloat(initial) || 0,
            credits,
        };

        try {
            const response = await axios.post("https://jsonplaceholder.typicode.com/posts", payload);
           // const response = await axios.post(`${BASE_URL}/api/v1/credits/create`, payload);

            const generatedTable = Array.from({ length: inputCount }, (_, index) => ({
                id: index + 1,
                initial: response.data.initial,
                credits: response.data.credits,
                //total: response.data.initial + response.data.credits,
            }));
            setTableData(generatedTable);
        } catch (error) {
            console.error("Hata:", error);
            setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        }
    };

    // const handleFetchData = () => {
    //     dispatch(fetchData());
    //     setShowTable(true);
    // };


    useEffect(() => {
        const count = parseInt(inputCount) || 0;
        if (credits) {
            const newRows = Array.from({ length: count }, () => ({
                value1: "",
                value2: credits,
            }));
            setGeneratedRows(newRows);
            console.log("inputCount:" + inputCount)
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
            console.log("initial:" + initial, "credits:" + credits)
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
           {/* < {showTable && (
                <Box sx={{
                    flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                    boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 0.43)',
                    webkitBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
                    mozBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',

                }}>
                    <CreateTable />
                </Box>
            )}> */}
            {tableData.length > 0 && (
                  <Box sx={{
                    flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                    boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 0.43)',
                    webkitBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
                    mozBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',

                }}>
                    <CreateTable />
                    <TableContainer component={Paper} sx={{ mt: 3 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Initial Value</TableCell>
                                <TableCell>Credits Value</TableCell>
                                {/* <TableCell>Total</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tableData.map((row) => (
                                <TableRow key={row.id}>
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>{row.initial}</TableCell>
                                    <TableCell>{row.credits}</TableCell>
                                    {/* <TableCell>{row.total}</TableCell> */}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </Box>
              
            )}
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
                    <Grid container spacing={2} columns={12}>
                        <Grid item xs={12} sm={12} md={8} >
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={3} >
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
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
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
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
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
                                <Grid item xs={12} sm={6} md={3} lg={3} xl={3}>
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
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} >
                            <Grid container spacing={2} columns={12}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} display="flex" justifyContent="flex-end">
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
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} display="flex" justifyContent="flex-end">
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
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="small"
                                        color="primary"
                                        onClick={handleFormSubmit}
                                    >
                                        Tablo Oluştur
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
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
