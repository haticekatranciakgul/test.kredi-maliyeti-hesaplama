export const handleError = (error, showSnackbar) => {
    showSnackbar("API Yanıt Hatası: " + error.response.data.error, "error");
};

export const handleBusinessError = (error, showSnackbar) => {
    showSnackbar("API Yanıt Hatası: " , "error");

};



// utils.js veya benzeri bir dosyada
export const handleFormattedChange = (value, setFormattedState, setRawState) => {
    value = value.replace(/[^0-9,]/g, "");
    let parts = value.split(",");
    let integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    let formattedValue = parts.length > 1 ? integerPart + "," + parts[1] : integerPart;
    let rawValue = value.replace(/\./g, "").replace(",", ".");
    setFormattedState(formattedValue);
    setRawState(rawValue);
};
