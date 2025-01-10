import React from 'react';
import { Box, Typography } from '@mui/material';

const AnimatedText = () => {
    const text = "HER ŞEY DAHİL YILLIK BİLEŞİK KREDİ MALİYETİNİZİ KOLAYCA HESAPLAYIN! YANILMAYIN!";
    
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', overflow: 'hidden', paddingBottom: '',
            paddingTop: '2%' }}>
            {text.split('').map((char, index) => (
                <Typography
                    key={index}
                    variant="h1"
                    sx={{
                        fontSize: {
                            xs: '10px',
                            sm: '12px',
                            md: '14px',
                            lg: '16px',
                        },
                        fontWeight: 'bold',
                        animation: `dropIn 0.5s ease-in-out ${index * 0.05}s forwards`,
                        opacity: 0,
                        display: 'inline-block',
                    }}
                >
                    {char === ' ' ? '\u00A0' : char} {/* Boşluk için doğru işleme */}
                </Typography>
            ))}
            <style>
                {`
                @keyframes dropIn {
                    0% {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    100% {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                `}
            </style>
        </Box>
    );
};

export default AnimatedText;
