import React, { useState } from 'react';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";


function SelectRadioBtn({ setConsumerCreditType, setCreditType }) {
    const [selectedOption, setSelectedOption] = useState('');
    const [subOption, setSubOption] = useState('');


    const handleMainOptionChange = (event) => {
        setSelectedOption(event.target.value);
        if (event.target.value === 'Ticari') {
            setCreditType(1);
        } else if (event.target.value === 'Bireysel') {
            setCreditType(2);
        }
    };

    // TODO: Will be converted to enum
    const handleSubOptionChange = (event) => {
        setSubOption(event.target.value);
        if (event.target.value === 'option1') {
            setConsumerCreditType(1);
        } else if (event.target.value === 'option2') {
            setConsumerCreditType(2);
        } else if (event.target.value === 'option3') {
            setConsumerCreditType(3);
        }
    };

    return (
        <div>
            <Grid container spacing={2} >
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', }} >
                    <Box sx={{ width: '40%' }}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10,
                            boxShadow: '1px 1px 185px -23px rgb(78, 142, 225)',
                            webkitBoxShadow: '1px 1px 185px -23px rgba(62, 113, 240, 0.43)',
                            mozBoxShadow: '1px 1px 185px -23px rgba(101, 150, 254, 0.43)',


                        }}>
                            <FormControl sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                    value={selectedOption}
                                    onChange={handleMainOptionChange}
                                >
                                    <FormControlLabel value="Ticari" control={<Radio />} label="Ticari" />
                                    <FormControlLabel value="Bireysel" control={<Radio />} label="Bireysel" />
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
                                            <FormControlLabel value="option1" control={<Radio />} label="İhtiyaç" />
                                            <FormControlLabel value="option2" control={<Radio />} label="Konut" />
                                            <FormControlLabel value="option3" control={<Radio />} label="Taşıt" />
                                        </RadioGroup>
                                    </div>
                                )}
                            </FormControl>


                        </Box>
                    </Box>
                </Grid>
            </Grid>


        </div>
    );
}

export default SelectRadioBtn;
