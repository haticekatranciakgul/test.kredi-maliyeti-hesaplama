import React from 'react'

function CreateTable({ tableData }) {


    //kolon adları: geri ödeme, faiz, vergi, anapara, kalan anapara
    return (
        <div>
            {tableData.length > 0 && (
                <table>
                    <thead>
                        <tr>
                            <th>geri ödeme</th>
                            <th>faiz</th>
                            <th>vergi</th>
                            <th>anapara</th>
                            <th>anapara</th>
                            {/* Tablo başlıklarını buraya ekle */}
                        </tr>
                    </thead>
                    <tbody>
                        {tableData.map((row, index) => (
                            <tr key={index}>
                                <td>{row.column1}</td>
                                <td>{row.column2}</td>
                                <td>{row.column3}</td>
                                <td>{row.column4}</td>
                                <td>{row.column4}</td>
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
