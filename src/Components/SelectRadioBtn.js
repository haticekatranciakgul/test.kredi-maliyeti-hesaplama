import React from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup, styled } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useDispatch } from 'react-redux';
import { setTaxes } from '../Redux/slices/taxesSlice';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

const CustomRadio = styled(Radio)(({ theme }) => ({
    "&.Mui-checked": {
        color: theme.palette.mode === "dark" ? "#3173db" : undefined,

    },
}));


function SelectRadioBtn({ setConsumerCreditType, setCreditType }) {
    const [selectedOption, setSelectedOption] = React.useState('Ticari');
    const [subOption, setSubOption] = React.useState('option1');
    const dispatch = useDispatch();



    const handleMainOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'Ticari') {
            setCreditType(1);
            setConsumerCreditType(1);
            dispatch(setTaxes([
                { id: 0, title: 'BSMV', amount: '5' },
                { id: 1, title: 'KKDF', amount: '0' }
            ]));
        } else if (event.target.value === 'Bireysel') {
            setCreditType(2);
        }
    };


    const handleSubOptionChange = (event) => {
        setSubOption(event.target.value);
        if (event.target.value === 'option1') {
            setConsumerCreditType(1);
            dispatch(setTaxes([
                { id: 0, title: 'BSMV', amount: '10' },
                { id: 1, title: 'KKDF', amount: '15' }
            ]));
        } else if (event.target.value === 'option2') {
            setConsumerCreditType(2);
            dispatch(setTaxes([
                { id: 0, title: 'BSMV', amount: '20' },
                { id: 1, title: 'KKDF', amount: '25' }
            ]));
        } else if (event.target.value === 'option3') {
            setConsumerCreditType(3);
            dispatch(setTaxes([
                { id: 0, title: 'BSMV', amount: '30' },
                { id: 1, title: 'KKDF', amount: '35' }
            ]));
        }
    };

    return (
        <div>
            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'center', }} >
                <Grid item xs={12} md={6} lg={4} sx={{ display: 'flex', justifyContent: 'center', }} >
                    <Box sx={{
                        justifyContent: 'center', flexGrow: 1, p: 5, marginTop: '10px', backgroundColor: 'transparent', borderRadius: 10,
                        boxShadow: '1px 1px 185px -23px rgb(78, 142, 225)',
                        webkitBoxShadow: '1px 1px 185px -23px rgba(62, 113, 240, 0.43)',
                        mozBoxShadow: '1px 1px 185px -23px rgba(101, 150, 254, 0.43)',
                    }}>
                        <Grid item xs={12} >
                            <Typography variant="h5" component="div"
                                sx={{ display: 'flex', 
                                justifyContent: 'center', 
                                fontWeight: '500', p: 1,
                                }}>
                                KREDİ TÜRÜ
                            </Typography>
                            <Divider></Divider>
                        </Grid>
                        <FormControl sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>

                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={selectedOption}
                                onChange={handleMainOptionChange}
                            >
                                <FormControlLabel value="Ticari" control={<CustomRadio />} label="Ticari" />
                                <FormControlLabel value="Bireysel" control={<CustomRadio />} label="Bireysel" />
                            </RadioGroup>
                            {selectedOption === 'Bireysel' && (
                                <div>
                                    <RadioGroup
                                        row
                                        aria-labelledby="bireysel-options-group-label"
                                        name="bireysel-options-group"
                                        value={subOption}
                                        onChange={handleSubOptionChange}
                                    >
                                        <FormControlLabel value="option1" control={<CustomRadio />} label="İhtiyaç" />
                                        <FormControlLabel value="option2" control={<CustomRadio />} label="Konut" />
                                        <FormControlLabel value="option3" control={<CustomRadio />} label="Taşıt" />
                                    </RadioGroup>
                                </div>
                            )}
                        </FormControl>


                    </Box>

                </Grid>
            </Grid>


        </div>
    );
}

export default SelectRadioBtn;
