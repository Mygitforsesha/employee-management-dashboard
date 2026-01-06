import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const StatCard = ({ title, value, icon, gradient }) => {
  return (
    <Card
      sx={{
        height: "100%",
        color: "#fff",
        background: gradient,
        borderRadius: 3,
        transition: "all 0.3s ease",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.25)",
        },
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box>
            <Typography
              variant="subtitle2"
              sx={{ opacity: 0.85, letterSpacing: 0.5 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mt: 1 }}
            >
              {value}
            </Typography>
          </Box>

          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              backgroundColor: "rgba(255,255,255,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function EmployeeSummary({ total, active, inactive }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <StatCard
          title="Total Employees"
          value={total}
          icon={<PeopleAltIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg, #667eea, #764ba2)"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatCard
          title="Active Employees"
          value={active}
          icon={<CheckCircleIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg, #11998e, #38ef7d)"
        />
      </Grid>

      <Grid item xs={12} md={4}>
        <StatCard
          title="Inactive Employees"
          value={inactive}
          icon={<CancelIcon sx={{ fontSize: 30 }} />}
          gradient="linear-gradient(135deg, #ee0979, #ff6a00)"
        />
      </Grid>
    </Grid>
  );
}
