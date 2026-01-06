import {
  Box,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

export default function Dashboard() {
  const totalEmployees = 1;
  const activeEmployees = 1;
  const inactiveEmployees = 0;

  const cards = [
    {
      label: "Total Employees",
      value: totalEmployees,
      icon: <PeopleOutlineIcon />,
    },
    {
      label: "Active Employees",
      value: activeEmployees,
      icon: <CheckCircleOutlineIcon />,
    },
    {
      label: "Inactive Employees",
      value: inactiveEmployees,
      icon: <HighlightOffIcon />,
    },
  ];

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight={600}
        mb={3}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card) => (
          <Grid item xs={12} md={4} key={card.label}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 2,
                border: "1px solid #E2E8F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                backgroundColor: "#fff",
              }}
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {card.label}
                </Typography>
                <Typography
                  variant="h4"
                  fontWeight={600}
                  mt={0.5}
                >
                  {card.value}
                </Typography>
              </Box>

              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  backgroundColor: "#F1F5F9",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#1E293B",
                }}
              >
                {card.icon}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
