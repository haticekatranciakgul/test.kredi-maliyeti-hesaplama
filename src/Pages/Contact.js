import React from 'react'
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from "@mui/material/Button";


const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));


function Contact() {
    return (
        <div>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h1" gutterBottom sx={{
                    fontSize: {
                        xs: '20px', // Varsayılan font boyutu
                        sm: '20px', // sm için font boyutu
                        md: '23px', // md için font boyutu
                        lg: '25px', // lg için font boyutu
                    },
                    fontWeight: 'bold',
                }}>
                    İLETİŞİM
                </Typography>
            </Box>
            <Divider></Divider>
            <Box sx={{
                flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
                boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 0.43)',
                webkitBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
                mozBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)', alignItems: 'center'
            }}>
                <Grid container sx={{ justifyContent: 'center' }}>
                    <Box width="50%">
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <FormGrid >
                                    <FormLabel htmlFor="first-name" required>
                                        AD
                                    </FormLabel>
                                    <OutlinedInput
                                        id="first-name"
                                        name="first-name"
                                        type="name"
                                        placeholder=""
                                        autoComplete="first name"
                                        required
                                        size="small"
                                    />
                                </FormGrid>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGrid >
                                    <FormLabel htmlFor="first-name" required>
                                        Soyad
                                    </FormLabel>
                                    <OutlinedInput
                                        id="last-name"
                                        name="last-name"
                                        type="name"
                                        placeholder=""
                                        autoComplete="first name"
                                        required
                                        size="small"
                                    />
                                </FormGrid>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGrid >
                                    <FormGrid >
                                        <FormLabel htmlFor="first-name" required>
                                            E-mail
                                        </FormLabel>
                                        <OutlinedInput
                                            id="email"
                                            name="email"
                                            type="mail"
                                            placeholder=""
                                            autoComplete="first name"
                                            required
                                            size="small"
                                        />
                                    </FormGrid>
                                </FormGrid>
                            </Grid>
                            <Grid item xs={6}>
                                <FormGrid >
                                    <FormLabel htmlFor="first-name" required>
                                        Telefon
                                    </FormLabel>
                                    <OutlinedInput
                                        id="first-name"
                                        name="first-name"
                                        type="name"
                                        placeholder=""
                                        autoComplete="first name"
                                        required
                                        size="small"
                                    />
                                </FormGrid>
                            </Grid>
                            <Grid item xs={12}>
                                <FormGrid >
                                    <FormLabel htmlFor="about-topic" required>
                                        Ne Hakkında Yazmak İstiyorsunuz?
                                    </FormLabel>
                                    <OutlinedInput
                                        id="about-topic"
                                        name="about-topic"
                                        type="name"
                                        placeholder=""
                                        autoComplete="about-topic"
                                        required
                                        size="small"
                                    />
                                </FormGrid>
                            </Grid>
                            <Grid item xs={12} sx={{ justifyContent:'center'}}>
                                <FormGrid >
                                    <Button
                                        variant="contained"
                                        sx={{ width: '30%', margin: 'auto' }}
                                        size="small"
                                        color="primary"
                                    >
                                        Gönder
                                    </Button>
                                </FormGrid>
                            </Grid>
                        </Grid>
                    </Box>
                </Grid>
            </Box>
        </div>
    )
}

export default Contact
