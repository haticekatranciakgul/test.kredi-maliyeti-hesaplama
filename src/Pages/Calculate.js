import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Divider from '@mui/material/Divider';
import CreateTable from "../Components/CreateTable";
import SelectRadioBtn from "../Components/SelectRadioBtn"
import { useDispatch } from 'react-redux';
import { openModal } from '../Redux/slices/modalSlice';
import ExpenseModal from '../Components/ExpenseModal';
import { useSelector } from 'react-redux';
import BlockModal from '../Components/BlockModal';
import { selectBlockData } from '../Redux/slices/blockSlice';
import { setConsumerCreditType, setCreditType } from '../Redux/slices/creditTypeSlice';
import TaxModal from '../Components/TaxModal';
import { Alert, Snackbar } from "@mui/material";
import Slide from '@mui/material/Slide';
import { calculateIRR, createTable } from '../services/service';
import { setBlockData } from "../Redux/slices/blockSlice";
import { setInitial } from '../Redux/slices/blockSlice';
import { handleError } from '../utils';


function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

function Calculate() {
    const [inputCount, setInputCount] = useState("");
    const [credits, setcredits] = useState("");
    const [initial, setInitialInput] = useState("");
    const [generatedRows, setGeneratedRows] = useState([]);
    const [irrValue, setIrrValue] = useState(null);
    const [tableData, setTableData] = useState([]);
    const expenses = useSelector((state) => state.expenses.expenses);
    const taxes = useSelector((state) => state.taxes.taxes);
    const { isOpen, modalType } = useSelector((state) => state.modal);
    const blockData = useSelector(selectBlockData);

    //Alert: start
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    //Alert: end

    const handleInitialChange = (e) => {
        const value = e.target.value;
        if (/^\d*\.?\d*$/.test(value)) {
            setInitialInput(value);
            dispatch(setInitial(value ? parseFloat(value) : null));
        }
    };

    const dispatch = useDispatch();
    const consumerCreditType = useSelector((state) => state.creditType.consumerCreditType);
    const creditType = useSelector((state) => state.creditType.creditType);

    const handleOpenExpenseModal = () => {
        dispatch(openModal("expense"));
    };

    const handleOpenBlockModal = () => {
        dispatch(openModal("block"));
    };

    const handleOpenTaxesModal = () => {
        dispatch(openModal("taxes"));
    };

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
    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };


    const handleSave = async () => {
        try {
            const credits = generatedRows.map((row) => parseFloat(row.value2) || 0);
            const payload = {
                initial: parseFloat(initial) || 0,
                credits: credits,
                credit_type: creditType,
                consumer_credit_type: consumerCreditType,
                expenses: expenses,
                block: blockData.block,
                block_amount: blockData.block_amount,
                taxes: taxes,
            };
            dispatch(setBlockData({ block_amount: parseFloat(initial) || 0 }));
            console.log(payload);
            const tableResponse = await createTable(payload);
            // const response = await calculateIRR(payload);

            if (tableResponse && tableResponse.table) {
                const parsedTable = JSON.parse(tableResponse.table);

                const formattedData = parsedTable.map((row) => ({
                    column1: row.fields.credit_amount,
                    column2: row.fields.interest,
                    column3: row.fields.tax,
                    column4: row.fields.principal_amount,
                    column5: row.fields.remaining_principal_amount,
                }));

                setTableData(formattedData);
                setIrrValue(tableResponse.irr);
                showSnackbar("İşlem Başarılı", "success");

            } else {
                showSnackbar("API Yanıt Hatası", "warning");
                setIrrValue(null);
            }
        } catch (error) {
            handleError(error, showSnackbar);
        }
    };

    // const handleCreateTable = async () => {
    //     try {
    //         const credits = generatedRows.map((row) => parseFloat(row.value2) || 0);
    //         const payload = {
    //             initial: parseFloat(initial) || 0,
    //             credits: credits,
    //             credit_type: creditType,
    //             consumer_credit_type: consumerCreditType,
    //             expenses: expenses,
    //             block: blockData.block,
    //             block_amount: blockData.block_amount,
    //             taxes: taxes,
    //         };
    //         dispatch(setBlockData({ block_amount: parseFloat(initial) || 0 }));

    //         const tableResponse = await createTable(payload);
    //         const response = await calculateIRR(payload);

    //         if (tableResponse && tableResponse.table && response && typeof response.irr !== "undefined") {
    //             const parsedTable = JSON.parse(tableResponse.table);

    //             const formattedData = parsedTable.map((row) => ({
    //                 column1: row.fields.credit_amount,
    //                 column2: row.fields.interest,
    //                 column3: row.fields.tax,
    //                 column4: row.fields.principal_amount,
    //                 column5: row.fields.remaining_principal_amount,
    //             }));

    //             setTableData(formattedData);
    //             setIrrValue(response.irr);
    //             showSnackbar("İşlem Başarılı", "success");

    //         } else {
    //             showSnackbar("API Yanıt Hatası", "warning");
    //             setIrrValue(null);
    //         }
    //     } catch (error) {
    //         handleError(error, showSnackbar);
    //     }
    // };



    return (
        <>
            <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                <Typography variant="h1" gutterBottom sx={{
                    fontSize: {
                        xs: '20px',
                        sm: '20px',
                        md: '23px',
                        lg: '25px',
                    },
                    fontWeight: 'bold',
                }}>
                    KREDİ MALİYETİ HESAPLAMA
                </Typography>
            </Box>
            <Divider></Divider>

            {/* Snackbar ve Alert */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Grid item xs={12} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
               
                {irrValue !== null && (

                    <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '1%', paddingBottom: '1%' }}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                            boxShadow: '1px 1px 185px -23px rgb(78, 142, 225)',
                            webkitBoxShadow: '1px 1px 185px -23px rgba(62, 113, 240, 0.43)',
                            mozBoxShadow: '1px 1px 185px -23px rgba(101, 150, 254, 0.43)',

                        }}>
                            <Typography sx={{
                                fontWeight: 'bold', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                Kredi Maliyeti Hesaplama  = ${irrValue}
                            </Typography>
                        </Box>
                    </Box>
                )}
                <br />
            </Grid>

            {/* <Divider></Divider> */}
            <CreateTable tableData={tableData} />
            <Box sx={{
                flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                boxShadow: '1px 1px 185px -23px rgb(78, 142, 225)',
                webkitBoxShadow: '1px 1px 185px -23px rgba(62, 113, 240, 0.43)',
                mozBoxShadow: '1px 1px 185px -23px rgba(101, 150, 254, 0.43)',
            }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', }}>
                            HER ŞEY DAHİL YILLIK BİLEŞİK KREDİ MALİYETİNİZİ KOLAYCA HESAPLAYIN! YANILMAYIN!

                        </Box>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                        <SelectRadioBtn
                            setConsumerCreditType={(value) => dispatch(setConsumerCreditType(value))}
                            setCreditType={(value) => dispatch(setCreditType(value))}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                        <Typography>* Kredi Tutarı (Anapara), Diğer Masraflar, Vade Periyodu ve Ödeme Tutarını Giriniz</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", paddingBottom: '2%' }}>
                        <Typography>* Faize baz gün sayısı farklılıklarından dolayı hesaplamalarda küçük farklar oluşabilir.</Typography>
                    </Grid>

                    <Grid container spacing={1} columns={12}>
                        <Grid item xs={12} sm={12} md={4} >
                            <Grid container spacing={1} columns={12}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} >
                                    <TextField fullWidth variant="standard" size="small"
                                        required
                                        label="Kredi Tutarı (Anapara)"
                                        value={initial}
                                        onChange={handleInitialChange}
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
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <TextField fullWidth variant="standard" size="small"
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
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <TextField fullWidth variant="standard" size="small"
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
                        <Grid item xs={12} sm={12} md={8} >
                            <Grid container spacing={1} columns={12}>
                                <Grid item xs={6} sm={2} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
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
                                <Grid item xs={6} sm={2} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleOpenExpenseModal}
                                    >
                                        Masraf
                                    </Button>
                                    {isOpen && modalType === "expense" && <ExpenseModal />}

                                </Grid>
                                <Grid item xs={6} sm={2} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleOpenBlockModal}

                                    >
                                        Bloke
                                    </Button>
                                    {isOpen && modalType === "block" && <BlockModal />}

                                </Grid>
                                <Grid item xs={6} sm={2} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleOpenTaxesModal}

                                    >
                                        Vergi
                                    </Button>
                                    {isOpen && modalType === "taxes" && <TaxModal />}

                                </Grid>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"

                                        onClick={handleSave}
                                        sx={{
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            padding: "5px",
                                            backgroundColor: "#254474",
                                        }}
                                    >
                                        Hesapla
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                {generatedRows.map((row, index) => (
                    <Grid container spacing={2} key={index} sx={{ marginTop: '10px' }}>
                        <Grid container spacing={1} columns={12}>
                            <Grid item xs={12} sm={6} md={4} >
                                <Grid container spacing={1} columns={12}>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4} >

                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} sx={{ textAlign: 'center', marginTop: 'auto' }}>
                                        <Typography sx={{ fontSize: '17px', fontWeight: '500' }}>
                                            {`${index + 1}. Vade :`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                        <TextField variant="standard" size="small"
                                            label="Ödeme Tutarı "
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
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={6} md={8}>
                                <Grid container spacing={1} columns={12}>
                                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            startIcon={<DeleteIcon />}
                                            fullWidth
                                            size="large"
                                            onClick={() => handleDeleteRow(index)}
                                        >
                                            SİL
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ))}
            </Box>
        </>
    )
}

export default Calculate