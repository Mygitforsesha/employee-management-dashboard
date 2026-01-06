import { Box, Typography } from "@mui/material";

export default function EmptyState({ message }) {
  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 2,
        color: "text.secondary",
      }}
    >
      <Typography variant="h6" gutterBottom>
        No Data Found
      </Typography>

      <Typography variant="body2">
        {message}
      </Typography>
    </Box>
  );
}
