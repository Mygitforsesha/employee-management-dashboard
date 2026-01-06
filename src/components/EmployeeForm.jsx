import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Switch,
  Avatar,
  Typography,
} from "@mui/material";

export default function EmployeeForm({
  open,
  employee,
  onClose,
  onSave,
  form,
  setForm,
}) {
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    if (employee) {
      setForm(employee);
      setImagePreview(employee.profileImage || "");
    } else {
      setForm({
        fullName: "",
        gender: "",
        dob: "",
        state: "",
        isActive: true,
        profileImage: "",
      });
      setErrors({});
      setImagePreview("");
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleToggle = (e) => {
    setForm({ ...form, isActive: e.target.checked });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    let e = {};
    if (!form.fullName) e.fullName = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.dob) e.dob = "Required";
    if (!form.state) e.state = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSave({ ...form, profileImage: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{employee ? "Edit Employee" : "Add Employee"}</DialogTitle>

      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} mt={1}>
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar src={imagePreview} sx={{ width: 80, height: 80 }}>
              {form.fullName?.[0]}
            </Avatar>
            <Button variant="outlined" component="label">
              Upload Image
              <input
                hidden
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Box>

          <TextField
            label="Full Name"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            error={Boolean(errors.fullName)}
            helperText={errors.fullName}
            fullWidth
          />

          <TextField
            select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            error={Boolean(errors.gender)}
            helperText={errors.gender}
            fullWidth
          >
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
          </TextField>

          <TextField
            type="date"
            label="Date of Birth"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            error={Boolean(errors.dob)}
            helperText={errors.dob}
            fullWidth
          />

          <TextField
            select
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            error={Boolean(errors.state)}
            helperText={errors.state}
            fullWidth
          >
            <MenuItem value="Andhra Pradesh">Andhra Pradesh</MenuItem>
            <MenuItem value="Karnataka">Karnataka</MenuItem>
            <MenuItem value="Tamil Nadu">Tamil Nadu</MenuItem>
            <MenuItem value="Telangana">Telangana</MenuItem>
            <MenuItem value="Kerala">Kerala</MenuItem>
          </TextField>

          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Inactive</Typography>
            <Switch checked={form.isActive} onChange={handleToggle} />
            <Typography>Active</Typography>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
