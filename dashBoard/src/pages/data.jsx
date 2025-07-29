import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, TableSortLabel, Toolbar, Typography,
  Paper, Checkbox, IconButton, Tooltip, FormControlLabel, Switch, TextField, Dialog,
  DialogActions, DialogContent, DialogTitle, Button
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

function createData(id, name, designation, role, department, phone) {
  return { id, name, designation, role, department, phone };
}

let initialRows = [
  createData(1, 'David Billa', 'Manager', 'Admin', 'Operations', 9876543210),
  createData(2, 'Steve Rogers', 'Team Lead', 'Developer', 'Engineering', 9123456789),
  createData(3, 'Baasha', 'Senior Analyst', 'Data Analyst', 'Data Science', 9988776655),
  createData(4, 'Bruce Wayne', 'CEO', 'Executive', 'Management', 9876501234),
  createData(5, 'Deva', 'HR Executive', 'HR', 'Human Resources', 9012345678),
  createData(6, 'Leo Das', 'DevOps Engineer', 'Engineer', 'Infrastructure', 7894561230),
  createData(7, 'Vikram', 'Product Owner', 'Product Manager', 'Product', 8765432109),
  createData(8, 'Tony Stark', 'CTO', 'Executive', 'Technology', 9988665544),
  createData(9, 'Stephen Strange', 'Research Head', 'Scientist', 'R&D', 9112233445),
  createData(10, 'Desmond Miles', 'Support Agent', 'Customer Support', 'Support', 9090909090),
  createData(11, 'Kabaali', 'Security Lead', 'Security', 'Security', 9000011122),
  createData(12, 'Sathya', 'Backend Developer', 'Developer', 'Engineering', 8999888777),
  createData(13, 'Tom Cruise', 'UI/UX Designer', 'Designer', 'Design', 8877665544),
  createData(14, 'Arya Stark', 'QA Engineer', 'Tester', 'Quality Assurance', 9988771122),
  createData(15, 'Walter White', 'Chemist', 'Lab Tech', 'Chemical', 9345678901),
  createData(16, 'John Wick', 'Logistics Manager', 'Coordinator', 'Logistics', 9845098450),
  createData(17, 'Peter Parker', 'Intern', 'Support', 'Engineering', 9765432100),
];

const headCells = [
  { id: 'id', numeric: true, disablePadding: false, label: 'ID' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'designation', numeric: false, disablePadding: false, label: 'Designation' },
  { id: 'role', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'department', numeric: false, disablePadding: false, label: 'Department' },
  { id: 'phone', numeric: true, disablePadding: false, label: 'Phone No.' },
  { id: 'action', numeric: false, disablePadding: false, label: 'Action' }
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id && (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              )}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar({ numSelected, filterText, onFilterChange }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 }, pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1,
      }}
    >
      <Box sx={{ display: 'flex', width: '100%', alignItems: 'center' }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle">
          {numSelected > 0 ? `${numSelected} selected` : 'User Data'}
        </Typography>
        {numSelected > 0 ? (
          <Tooltip title="Delete"><IconButton><DeleteIcon /></IconButton></Tooltip>
        ) : (
          <Tooltip title="Filter list"><IconButton><FilterListIcon /></IconButton></Tooltip>
        )}
      </Box>
      <TextField
        variant="outlined"
        size="small"
        fullWidth
        label="Search by name, role, dept, etc."
        value={filterText}
        onChange={onFilterChange}
      />
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  filterText: PropTypes.string.isRequired,
  onFilterChange: PropTypes.func.isRequired,
};

// ✨ EDIT MODAL COMPONENT
function EditDialog({ open, onClose, data, onSave }) {
  const [formData, setFormData] = React.useState(data || {});

  React.useEffect(() => {
    setFormData(data || {});
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField fullWidth margin="dense" label="Name" name="name" value={formData.name || ''} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Designation" name="designation" value={formData.designation || ''} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Role" name="role" value={formData.role || ''} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Department" name="department" value={formData.department || ''} onChange={handleChange} />
        <TextField fullWidth margin="dense" label="Phone" name="phone" value={formData.phone || ''} onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default function EnhancedTable() {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [filterText, setFilterText] = React.useState('');
  const [rowsData, setRowsData] = React.useState(initialRows);
  const [editRow, setEditRow] = React.useState(null);
  const [editOpen, setEditOpen] = React.useState(false);

  const handleEdit = (row) => {
    setEditRow(row);
    setEditOpen(true);
  };

  const handleSave = (updatedRow) => {
    const updatedRows = rowsData.map(r => r.id === updatedRow.id ? updatedRow : r);
    setRowsData(updatedRows);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredRows.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [...selected];
    if (selectedIndex === -1) newSelected.push(id);
    else newSelected.splice(selectedIndex, 1);
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleChangeDense = (event) => setDense(event.target.checked);
  const handleFilterChange = (event) => {
    setFilterText(event.target.value.toLowerCase());
    setPage(0);
  };

  const filteredRows = rowsData.filter((row) =>
    Object.values(row).some((val) =>
      String(val).toLowerCase().includes(filterText)
    )
  );

  const sortedRows = React.useMemo(
    () => [...filteredRows].sort(getComparator(order, orderBy)),
    [filteredRows, order, orderBy]
  );

  const visibleRows = sortedRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const emptyRows = Math.max(0, (1 + page) * rowsPerPage - filteredRows.length);

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          filterText={filterText}
          onFilterChange={handleFilterChange}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={filteredRows.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = selected.includes(row.id);
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': `enhanced-table-checkbox-${index}` }}
                      />
                    </TableCell>
                    <TableCell align="right">{row.id}</TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.designation}</TableCell>
                    <TableCell>{row.role}</TableCell>
                    <TableCell>{row.department}</TableCell>
                    <TableCell align="right">{row.phone}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit">
                        <IconButton onClick={() => handleEdit(row)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={8} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
      {/* Edit Dialog */}
      <EditDialog open={editOpen} onClose={() => setEditOpen(false)} data={editRow} onSave={handleSave} />
    </Box>
  );
}
