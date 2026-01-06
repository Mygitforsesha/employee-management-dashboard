import { Stack, Chip, Switch } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function EmployeeStatus({ isActive, onToggle }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Chip
        icon={isActive ? <CheckCircleIcon /> : <CancelIcon />}
        label={isActive ? "Active" : "Inactive"}
        color={isActive ? "success" : "error"}
        size="small"
        sx={{ fontWeight: 500 }}
      />

      <Switch
        checked={isActive}
        onChange={onToggle}
        color="success"
      />
    </Stack>
  );
}
