import React from 'react'

function CreateTable({ tableData }) {



    return (
        <div>
            {tableData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>Column 1</th>
                            <th>Column 2</th>
                            <th>Column 3</th>
                            {/* Tablo başlıklarını buraya ekle */}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.column1}</td>
                                <td>{row.column2}</td>
                                <td>{row.column3}</td>
                                {/* Tablo verilerini buraya ekle */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    )
}

export default CreateTable
