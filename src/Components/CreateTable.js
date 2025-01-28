import React from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';


function CreateTable({ tableData }) {
    const theme = useTheme(); // Tema kontrolü
    const isDarkMode = theme.palette.mode === 'dark';
    const columns = [
        { field: 'column1', headerName: 'Geri Ödeme', width: 150 },
        { field: 'column2', headerName: 'Faiz', width: 150 },
        { field: 'column3', headerName: 'Vergi', width: 150 },
        { field: 'column4', headerName: 'Anapara', width: 150 },
        { field: 'column5', headerName: 'Kalan Anapara', width: 150 },
    ];

    return (
        <>
            {tableData.length > 0 && (
            <Paper sx={{ height: 400, width: '100%', backgroundColor: '#1F2A40' }}>
                <DataGrid
                    rows={tableData.map((row, index) => ({ id: index, ...row }))}
                    columns={columns}
                    pageSizeOptions={[5, 10, 20, 50]}
                    initialState={{
                        pagination: { paginationModel: { page: 0, pageSize: 5 } },
                    }}
                    checkboxSelection
                    sx={{ color: '#ffffff', 
                        border: 0,
                        '& .MuiDataGrid-row': {
                            backgroundColor: '#727681',
                            '&:nth-of-type(odd)': {
                                backgroundColor: '#1F2A40',
                            },
                            '&:hover': {
                                backgroundColor: '#a1a4ab',
                            },
                        }, '& .MuiDataGrid-container--top ': {
                            
                        },
                        '& .MuiDataGrid-toolbarContainer': {
                            backgroundColor: '#1F2A40', 
                            color: '#ffffff', 
                            '& .MuiButton-root': {
                                color: '#ffffff', 
                            },
                        },
                        '& .MuiDataGrid-container--top [role="row"]': { 
                            backgroundColor: '#1F2A40', 
                        },
                        '& .MuiDataGrid-columnHeader:hover': {
                            backgroundColor: '#357ABD', 
                        },
                        '& .MuiDataGrid-footerContainer': {
                            backgroundColor: '#1F2A40', 
                            color: '#ffffff',
                        },
                        
                        '& .MuiDataGrid-footerContainer': {
                                backgroundColor: isDarkMode ? '#1F2A40' : '#f5f5f5',
                                color: isDarkMode ? '#ffffff' : '#000000',
                                '& .MuiTablePagination-selectLabel': {
                                    display: 'none',
                                },
                            },

                    }}
                    localeText={{
                        noRowsLabel: 'Gösterilecek satır yok',
                        toolbarFilters: 'Filtreler',
                        filterPanelColumns: 'Sütunlar',
                        filterPanelOperators: 'Operatörler',
                        filterPanelOperator: 'Operatörler',
                        filterOperatorContains: 'İçerik',
                        filterPanelInputLabel: 'Değer',
                        filterPanelInputPlaceholder: 'Değer girin',
                        toolbarDensity: 'Yoğunluk',
                        toolbarDensityLabel: 'Yoğunluk',
                        toolbarDensityCompact: 'Kompakt',
                        toolbarDensityStandard: 'Standart',
                        toolbarDensityComfortable: 'Konforlu',
                        columnMenuSortAsc: 'Artan sıraya göre sırala',
                        columnMenuSortDesc: 'Azalan sıraya göre sırala',
                        columnMenuFilter: 'Filtrele',
                        columnMenuManageColumns: 'Sütunları yönet',
                        columnMenuHideColumn: 'Sütunu gizle',
                        columnMenuUnsort: 'Sıralamayı Kaldır',
                        filterOperatorDoesNotContain: 'İçermez',
                        filterOperatorEquals: 'Eşittir',
                        filterOperatorDoesNotEqual: 'Eşit Değil',
                        filterOperatorStartsWith: 'İle Başlar',
                        filterOperatorEndsWith: 'İle Biter',
                        filterOperatorIs: 'Şu',
                        filterOperatorNot: 'Şu Değil',
                        filterOperatorAfter: 'Sonra',
                        filterOperatorOnOrAfter: 'Sonra veya O Gün',
                        filterOperatorBefore: 'Önce',
                        filterOperatorOnOrBefore: 'Önce veya O Gün',
                        filterOperatorIsEmpty: 'Boş',
                        filterOperatorIsNotEmpty: 'Boş Değil',
                        filterOperatorIsAnyOf: 'Şunlardan Herhangi Biri',
                        checkboxSelectionHeaderName: 'Onay kutusu seçimi',
                        checkboxSelectionSelectAllRows: 'Tüm satırları seç',
                        checkboxSelectionUnselectAllRows: 'Tüm satırların seçimini kaldır',
                        checkboxSelectionSelectRow: 'Satırı seç',
                        checkboxSelectionUnselectRow: 'Satırın seçimini kaldır',
                        toolbarColumns: 'Sütunlar',
                        toolbarColumnsLabel: 'Sütunları seç',
                        paginationPanelRowsPerPage: 'Sayfa başına satır', 

                    }}
                    slots={{
                        toolbar: GridToolbar,
                    }}


                />
            </Paper>
             )}  
        </>

    );
}

export default CreateTable;
