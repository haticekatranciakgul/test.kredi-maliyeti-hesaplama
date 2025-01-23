import React, { useEffect } from "react";
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { FormHelperText } from '@mui/material';
import { submitForm } from '../Redux/formSlice';
import TextArea from '../Components/TextArea';
import { setSnackbarOpen } from "../Redux/formSlice"; // doğru yolu kullan
import { Alert, Snackbar } from "@mui/material";
import Slide from '@mui/material/Slide';


function SlideTransition(props) {
    return <Slide {...props} direction="left" />;
}


const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

function Contact() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();

    const onSubmit = (data) => {
        dispatch(submitForm(data));
        //console.log(data);
    };


    const snackbarOpen = useSelector((state) => state.form.snackbarOpen);
    const snackbarMessage = useSelector((state) => state.form.snackbarMessage);
    const snackbarSeverity = useSelector((state) => state.form.snackbarSeverity);

    const handleSnackbarClose = () => {
        dispatch(setSnackbarOpen(false));
    };

    useEffect(() => {
        // Eğer snackbar 1 saniye açık kalacaksa, zamanlayıcı ile kapanmasını sağla
        if (snackbarOpen) {
            const timer = setTimeout(() => {
                dispatch(setSnackbarOpen(false));
            }, 3000); // 3 saniye

            return () => clearTimeout(timer); // cleanup
        }
    }, [snackbarOpen, dispatch]);

    return (
        <div>
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h1" gutterBottom sx={{
                    fontSize: {
                        xs: '20px',
                        sm: '20px',
                        md: '23px',
                        lg: '25px',
                    },
                    fontWeight: 'bold',
                }}>
                    İLETİŞİM
                </Typography>
            </Box>
            <Divider />
            <Box sx={{
                flexGrow: 1,
                p: 5,
                backgroundColor: 'transparent',
                borderRadius: 10,
                marginTop: '5%',
                boxShadow: '1px 1px 185px -23px rgb(78, 142, 225)',
                webkitBoxShadow: '1px 1px 185px -23px rgba(62, 113, 240, 0.43)',
                mozBoxShadow: '1px 1px 185px -23px rgba(101, 150, 254, 0.43)',
                alignItems: 'center',
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container sx={{ justifyContent: 'center' }}>
                        <Box width="50%">
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FormGrid>
                                        <FormLabel htmlFor="first-name" required>
                                            Ad
                                        </FormLabel>
                                        <Controller
                                            name="firstName"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Ad zorunludur' }}
                                            render={({ field }) => (
                                                <OutlinedInput {...field} placeholder="Ad" size="small" />
                                            )}
                                        />
                                        {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
                                    </FormGrid>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGrid>
                                        <FormLabel htmlFor="last-name" required>
                                            Soyad
                                        </FormLabel>
                                        <Controller
                                            name="lastName"
                                            control={control}
                                            defaultValue=""
                                            rules={{ required: 'Soyad zorunludur' }}
                                            render={({ field }) => (
                                                <OutlinedInput {...field} placeholder="Soyad" size="small" />
                                            )}
                                        />
                                        {errors.lastName && <FormHelperText error>{errors.lastName.message}</FormHelperText>}
                                    </FormGrid>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGrid>
                                        <FormLabel htmlFor="email" required>
                                            E-mail
                                        </FormLabel>
                                        <Controller
                                            name="email"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'E-posta zorunludur',
                                                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Geçerli bir e-posta giriniz' },
                                            }}
                                            render={({ field }) => (
                                                <OutlinedInput {...field} placeholder="E-posta" size="small" />
                                            )}
                                        />
                                        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                                    </FormGrid>
                                </Grid>
                                <Grid item xs={6}>
                                    <FormGrid>
                                        <FormLabel htmlFor="phone" required>
                                            Telefon
                                        </FormLabel>
                                        <Controller
                                            name="phone"
                                            control={control}
                                            defaultValue=""
                                            rules={{
                                                required: 'Telefon zorunludur',
                                                // pattern: { value: /^[0-9]{10}$/, message: 'Geçerli bir telefon giriniz' },
                                            }}
                                            render={({ field }) => (
                                                <OutlinedInput {...field} placeholder="Telefon" size="small" />
                                            )}
                                        />
                                        {errors.phone && <FormHelperText error>{errors.phone.message}</FormHelperText>}
                                    </FormGrid>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGrid>
                                        <FormLabel htmlFor="about-topic" required>
                                            Ne Hakkında Yazmak İstiyorsunuz?
                                        </FormLabel>
                                        <Controller
                                            name="about"
                                            control={control}
                                            defaultValue="" fullWidth
                                            rules={{ required: 'Bu alan zorunludur' }}
                                            render={({ field }) => (
                                                <TextArea
                                                    {...field}

                                                />
                                            )}
                                        />

                                        {errors.about && <FormHelperText error>{errors.about.message}</FormHelperText>}
                                    </FormGrid>
                                </Grid>
                                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                                    <Button
                                        variant="contained"
                                        sx={{ width: '30%' }}
                                        size="small"
                                        color="primary"
                                    >
                                        Gönder
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </form>
            </Box>
        </div>
    );
}

export default Contact;
