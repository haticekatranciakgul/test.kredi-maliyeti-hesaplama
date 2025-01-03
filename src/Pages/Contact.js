// import React from 'react'
// import Box from '@mui/material/Box';
// import { styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import FormLabel from '@mui/material/FormLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Button from "@mui/material/Button";

// import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from 'react-hook-form';
// import { FormHelperText } from '@mui/material';
// import { submitForm } from '../Redux/formSlice';


// const FormGrid = styled(Grid)(() => ({
//     display: 'flex',
//     flexDirection: 'column',
// }));


// function Contact() {
//     const { control, handleSubmit, formState: { errors } } = useForm();
//     const dispatch = useDispatch();
//     const formStatus = useSelector((state) => state.form.status);

//     const onSubmit = (data) => {

//         dispatch(submitForm(data));
//         console.log(data);
//     };

//     return (
//         <div>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Typography variant="h1" gutterBottom sx={{
//                     fontSize: {
//                         xs: '20px', // Varsayılan font boyutu
//                         sm: '20px', // sm için font boyutu
//                         md: '23px', // md için font boyutu
//                         lg: '25px', // lg için font boyutu
//                     },
//                     fontWeight: 'bold',
//                 }}>
//                     İLETİŞİM
//                 </Typography>
//             </Box>
//             <Divider></Divider>
//             <Box sx={{
//                 flexGrow: 1, p: 5, backgroundColor: 'transparent', borderRadius: 10, marginTop: '5%',
//                 boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 0.43)',
//                 webkitBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)',
//                 mozBoxShadow: '1px 1px 185px -23px rgba(0,0,0,0.43)', alignItems: 'center'
//             }}>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                     <Grid container sx={{ justifyContent: 'center' }}>
//                         <Box width="50%">
//                             <Grid container spacing={2}>
//                                 <Grid item xs={6}>
//                                     <FormGrid >
//                                         <FormLabel htmlFor="first-name" required>
//                                             AD
//                                         </FormLabel>
//                                         <OutlinedInput
//                                             id="first-name"
//                                             name="firstName"
//                                             type="name"
//                                             placeholder=""
//                                             autoComplete="first name"
//                                             required
//                                             size="small"
//                                             control={control}
//                                             defaultValue=""
//                                             rules={{ required: 'Ad zorunludur' }}
//                                             render={({ field }) => (
//                                                 <>
//                                                     <OutlinedInput {...field} placeholder="Ad" />
//                                                     {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
//                                                 </>
//                                             )}
//                                         />
//                                     </FormGrid>

//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormGrid >
//                                         <FormLabel htmlFor="first-name" required>
//                                             Soyad
//                                         </FormLabel>
//                                         <OutlinedInput
//                                             id="last-name"
//                                             type="name"
//                                             placeholder=""
//                                             autoComplete="first name"
//                                             required
//                                             size="small"
//                                             name="lastName"
//                                             control={control}
//                                             defaultValue=""
//                                             rules={{ required: 'Soyad zorunludur' }}
//                                             render={({ field }) => (
//                                               <>
//                                                 <OutlinedInput {...field} placeholder="Soyad" />
//                                                 {errors.lastName && <FormHelperText error>{errors.lastName.message}</FormHelperText>}
//                                               </>
//                                             )}
//                                         />
//                                     </FormGrid>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormGrid >
//                                         <FormGrid >
//                                             <FormLabel htmlFor="first-name" required>
//                                                 E-mail
//                                             </FormLabel>
//                                             <OutlinedInput
//                                                 id="email"
//                                                 type="mail"
//                                                 placeholder=""
//                                                 autoComplete="first name"
//                                                 required
//                                                 size="small"
//                                                 name="email"
//                                                 control={control}
//                                                 defaultValue=""
//                                                 rules={{
//                                                   required: 'E-posta zorunludur',
//                                                   pattern: { value: /^\S+@\S+$/i, message: 'Geçerli bir e-posta giriniz' }
//                                                 }}
//                                                 render={({ field }) => (
//                                                   <>
//                                                     <OutlinedInput {...field} placeholder="E-posta" />
//                                                     {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
//                                                   </>
//                                                 )}
//                                             />
//                                         </FormGrid>
//                                     </FormGrid>
//                                 </Grid>
//                                 <Grid item xs={6}>
//                                     <FormGrid >
//                                         <FormLabel htmlFor="first-name" required>
//                                             Telefon
//                                         </FormLabel>
//                                         <OutlinedInput
//                                             id="phone"
//                                             type="name"
//                                             placeholder=""
//                                             autoComplete="first name"
//                                             required
//                                             size="small"
//                                             name="phone"
//                                             control={control}
//                                             defaultValue=""
//                                             rules={{
//                                               required: 'Telefon zorunludur',
//                                               pattern: { value: /^[0-9]{10}$/, message: 'Geçerli bir telefon giriniz' }
//                                             }}
//                                             render={({ field }) => (
//                                               <>
//                                                 <OutlinedInput {...field} placeholder="Telefon" />
//                                                 {errors.phone && <FormHelperText error>{errors.phone.message}</FormHelperText>}
//                                               </>
//                                             )}
//                                         />
//                                     </FormGrid>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <FormGrid >
//                                         <FormLabel htmlFor="about-topic" required>
//                                             Ne Hakkında Yazmak İstiyorsunuz?
//                                         </FormLabel>
//                                         <OutlinedInput
//                                             id="about-topic"
//                                             type="name"
//                                             placeholder=""
//                                             autoComplete="about-topic"
//                                             required
//                                             size="small"
//                                             name="about"
//                                             control={control}
//                                             defaultValue=""
//                                             rules={{ required: 'Bu alan zorunludur' }}
//                                             render={({ field }) => (
//                                               <>
//                                                 <OutlinedInput {...field} placeholder="Ne hakkında yazmak istiyorsunuz?" />
//                                                 {errors.about && <FormHelperText error>{errors.about.message}</FormHelperText>}
//                                               </>
//                                             )}
//                                         />
//                                     </FormGrid>
//                                 </Grid>
//                                 <Grid item xs={12} sx={{ justifyContent: 'center' }}>
//                                     <FormGrid >
//                                         <Button
//                                             variant="contained"
//                                             sx={{ width: '30%', margin: 'auto' }}
//                                             size="small"
//                                             color="primary"
//                                             type="submit"
//                                             disabled={formStatus === 'loading'}
//                                         >
//                                               {formStatus === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
//                                         </Button>
//                                     </FormGrid>
//                                 </Grid>
//                             </Grid>
//                         </Box>
//                     </Grid>

//                 </form>

//             </Box>
//         </div>
//     )
// }

// export default Contact



// import React from 'react';
// import { useForm, Controller } from 'react-hook-form';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import Divider from '@mui/material/Divider';
// import FormLabel from '@mui/material/FormLabel';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Button from "@mui/material/Button";
// import FormHelperText from '@mui/material/FormHelperText';
// import { useDispatch, useSelector } from 'react-redux';
// import { submitForm } from '../Redux/formSlice';

// function Contact() {
//     const { control, handleSubmit, formState: { errors } } = useForm();
//     const dispatch = useDispatch();
//     const formStatus = useSelector((state) => state.form.status);

//     const onSubmit = (data) => {
//         dispatch(submitForm(data));
//         console.log('Gönderilen Veriler:', data);
//     };

//     return (
//         <div>
//             <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <Typography variant="h1" gutterBottom sx={{ fontSize: 25, fontWeight: 'bold' }}>
//                     İLETİŞİM
//                 </Typography>
//             </Box>
//             <Divider />
//             <Box sx={{ flexGrow: 1, p: 5, marginTop: '5%', boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 0.43)', borderRadius: 10, justifyContent: 'center', margin: 'auto' }}>


//                 <Box width="50%">
//                     <form onSubmit={handleSubmit(onSubmit)}>
//                         <Grid container spacing={2}>
//                             <Grid item xs={12}>
//                                 <Controller
//                                     name="firstName"
//                                     control={control}
//                                     defaultValue=""
//                                     rules={{ required: 'Ad zorunludur' }}
//                                     render={({ field }) => (
//                                         <OutlinedInput {...field} placeholder="Ad" />
//                                     )}
//                                 />
//                                 {errors.firstName && <FormHelperText error>{errors.firstName.message}</FormHelperText>}
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Controller
//                                     name="lastName"
//                                     control={control}
//                                     defaultValue=""
//                                     rules={{ required: 'Soyad zorunludur' }}
//                                     render={({ field }) => (
//                                         <OutlinedInput {...field} placeholder="Soyad" />
//                                     )}
//                                 />
//                                 {errors.lastName && <FormHelperText error>{errors.lastName.message}</FormHelperText>}
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Controller
//                                     name="email"
//                                     control={control}
//                                     defaultValue=""
//                                     rules={{
//                                         required: 'E-posta zorunludur',
//                                         pattern: {
//                                             value: /^\S+@\S+$/i,
//                                             message: 'Geçerli bir e-posta adresi giriniz'
//                                         }
//                                     }}
//                                     render={({ field }) => (
//                                         <OutlinedInput {...field} placeholder="E-posta" />
//                                     )}
//                                 />
//                                 {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <Controller
//                                     name="phone"
//                                     control={control}
//                                     defaultValue=""
//                                     rules={{
//                                         required: 'Telefon zorunludur',
//                                         pattern: {
//                                             value: /^[0-9]{10}$/,
//                                             message: '10 haneli geçerli bir telefon giriniz'
//                                         }
//                                     }}
//                                     render={({ field }) => (
//                                         <OutlinedInput {...field} placeholder="Telefon" />
//                                     )}
//                                 />
//                                 {errors.phone && <FormHelperText error>{errors.phone.message}</FormHelperText>}
//                             </Grid>
//                             <Grid item xs={12}>
//                                 <FormLabel>Ne Hakkında Yazmak İstiyorsunuz?</FormLabel>
//                                 <Controller
//                                     name="about"
//                                     control={control}
//                                     defaultValue=""
//                                     rules={{ required: 'Bu alan zorunludur' }}
//                                     render={({ field }) => (
//                                         <OutlinedInput {...field} placeholder="Ne hakkında yazmak istiyorsunuz?" />
//                                     )}
//                                 />
//                                 {errors.about && <FormHelperText error>{errors.about.message}</FormHelperText>}
//                             </Grid>
//                             <Grid item xs={12} sx={{ textAlign: 'center' }}>
//                                 <Button
//                                     variant="contained"
//                                     color="primary"
//                                     type="submit"
//                                     disabled={formStatus === 'loading'}
//                                 >
//                                     {formStatus === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
//                                 </Button>
//                             </Grid>
//                         </Grid>
//                     </form>


//                 </Box>

//             </Box>
//         </div>
//     );
// }

// export default Contact;






import React from 'react';
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

const FormGrid = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}));

function Contact() {
    const { control, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const formStatus = useSelector((state) => state.form.status);

    const onSubmit = (data) => {
        dispatch(submitForm(data));
        console.log(data);
    };

    return (
        <div>
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
                boxShadow: '1px 1px 185px -23px rgba(0, 0, 0, 0.43)',
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
                                            defaultValue=""
                                            rules={{ required: 'Bu alan zorunludur' }}
                                            render={({ field }) => (
                                                <OutlinedInput {...field} placeholder="Ne hakkında yazmak istiyorsunuz?" size="small" />
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
                                        type="submit"
                                        disabled={formStatus === 'loading'}
                                    >
                                        {formStatus === 'loading' ? 'Gönderiliyor...' : 'Gönder'}
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
