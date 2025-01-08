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
            setConsumerCreditType(1);
        } else if (event.target.value === 'Bireysel') {
            setConsumerCreditType(2);
        }
    };

    // TODO: Will be converted to enum
    const handleSubOptionChange = (event) => {
        setSubOption(event.target.value);
        if (event.target.value === 'option1') {
            setCreditType(1);
        } else if (event.target.value === 'option2') {
            setCreditType(2);
        } else if (event.target.value === 'option3') {
            setCreditType(3);
        }
    };

    return (
        <div>
            <Grid container spacing={2} >
                <Grid item xs={12} sx={{display: 'flex', justifyContent: 'center',}} >
                    <Box sx={{ width:'40%'}}>
                        <Box sx={{
                            display: 'flex', justifyContent: 'center', flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10,
                            boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 1)',
                            webkitBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
                            mozBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
                           

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
                                            <FormControlLabel value="option1" control={<Radio />} label="Seçenek 1" />
                                            <FormControlLabel value="option2" control={<Radio />} label="Seçenek 2" />
                                            <FormControlLabel value="option3" control={<Radio />} label="Seçenek 3" />
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
