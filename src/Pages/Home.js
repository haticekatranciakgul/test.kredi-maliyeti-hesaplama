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

const Home = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const [inputCount, setInputCount] = useState("");
  const [sharedValue, setSharedValue] = useState("");
  const [creditAmount, setCreditAmount] = useState("");
  const [otherExpenses, setOtherExpenses] = useState("");
  const [generatedRows, setGeneratedRows] = useState([]);

  useEffect(() => {
    const count = parseInt(inputCount) || 0;
    if (sharedValue) {
      const newRows = Array.from({ length: count }, () => ({
        value1: "",
        value2: sharedValue,
      }));
      setGeneratedRows(newRows);
    }
  }, [inputCount, sharedValue]);

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
      const paymentArray = Array(parseInt(inputCount) || 0).fill(sharedValue);
      const payload = {
        creditAmount,
        otherExpenses,
        installmentPeriod: inputCount,
        paymentArray,
        additionalRows: generatedRows,
      };

      // Fake API POST request
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", payload);
      console.log("Data saved successfully:", response.data);
      alert("Veriler başarıyla kaydedildi.");
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Veriler kaydedilirken bir hata oluştu.");
    }
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="md" sx={{ minHeight: "42vh", marginTop: "2%" }}>

          <Box sx={{ flexGrow: 1, backgroundColor: "#", p: 5 }}>

            <Grid container spacing={2}>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <Typography sx={{ fontSize: "90px" }} gutterBottom>
                  LOREM İPSUM
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  label="Kredi Tutarı"
                  value={creditAmount}
                  onChange={(e) => setCreditAmount(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  label="Diğer Masraflar"
                  value={otherExpenses}
                  onChange={(e) => setOtherExpenses(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  label="Vade Periyodu"
                  value={inputCount}
                  onChange={(e) => setInputCount(e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  required
                  label="Ödeme Tutarı"
                  value={sharedValue}
                  onChange={(e) => setSharedValue(e.target.value)}
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
                      <TextField
                        fullWidth
                        value={row.value1}
                        onChange={(e) =>
                          handleInputChange(index, "value1", e.target.value)
                        }
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        fullWidth
                        value={row.value2}
                        onChange={(e) =>
                          handleInputChange(index, "value2", e.target.value)
                        }
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
