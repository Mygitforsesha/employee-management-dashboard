import {
  Box,
  TextField,
  MenuItem,
  Button,
  Paper,
  Stack,
} from "@mui/material";

export default function EmployeeFilters({ filters, setFilters }) {
  const handleChange = (field) => (e) => {
    setFilters((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleReset = () => {
    setFilters({
      search: "",
      gender: "",
      status: "",
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        alignItems="center"
      >
        <TextField
          label="Search by Name"
          value={filters.search}
          onChange={handleChange("search")}
          fullWidth
        />

        <TextField
          select
          label="Gender"
          value={filters.gender}
          onChange={handleChange("gender")}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
        </TextField>

        <TextField
          select
          label="Status"
          value={filters.status}
          onChange={handleChange("status")}
          fullWidth
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="active">Active</MenuItem>
          <MenuItem value="inactive">Inactive</MenuItem>
        </TextField>

        <Box>
          <Button variant="outlined" onClick={handleReset}>
            Reset
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}
