import { Box } from "@mui/material";
import WebRouter from "./routes/WebRouter";

function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component={"main"}
        sx={{
          flex: 1,
          padding: `64px`,
          bgcolor: "burlywood",
        }}
      >
        <WebRouter />
      </Box>
    </Box>
  );
}

export default App;
