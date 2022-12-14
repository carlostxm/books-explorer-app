import { Skeleton } from "@mui/material";
import Box from "@mui/material/Box";

const LoadingSkeleton = () => (
  <Box
    sx={{
      height: "max-content",
    }}
    data-testid="loading-spinner"
  >
    {[...Array(8)].map((_, index) => (
      <Skeleton key={index} variant="rectangular" sx={{ my: 4, mx: 1 }} />
    ))}
  </Box>
);

export default LoadingSkeleton;
