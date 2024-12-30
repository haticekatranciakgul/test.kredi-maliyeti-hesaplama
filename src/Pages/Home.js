import React, { useContext, useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ColorModeContext } from "../theme";
import { ThemeProvider, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import Typography from "@mui/material/Typography";
import { BASE_URL } from "../api";

const Home = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [inputCount, setInputCount] = useState("");
  const [credits, setcredits] = useState("");
  const [initial, setInitial] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");
  const [generatedRows, setGeneratedRows] = useState([]);
  const [irrValue, setIrrValue] = useState(null); 


  useEffect(() => {
    const fetchIrrValue = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/credits/create`,
          {
            initial: parseFloat(initial) || 0,
            credits: generatedRows.map((row) => parseFloat(row.value2) || 0),
          }
          
        );
        setIrrValue(response.data.irr);
        
      } catch (error) {
        if (error.response) {
          console.error("API Yanıt Hatası:", error.response);
          console.log("Hata Kodu:", error.response.status);
          console.log("Hata Mesajı:", error.response.data);
        } else if (error.request) {
          console.error("API İsteği Hatası:", error.request);
        } else {
          console.error("API Hatası:", error.message);
        }
        setIrrValue(null);
      }
    };
  
    if (initial && otherExpenses && inputCount && generatedRows.length > 0) {
      fetchIrrValue();
    }
  }, [initial, otherExpenses, inputCount, generatedRows]);
  


  useEffect(() => {
    const count = parseInt(inputCount) || 0;
    if (credits) {
      const newRows = Array.from({ length: count }, () => ({
        value1: "",
        value2: credits,
      }));
      setGeneratedRows(newRows);
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
      };

      const response = await axios.post(`${BASE_URL}/api/v1/credits/create`, payload);
      if (response.data && response.data.irr !== undefined) {
        setIrrValue(response.data.irr);
      } else {
        console.error("IRR değeri yanıt verisi içinde bulunamadı.");
        setIrrValue(null);
      }
      alert("Veriler başarıyla kaydedildi.");
    } catch (error) {
      if (error.response) {
        console.error("API yanıt hatası:", error.response);
      } else if (error.request) {
        console.error("API isteği hatası:", error.request);
      } else {
        console.error("API hatası:", error.message);
      }
      alert("Veriler kaydedilirken bir hata oluştu.");
    }
  };
  


  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ minHeight: "60vh", marginTop: "12%" }}>
          <Box sx={{ flexGrow: 1, backgroundColor: "#", p: 5 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "60px" }} gutterBottom>
                  IRR HESAPLAMA
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography>
                  {irrValue !== null
                    ? `Hesaplanan IRR: ${irrValue}`
                    : "IRR değeri henüz hesaplanmadı."}
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <TextField
                  required
                  label="Kredi Tutarı"
                  value={initial}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      setInitial(value);
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  label="Diğer Masraflar"
                  value={otherExpenses}
                  onChange={(e) => {

                    const value = e.target.value;
                    if (/^\d*\.?\d*$/.test(value)) {
                      setOtherExpenses(value);
                    }
                  }}
                  inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*'
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
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
                />

              </Grid>
              <Grid item xs={2}>
                <TextField
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
                />
              </Grid>
              <Grid item xs={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  fullWidth
                  size="small"
                  color="primary"
                  onClick={handleAddRow}
                >
                  EKLE
                </Button>
              </Grid>
              <Grid item xs={2} display="flex" justifyContent="flex-end">
                <Button
                  variant="contained"
                  fullWidth
                  size="small"
                  color="primary"
                  onClick={handleSave}
                >
                  KAYDET
                </Button>
              </Grid>
            </Grid>
            <Box mt={4}>
              <Grid container spacing={2}>
                {generatedRows.map((row, index) => (
                  <React.Fragment key={index}>

                    <Grid item xs={5}>
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
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
                    <Grid
                      item
                      xs={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                    >
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteRow(index)}
                      >
                        SİL
                      </Button>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default Home;
