import { useState } from "react";
import {
  Box,
  Button,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Switch,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import EmployeeForm from "./EmployeeForm";
import {
  deleteEmployee,
  EMPTY_FORM,
  insertOrUpdateEmployee,
} from "../utils/storage";

export default function EmployeeList({ employees = [], updateEmployees }) {
  const [formOpen, setFormOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteId, setDeleteId] = useState(null);

  const handleAdd = () => {
    setForm(EMPTY_FORM);
    setEditingEmployee(null);
    setFormOpen(true);
  };

  const handleEdit = (emp) => {
    setEditingEmployee(emp);
    setFormOpen(true);
  };

  const handleSave = (data) => {
    console.log("Saved employee:", data);
    const updatedList = insertOrUpdateEmployee(data);
    updateEmployees(updatedList);
    setFormOpen(!formOpen);
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
  };

  const handleConfirmDelete = () => {
    const updated = deleteEmployee(deleteId);
    updateEmployees(updated);
    setDeleteId(null);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h5" fontWeight={600}>
            Employees
          </Typography>

          <Box display="flex" gap={1}>
            <Button
              variant="outlined"
              startIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print
            </Button>

            <Button variant="contained" onClick={handleAdd}>
              Add Employee
            </Button>
          </Box>
        </Box>

        <Paper>
          <Table>
            <TableHead
              sx={{
                "& td:not(:last-child)": {
                  textAlign: "center",
                },
                "& th": {
                  fontWeight: "bold",
                },
              }}
            >
              <TableRow>
                <TableCell>Employee ID</TableCell>
                <TableCell>Profile Image</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Date of Birth (DOB)</TableCell>
                <TableCell>State</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {employees.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    No employees found
                  </TableCell>
                </TableRow>
              ) : (
                employees.map((emp) => (
                  <TableRow
                    key={emp.id}
                    sx={{
                      "& td:not(:last-child)": {
                        textAlign: "center",
                      },
                    }}
                  >
                    <TableCell>{emp.id}</TableCell>
                    <TableCell>
                      {emp.profileImage ? (
                        <Avatar
                          src={emp.profileImage}
                          sx={{
                            width: "75px",
                            height: "75px",
                            margin: "auto",
                          }}
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{emp.fullName}</TableCell>
                    <TableCell>{emp.gender}</TableCell>
                    <TableCell>{emp.dob}</TableCell>
                    <TableCell>{emp.state}</TableCell>
                    <TableCell>
                      <Switch checked={emp.isActive} />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton onClick={() => handleEdit(emp)}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="error"
                        onClick={() => handleDeleteClick(emp.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>

        <EmployeeForm
          open={formOpen}
          employee={editingEmployee}
          onClose={() => setFormOpen(false)}
          onSave={handleSave}
          form={form}
          setForm={setForm}
        />
      </Box>
      <Dialog open={Boolean(deleteId)} onClose={handleCancelDelete}>
        <DialogTitle>Delete Employee</DialogTitle>

        <DialogContent>
          <Typography>
            Are you sure you want to delete this employee (Id : {deleteId}) ?
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleCancelDelete}>Cancel</Button>
          <Button
            color="error"
            variant="contained"
            onClick={handleConfirmDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
