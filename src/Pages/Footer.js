import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { subscribeEmail } from '../Redux/subscriptionSlice';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FacebookIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';



export default function Footer() {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.subscription);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basit e-posta doğrulama regex'i
    if (email && emailRegex.test(email)) {
      dispatch(subscribeEmail(email));
    } else {
      setSnackbarMessage('Lütfen geçerli bir email adresi girin.');
      setSnackbarSeverity('warning');
      setSnackbarOpen(true);
    }
  };
  
  React.useEffect(() => {
    if (success) {
      setSnackbarMessage('Başarıyla abone oldunuz!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } else if (error) {
      setSnackbarMessage(error);
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  }, [success, error]);

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };


  return (
    <div
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: { xs: 1, sm: 1 },
        py: { xs: 1, sm: 1 },
        textAlign: { sm: 'center', md: 'left' },
      }}
    >
      <Container >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            paddingTop: { xs: 4, sm: 8 },
            paddingBottom: { xs: 4, sm: 8 },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              minWidth: { xs: '100%', sm: '60%' },
            }}
          >
            <Box sx={{ width: { xs: '100%', sm: '60%' } }}>

              <Typography variant="body2" gutterBottom sx={{ fontWeight: 600, mt: 2 }}>
                BİZE ULAŞIN
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                HAFTALIK BÜLTENİMİZE ABONE OLUN
              </Typography>
              <InputLabel htmlFor="email-newsletter">Email</InputLabel>
              <Stack direction="row" spacing={1} useFlexGap>
                <TextField
                  id="email-newsletter"
                  hiddenLabel
                  size="small"
                  variant="outlined"
                  fullWidth
                  aria-label="Enter your email address"
                  placeholder="Lütfen email adresinizi girin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ width: '250px' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ flexShrink: 0 }}
                  onClick={handleSubscribe}
                  disabled={loading}
                >
                  Abone Ol
                </Button>
              </Stack>
              

            </Box>

            <Link color="text.secondary" variant="body2" target="_blank" href={`https://www.linkedin.com/in/h%C3%BCseyin-ba%C4%9Fr%C4%B1yan%C4%B1k-51bb6165/?originalSubdomain=tr`}>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                Bu sayfanın geliştirilmesi ile ilgili düşüncelerinizi iletin.
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
              Ürün
            </Typography>
            <Link color="text.secondary" variant="body2" href="hakkinda">
              Özellikler
            </Link>
            <Link color="text.secondary" variant="body2" href="/iletisim">
              Görüşler
            </Link>
            <Link color="text.secondary" variant="body2" href={`/sss`}>
              Sıkça Sorulan Sorular
            </Link>
          </Box>


        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid',
            borderColor: 'divider',
          }}
        >
          <div>
            <Link color="text.secondary" variant="body2" href="#">
              Privacy Policy
            </Link>
            <Typography sx={{ display: 'inline', mx: 0.5, opacity: 0.5 }}>
              &nbsp;•&nbsp;
            </Typography>
            <Link color="text.secondary" variant="body2" href="#">
              Terms of Service
            </Link>
          </div>
          <Stack
            direction="row"
            spacing={1}
            useFlexGap
            sx={{ justifyContent: 'left', color: 'text.secondary' }}
          >
            <IconButton
              color="inherit"
              size="small"
              target="_blank"
              href="https://github.com/haticekatranciakgul"
              aria-label="GitHub"
              sx={{ alignSelf: 'center' }}
            >
              <FacebookIcon />
            </IconButton>

            <IconButton
              color="inherit"
              size="small"
              target="_blank"
              href="https://www.linkedin.com/in/haticekatranci/"
              aria-label="LinkedIn"
              sx={{ alignSelf: 'center' }}
            >
              <LinkedInIcon />
            </IconButton>
          </Stack>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>

      </Container>
    </div>
  )
}
