// Editable Enhanced Table with Inline Editing in MUI (Professional UI)
import * as React from 'react';
import PropTypes from 'prop-types';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Toolbar, Typography, Paper,
  IconButton, TextField, Button, Stack
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

function createData(id, name, designation, role, department, phone) {
  return { id, name, designation, role, department, phone };
}

const initialRows = [
  createData(1, 'David Billa', 'Manager', 'Admin', 'Operations', 9876543210),
  createData(2, 'Steve Rogers', 'Team Lead', 'Developer', 'Engineering', 9123456789),
  createData(3, 'Baasha', 'Senior Analyst', 'Data Analyst', 'Data Science', 9988776655),
  createData(4, 'Bruce Wayne', 'CEO', 'Executive', 'Management', 9876501234),
  createData(5, 'Deva', 'HR Executive', 'HR', 'Human Resources', 9012345678),
  createData(6, 'Leo Das', 'DevOps Engineer', 'Engineer', 'Infrastructure', 7894561230),
  createData(7, 'Vikram', 'Product Owner', 'Product Manager', 'Product', 8765432109),
  createData(8, 'Tony Stark', 'CTO', 'Executive', 'Technology', 9988665544),
];

const headCells = [
  { id: 'id', numeric: true, label: 'ID' },
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'designation', numeric: false, label: 'Designation' },
  { id: 'role', numeric: false, label: 'Role' },
  { id: 'department', numeric: false, label: 'Department' },
  { id: 'phone', numeric: true, label: 'Phone No.' },
  { id: 'action', numeric: false, label: 'Action' }
];

export default function EditableTable() {
  const [rows, setRows] = React.useState(initialRows);
  const [editRowId, setEditRowId] = React.useState(null);
  const [editData, setEditData] = React.useState({});

  const handleEditClick = (id) => {
    const row = rows.find((row) => row.id === id);
    setEditRowId(id);
    setEditData({ ...row });
  };

  const handleEditChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  const handleSaveClick = (id) => {
    const updatedRows = rows.map((row) =>
      row.id === id ? { ...editData, id } : row
    );
    setRows(updatedRows);
    setEditRowId(null);
  };

  const handleCancelClick = () => {
    setEditRowId(null);
    setEditData({});
  };

  return (
    <Box sx={{ width: '100%', px: 3, py: 4, bgcolor: '#f9f9f9', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ width: '100%', mb: 2, borderRadius: 3 }}>
        <Toolbar sx={{ bgcolor: '#a9d2fbff', color: '#000', borderTopLeftRadius: 12, borderTopRightRadius: 12 }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            USER DETAILS
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f1f1f1' }}>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    sx={{ fontWeight: 'bold' }}
                  >
                    {headCell.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell align="right">{row.id}</TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <TextField
                        value={editData.name}
                        onChange={(e) => handleEditChange(e, 'name')}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      row.name
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <TextField
                        value={editData.designation}
                        onChange={(e) => handleEditChange(e, 'designation')}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      row.designation
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <TextField
                        value={editData.role}
                        onChange={(e) => handleEditChange(e, 'role')}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      row.role
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <TextField
                        value={editData.department}
                        onChange={(e) => handleEditChange(e, 'department')}
                        size="small"  
                        fullWidth
                      />
                    ) : (
                      row.department
                    )}
                  </TableCell>
                  <TableCell align="right">
                    {editRowId === row.id ? (
                      <TextField
                        value={editData.phone}
                        onChange={(e) => handleEditChange(e, 'phone')}
                        size="small"
                        fullWidth
                      />
                    ) : (
                      row.phone
                    )}
                  </TableCell>
                  <TableCell>
                    {editRowId === row.id ? (
                      <Stack direction="row" spacing={1}>
                        <IconButton color="primary" onClick={() => handleSaveClick(row.id)}><SaveIcon /></IconButton>
                        <IconButton color="error" onClick={handleCancelClick}><CancelIcon /></IconButton>
                      </Stack>
                    ) : (
                      <IconButton color="info" onClick={() => handleEditClick(row.id)}><EditIcon /></IconButton>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}
