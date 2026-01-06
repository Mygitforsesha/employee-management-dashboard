import { useState, useEffect } from "react";

import { getEmployees, saveEmployees } from "../utils/storage";
import EmployeeFilters from "../components/EmployeeFilters";
import EmployeeList from "../components/EmployeeList";
import { Box } from "@mui/material";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    gender: "",
    status: "",
  });

  useEffect(() => {
    setEmployees(getEmployees());
  }, [employees]);

  const filtered = employees.filter((e) => {
    return (
      e.fullName.toLowerCase().includes(filters.search.toLowerCase()) &&
      (!filters.gender || e.gender === filters.gender) &&
      (!filters.status ||
        (filters.status === "active" ? e.isActive : !e.isActive))
    );
  });

  const updateEmployees = (list) => {
    setEmployees(list);
    saveEmployees(list);
  };

  return (
    <>
      <Box className="filters-section no-print">
        <EmployeeFilters filters={filters} setFilters={setFilters} />
      </Box>

      <EmployeeList employees={filtered} updateEmployees={updateEmployees} />
    </>
  );
}
