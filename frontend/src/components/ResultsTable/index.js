import React, {useState, useRef} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


export const ResultsTable = (props) => {

    function createData(websiteName, foundData) {
        return { websiteName, foundData };
    }
    
    const rows = []
    var i = 0

    const rrdata = JSON.parse(props.results)

    for (let website in rrdata) {
        if (rrdata[website].length > 0) {

            var message = 'Oh no ! We found the following information of yours on this website : \n'
            for (let dataPiece in rrdata[website]) {
                if (dataPiece != 'Profile Link')

                    message += rrdata[website][dataPiece] +"," + '\n '
            }
            rows[i] = createData(website, message)
            i++
        }
        else {
            var message = 'You’re all clear - we did not find your data on ' + rrdata[website]
            rows[i] = createData(website, message)
            i++
        }
    }

    return (
        <TableContainer component={Paper} className='results-table'>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" >
            <TableBody>
            {rows.map((row) => (
                <TableRow
                key={row.websiteName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell style={{fontWeight:'600'}} component="th" scope="row" className='table-cell'>
                    {row.websiteName}
                </TableCell>
                <TableCell style={{
                    backgroundColor: (row.websiteName.length > 0) ? '#fc7462' : '#78ffb9',
                    fontFamily: 'Montserrat',
                }}
                align="left">
                    {row.foundData}
                </TableCell>
                {/* <TableCell class='button-cell'>
                
                
                {
                (props.results[row.websiteName].length > 0) ? 
                    <button>Check Yourself</button>
                        :
                    <button>Manually remove yourself</button>
                }
                </TableCell> */}

                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    );
}

export default ResultsTable
