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
import { createTable } from '../services/service';
import { setBlockData } from "../Redux/slices/blockSlice";
import { setInitial } from '../Redux/slices/blockSlice';
import { handleError } from '../utils';
import { setIrrValue } from '../Redux/slices/irrSlice';
import {
    setPrepaidExpenses,
    setInterestPayableOnLoans,
    setTaxesOnLoanInterestPayable,
    setInterestCostRelatedToLoanBlockage,
    setTotalCost,
    setMonthlyCostIvo,
    setAnnualCompoundCostIvo
} from '../Redux/slices/costSlice';
// FormDialog.js veya kullanmak istediğin sayfada
import { handleFormattedChange } from '../utils'; // doğru yolunuzu yazdığınızdan emin olun



function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}

// const formatCurrency = (value) => {
//     return new Intl.NumberFormat("tr-TR", {
//         style: "currency",
//         currency: "TRY",
//         minimumFractionDigits: 2,
//     }).format(value);
// };


function Calculate() {
    const [inputCount, setInputCount] = useState("");
    const [credits, setCredits] = useState("");
    const [creditsInput, setCreditsInput] = useState("");

    const [initialInput, setInitialInput] = useState("");
    const initial = useSelector((state) => state.block.initial);


    const [generatedRows, setGeneratedRows] = useState([]);
    const [tableData, setTableData] = useState([]);
    const expenses = useSelector((state) => state.expenses.expenses);
    const taxes = useSelector((state) => state.taxes.taxes);
    const { isOpen, modalType } = useSelector((state) => state.modal);
    const blockData = useSelector(selectBlockData);
    const rawBlockAmount = blockData.raw_block_amount;

    const irrValue = useSelector((state) => state.irr.irrValue);

    const prepaidExpenses = useSelector((state) => state.costs.prepaidExpenses);
    const interestPayableOnLoans = useSelector((state) => state.costs.interestPayableOnLoans);
    const taxesOnLoanInterestPayable = useSelector((state) => state.costs.taxesOnLoanInterestPayable);
    const interestCostRelatedToLoanBlockage = useSelector((state) => state.costs.interestCostRelatedToLoanBlockage);
    const totalCost = useSelector((state) => state.costs.totalCost);
    const monthlyCostIvo = useSelector((state) => state.costs.monthlyCostIvo);
    const annualCompoundCostIvo = useSelector((state) => state.costs.annualCompoundCostIvo);

    // Modalda görünen veriler için useState kullanıyoruz
    const [block, setBlock] = useState(blockData?.block || 0);
    const [blockAmount, setBlockAmount] = useState(blockData?.block_amount || 0);

    //Alert: start
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("error");

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };
    //Alert: end


    const handleInitialChange = (e) => {
        handleFormattedChange(e.target.value, setInitialInput, (val) => dispatch(setInitial(val)));
    };

    const handleCreditsChange = (e) => {
        handleFormattedChange(e.target.value, setCreditsInput, setCredits);
    };

    const handleInputCountChange = (e) => {
        const value = e.target.value;
        if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= 99)) {
            setInputCount(value);
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
        const newRows = Array.from({ length: count }, () => ({
            value1: "",
            value2: creditsInput,
        }));
        setGeneratedRows(newRows);
    }, [inputCount, creditsInput]);




    const handleInputChange = (index, field, newValue) => {
        const updatedRows = [...generatedRows];
        updatedRows[index][field] = newValue;
        setGeneratedRows(updatedRows);
    };

    const showSnackbar = (message, severity) => {
        setSnackbarMessage(message);
        setSnackbarSeverity(severity);
        setSnackbarOpen(true);
    };


    const handleSave = async () => {
        try {
            const credits = generatedRows.map((row) => parseFloat(row.value2.replace(/\./g, "").replace(",", ".")) || 0);
            const newBlock = block ? parseFloat(block) : 0;
            const newBlockAmount = parseFloat(rawBlockAmount) || 0;


            const pureExpenses = expenses.map((expense) => ({
                title: expense.title,
                amount: parseFloat(expense.rawAmount) || 0,
            }));

            const payload = {
                initial: initial,
                credits: credits,
                credit_type: creditType,
                consumer_credit_type: consumerCreditType,
                expenses: pureExpenses,
                block: newBlock,
                block_amount: newBlockAmount,
                taxes: taxes,
            };
            dispatch(setBlockData({ block: newBlock, block_amount: newBlockAmount }));
            console.log(payload);
            const tableResponse = await createTable(payload);


            if (tableResponse && tableResponse.table) {
                const parsedTable = JSON.parse(tableResponse.table);

                const formattedData = parsedTable.map((row) => ({
                    column1: row.fields.credit_amount,
                    column2: row.fields.interest,
                    column3: row.fields.tax,
                    column4: row.fields.principal_amount,
                    column5: row.fields.remaining_principal_amount,
                }));


                dispatch(setPrepaidExpenses(tableResponse.prepaid_expenses));
                dispatch(setInterestPayableOnLoans(tableResponse.interest_payable_on_loans));
                dispatch(setTaxesOnLoanInterestPayable(tableResponse.taxes_on_loan_interest_payable));
                dispatch(setInterestCostRelatedToLoanBlockage(tableResponse.interest_cost_related_to_loan_blockage));
                dispatch(setTotalCost(tableResponse.total_cost));
                dispatch(setMonthlyCostIvo(tableResponse.monthly_cost_ivo));
                dispatch(setAnnualCompoundCostIvo(tableResponse.annual_compound_cost_ivo));

                setTableData(formattedData);
                dispatch(setIrrValue(tableResponse.irr));

                showSnackbar("İşlem Başarılı", "success");

            } else {
                showSnackbar("API Yanıt Hatası", "warning");
                dispatch(setIrrValue(null));
            }
        } catch (error) {
            handleError(error, showSnackbar);
        }
    };
    useEffect(() => {
        if (blockData) {
            setBlock(blockData.block || 0);
            setBlockAmount(blockData.block_amount || 0);
        }
    }, [blockData]);

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


            {/* <Divider></Divider> */}
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
                        {/* <Typography>* Kredi Tutarı (Anapara), Diğer Masraflar, Vade Periyodu ve Ödeme Tutarını Giriniz</Typography> */}
                    </Grid>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "center", paddingBottom: '2%' }}>
                        {/* <Typography>* Faize baz gün sayısı farklılıklarından dolayı hesaplamalarda küçük farklar oluşabilir.</Typography> */}
                    </Grid>

                    <Grid container spacing={1} columns={12}>
                        <Grid item xs={12} sm={12} md={4} >
                            <Grid container spacing={1} columns={12}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4} >
                                    <TextField fullWidth variant="standard" size="small"
                                        required
                                        label="KREDİ ANAPARA"
                                        value={initialInput}
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
                                        label="VADE"
                                        value={inputCount}
                                        onChange={handleInputCountChange}
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
                                        label="GERİ ÖDEMELER"
                                        value={creditsInput}
                                        onChange={handleCreditsChange}
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

                                <Grid item xs={6} sm={3} md={3} lg={3} xl={3} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleOpenExpenseModal}
                                    >
                                        PEŞİN MASRAFLAR
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
                                        BLOKAJ
                                    </Button>
                                    {isOpen && modalType === "block" && <BlockModal />}

                                </Grid>
                                <Grid item xs={6} sm={3} md={3} lg={3} xl={3} display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        startIcon={<AddIcon />}
                                        fullWidth
                                        size="large"
                                        color="primary"
                                        onClick={handleOpenTaxesModal}

                                    >
                                        VERGİ ORANLARI
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
                            <Grid item xs={12} sm={12} md={4} >
                                <Grid container spacing={1} columns={12}>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>


                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4} sx={{ textAlign: 'center', marginTop: 'auto' }}>

                                        <Typography sx={{ fontSize: '17px', fontWeight: '500' }}>
                                            {`${index + 1} Ay Sonra :`}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
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
                            <Grid item xs={12} sm={6} md={6}>
                                <Grid container spacing={1} columns={12}>
                                    {/* <Grid item xs={12} sm={12} md={2} lg={2} xl={2} display="flex" justifyContent="flex-end">
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
                                    </Grid> */}
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


            <Grid item xs={12} sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>

                <Box sx={{ display: 'flex', justifyContent: 'center', paddingTop: '1%', paddingBottom: '1%' }}>

                    <Box sx={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        display: 'flex', justifyContent: 'center', flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                        boxShadow: '1px 1px 185px -23px rgb(78, 142, 225)',
                        webkitBoxShadow: '1px 1px 185px -23px rgba(62, 113, 240, 0.43)',
                        mozBoxShadow: '1px 1px 185px -23px rgba(101, 150, 254, 0.43)',

                    }}>


                        <Typography sx={{
                            fontWeight: '500', fontSize: {
                                xs: '14px',
                                sm: '14px',
                                md: '16px',
                                lg: '18px',
                            },
                        }} variant="h4">
                            {irrValue !== null
                                ? `  Kredi Maliyeti =  ${irrValue}`
                                : " Kredi maliyeti henüz hesaplanmadı"
                            }

                        </Typography>

                        {prepaidExpenses !== null && (
                            <Typography sx={{
                                fontWeight: '500', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                {` Peşin Ödenen Masraflar = ${prepaidExpenses}`}
                            </Typography>
                        )}

                        {interestCostRelatedToLoanBlockage !== null && (
                            <Typography sx={{
                                fontWeight: '500', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                {` Blokaj Maliyeti =  ${interestCostRelatedToLoanBlockage}`}
                            </Typography>
                        )}

                        {interestPayableOnLoans !== null && (
                            <Typography sx={{
                                fontWeight: '500', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                {` Faiz =  ${interestPayableOnLoans}`}
                            </Typography>
                        )}

                        {taxesOnLoanInterestPayable !== null && (
                            <Typography sx={{
                                fontWeight: '500', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                {` Faizi Vergileri =  ${taxesOnLoanInterestPayable}`}
                            </Typography>
                        )}



                        {totalCost !== null && (
                            <Typography sx={{
                                fontWeight: '500', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                {` TOPLAM MALİYET =  ${totalCost}`}
                            </Typography>
                        )}

                        {monthlyCostIvo !== null && (
                            <Typography sx={{
                                fontWeight: '500', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                {` Kredinin Maliyeti - Aylık =  ${monthlyCostIvo}`}
                            </Typography>
                        )}

                        {annualCompoundCostIvo !== null && (
                            <Typography sx={{
                                fontWeight: '500', fontSize: {
                                    xs: '14px',
                                    sm: '14px',
                                    md: '16px',
                                    lg: '18px',
                                },
                            }} variant="h4">
                                {` Kredinin Maliyeti - Yıllık Bileşik  = ${annualCompoundCostIvo}`}
                            </Typography>
                        )}
                    </Box>
                </Box>
            </Grid>
            <CreateTable tableData={tableData} />
        </>
    )
}

export default Calculate