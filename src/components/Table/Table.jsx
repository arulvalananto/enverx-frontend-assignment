import React from 'react';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableContainer from '@mui/material/TableContainer';

const CustomTable = ({ rows }) => {
    return (
        <Paper
            sx={{
                width: '100%',
                overflow: 'auto',
                bgcolor: 'inherit',
                color: 'inherit',
            }}
        >
            <TableContainer
                component={Paper}
                sx={{
                    width: '100%',
                    backgroundColor: 'inherit',
                    color: 'inherit',
                }}
            >
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ color: 'inherit' }}>
                                Description
                            </TableCell>
                            <TableCell align="left" sx={{ color: 'inherit' }}>
                                Category
                            </TableCell>
                            <TableCell align="left" sx={{ color: 'inherit' }}>
                                Amount (in dollars)
                            </TableCell>
                            <TableCell
                                align="left"
                                sx={{
                                    color: 'inherit',
                                    '@media (max-width: 780px)': {
                                        display: 'none',
                                    },
                                }}
                            >
                                Transaction at
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{
                                    '&:last-child td, &:last-child th': {
                                        border: 0,
                                    },
                                }}
                            >
                                <TableCell
                                    align="left"
                                    sx={{ color: 'inherit' }}
                                >
                                    {row.description}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{ color: 'inherit' }}
                                >
                                    {row.category}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        color:
                                            row.type === 'expense'
                                                ? 'red'
                                                : 'green',
                                    }}
                                >
                                    {row.amount}
                                </TableCell>
                                <TableCell
                                    align="left"
                                    sx={{
                                        color: 'inherit',
                                        '@media (max-width: 780px)': {
                                            display: 'none',
                                        },
                                    }}
                                >
                                    {row.updatedAt instanceof Date
                                        ? new Date(
                                              row.updatedAt
                                          ).toLocaleString('en-IN', {
                                              timeZone: 'IST',
                                          })
                                        : new Date(
                                              row.updatedAt.seconds * 1000
                                          ).toLocaleString('en-IN', {
                                              timeZone: 'IST',
                                          })}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default CustomTable;
