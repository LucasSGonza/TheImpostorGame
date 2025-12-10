import { Box } from "@mui/material";
import WebRouter from "./routes/WebRouter";
import { useEffect } from "react";
import { Theme } from "./types";
import { updateTheme } from "./store/theme/themeSlice";
import { useAppDispatch } from "./store/hooks";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const stored = localStorage.getItem("impostor_themes");
    if (stored) {
      const storedTheme = JSON.parse(stored) as Theme[];
      dispatch(updateTheme(storedTheme));
    }
  }, [dispatch]);

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
          padding: `24px 64px`,
          bgcolor: "burlywood",
        }}
      >
        <WebRouter />
      </Box>
    </Box>
  );
}

export default App;
