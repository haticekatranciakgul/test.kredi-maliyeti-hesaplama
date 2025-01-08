// import React from 'react'


// function CreateTable({ tableData }) {


//     //kolon adları: geri ödeme, faiz, vergi, anapara, kalan anapara
//     return (
//         <div>
//             {tableData.length > 0 && (
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>geri ödeme</th>
//                             <th>faiz</th>
//                             <th>vergi</th>
//                             <th>anapara</th>
//                             <th>anapara</th>
//                             {/* Tablo başlıklarını buraya ekle */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {tableData.map((row, index) => (
//                             <tr key={index}>
//                                 <td>{row.column1}</td>
//                                 <td>{row.column2}</td>
//                                 <td>{row.column3}</td>
//                                 <td>{row.column4}</td>
//                                 <td>{row.column4}</td>
//                                 {/* Tablo verilerini buraya ekle */}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     )
// }

// export default CreateTable





import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

function CreateTable({ tableData }) {
    
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
        <Paper sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={tableData.map((row, index) => ({ id: index, ...row }))}
                columns={columns}
                pageSizeOptions={[5, 10, 20, 50]}
                initialState={{
                    pagination: { paginationModel: { page: 0, pageSize: 5 } },
                }}
                checkboxSelection
                sx={{ border: 0 }}
            />
        </Paper>
    )}
        </>
      
    );
}

export default CreateTable;
