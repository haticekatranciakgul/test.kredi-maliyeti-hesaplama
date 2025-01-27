export const handleError = (error, showSnackbar) => {
    showSnackbar("API Yanıt Hatası: " + error.response.data.error, "error");
};

export const handleBusinessError = (error, showSnackbar) => {
    showSnackbar("API Yanıt Hatası: " , "error");

};

