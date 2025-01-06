import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Table, TableBody, TableCell, TableContainer, TableHead, Box, TableRow, Paper, TablePagination } from '@mui/material';
import { saveAs } from 'file-saver';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from "@mui/material/Grid";


function CreateTable({ fetchData }) {
    const [search, setSearch] = useState('');
    const { data, status } = useSelector((state) => state.data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const filteredData = data.filter(
        (item) =>
            item.title.toLowerCase().includes(search.toLowerCase()) ||
            item.body.toLowerCase().includes(search.toLowerCase())
    );

    const handleExport = () => {
        const csvData = data
            .map((item) => `${item.id},${item.title},${item.body}`)
            .join('\n');
        const blob = new Blob([`id,title,body\n${csvData}`], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'data.csv');
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            CreateTable

            <Box>

                <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} sm={8} md={8} >
                        <TextField
                            label="Ara"
                            variant="outlined"
                            size="small"
                            style={{ margin: '20px 0' }}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                    </Grid>
                    <Grid item xs={12} sm={4} md={4} >
                        <Button variant="contained"  color="primary" size="small" onClick={handleExport}>
                            CSV Olarak Dışa Aktar
                        </Button>

                    </Grid>
                </Grid>


                {status === 'loading' && <p>Yükleniyor...</p>}
                {status === 'succeeded' && (
                    <TableContainer component={Paper} style={{ height: 400, overflowY: 'auto' }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Başlık</TableCell>
                                    <TableCell>İçerik</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => (
                                        <TableRow key={row.id}>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.body}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                {status === 'failed' && <p>Veri alınamadı!</p>}
                {filteredData.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={filteredData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Box>
        </div>
    );
}

export default CreateTable;
