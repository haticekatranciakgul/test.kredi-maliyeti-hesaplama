import React from 'react'
import { List, ListItem } from '@mui/material';
import Typography from '@mui/material/Typography';



function ListFormula() {
    return (
        <div>
            

            <List sx={{ listStyleType: 'disc', pl: 2 }}>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="h4">
                        Ct = t dönemindeki net nakit girişi
                    </Typography>

                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="h4">
                        C0 = İlk yatırım maliyeti
                    </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="h4">
                        IRR = Dahili getiri oranı
                    </Typography>
                </ListItem>
                <ListItem sx={{ display: 'list-item' }}>
                    <Typography variant="h4">
                        t = Zaman periyotlarının sayısı
                    </Typography>
                </ListItem>
            </List>

            {/* 
            <Typography variant="h4">
                Ct = t dönemindeki net nakit girişi
            </Typography>

            <Typography variant="h4">
                C0 = İlk yatırım maliyeti
            </Typography>
            <Typography variant="h4">
                IRR = Dahili getiri oranı
            </Typography>
            <Typography variant="h4">
                t = Zaman periyotlarının sayısı
            </Typography> */}

        </div>
    )
}

export default ListFormula








