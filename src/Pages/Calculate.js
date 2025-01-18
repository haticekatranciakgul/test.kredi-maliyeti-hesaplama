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
import CreateTable from "../Components/CreateTable";
import SelectRadioBtn from "../Components/SelectRadioBtn"
import { useDispatch } from 'react-redux';
import { openModal } from '../Redux/modalSlice';
import ExpenseModal from '../Components/ExpenseModal';
import { useSelector } from 'react-redux';
import BlockModal from '../Components/BlockModal';
import { selectBlockData } from '../Redux/blockSlice';
import { setConsumerCreditType, setCreditType } from '../Redux/creditTypeSlice';
import TaxModal from '../Components/TaxModal';


function Calculate() {
    const [inputCount, setInputCount] = useState("");
    const [credits, setcredits] = useState("");
    const [initial, setInitial] = useState("");
    const [generatedRows, setGeneratedRows] = useState([]);
    const [irrValue, setIrrValue] = useState(null);
    const [tableData, setTableData] = useState([]);
    const expenses = useSelector((state) => state.expenses.expenses);
    const tax = useSelector((state) => state.tax.tax);
    const { isOpen, modalType } = useSelector((state) => state.modal);
    const blockData = useSelector(selectBlockData);



    const dispatch = useDispatch();
    const consumerCreditType = useSelector((state) => state.creditType.consumerCreditType);
    const creditType = useSelector((state) => state.creditType.creditType);

    const handleOpenExpenseModal = () => {
        dispatch(openModal("expense"));
    };

    const handleOpenBlockModal = () => {
        dispatch(openModal("block"));
    };

    const handleOpenTaxModal = () => {
        dispatch(openModal("tax"));
    };

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
                credit_type: creditType,
                consumer_credit_type: consumerCreditType,
                expenses
            };

            console.log("Initial:", payload.initial);
            console.log("Credits:", payload.credits);
            console.log("Payload:", payload);


            const response = await axios.post(`${BASE_URL}/api/v1/credits/create/irr`, payload);


            if (response.data && typeof response.data.irr !== "undefined") {
                console.log("IRR Value:", response.data.irr);
                setIrrValue(response.data.irr); // IRR değerini kaydet
            } else {
                console.error("Yanıt içinde IRR değeri bulunamadı.");
                setIrrValue(null);
            }
        } catch (error) {
            if (error.response) {
                console.error("API Yanıt Hatası:", error.response.status, error.response.data.error);
                alert("API Yanıt Hatası: LÜTFEN İLGİLİ ALANLRI DOLDURUNUZ! KREDİ TÜRÜNÜ SEÇİNİZ ANAPARAYI VADE PERİYODUNU ÖDEME TUTARINI GİRİNİZ!");
            } else if (error.request) {
                console.error("API İstek Hatası:", error.request.data.error);
                alert("API İstek Hatası")
            } else {
                console.error("API Hatası:", error.message);
            }
        }
    };

    const handleCreateTable = async () => {
        try {
            const credits = generatedRows.map((row) => parseFloat(row.value2) || 0);
            const payload = {
                initial: parseFloat(initial) || 0,
                credits,
                credit_type: creditType,
                consumer_credit_type: consumerCreditType,
                expenses,
                block: blockData.block,
                block_amount: blockData.block_amount,
                tax,
            
            };
            console.log("Gönderilen Request Payload:", payload);
            const tableResponse = await axios.post(`${BASE_URL}/api/v1/credits/create/table`, payload);



            if (tableResponse.data && tableResponse.data.table) {

                const parsedTable = JSON.parse(tableResponse.data.table);

                const formattedData = parsedTable.map((row) => ({
                    column1: row.fields.credit_amount,
                    column2: row.fields.interest,
                    column3: row.fields.tax,
                    column4: row.fields.principal_amount,
                    column5: row.fields.remaining_principal_amount,
                }));

                setTableData(formattedData);
            } else {
                // console.log("Gönderilen Request Payload:", payload);
                console.error("Tablo verisi yanıt verisi içinde bulunamadı.");
            }
        } catch (error) {
            console.error(error.response.data.error);

        }
    };

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
                    IRR HESAPLAMA
                </Typography>
            </Box>
            <Divider></Divider>

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
                    <Grid item xs={12} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>

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
                                }} variant="h4" >
                                    {irrValue !== null
                                        ? ` IRR = ${irrValue}`
                                        : "IRR değeri henüz hesaplanmadı."}
                                </Typography>
                            </Box>
                        </Box><br />
                    </Grid>
                    <Grid item xs={12} >
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
                        <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1} columns={12}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} >
                                    <TextField fullWidth variant="standard" size="small"
                                        required
                                        label="Kredi Tutarı (Anapara)"
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
                        <Grid item xs={12} sm={12} md={6} >
                            <Grid container spacing={1} columns={12}>
                                <Grid item xs={6} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
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
                                <Grid item xs={6} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
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
                                <Grid item xs={6} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleOpenBlockModal}

                                    >
                                        Blok
                                    </Button>
                                    {isOpen && modalType === "block" && <BlockModal />}

                                </Grid>
                                <Grid item xs={6} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleOpenTaxModal}

                                    >
                                        Vergi
                                    </Button>
                                    {isOpen && modalType === "tax" && <TaxModal />}

                                </Grid>
                                <Grid item xs={6} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleCreateTable}
                                        sx={{
                                            overflow: "hidden",
                                            whiteSpace: "nowrap",
                                            textOverflow: "ellipsis",
                                            padding: "5px"
                                        }}
                                    >
                                        Tablo
                                    </Button>
                                </Grid>
                                <Grid item xs={6} sm={4} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleSave}
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
                            <Grid item xs={12} sm={6} md={6} >
                                <Grid container spacing={1} columns={12}>
                                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4} >

                                    </Grid>
                                    <Grid item xs={12} sm={6} md={4} lg={4} xl={4}>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
                                        <TextField variant="standard" size="small"
                                            label="Yeni Ödeme Tutarı "
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
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid container spacing={1} columns={12}>
                                    <Grid item xs={12} sm={12} md={3} lg={3} xl={3} display="flex" justifyContent="flex-end">
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
                                    <Grid item xs={12} sm={6} md={3} lg={3} xl={3} display="flex" justifyContent="flex-end">


                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3} xl={3} display="flex" justifyContent="flex-end">
                                    </Grid>
                                    <Grid item xs={12} sm={6} md={3} lg={3} xl={3} display="flex" justifyContent="flex-end">
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
