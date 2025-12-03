import { Box } from "@mui/material";
import WebRouter from "./routes/WebRouter";
// import { useAppDispatch, useAppSelector } from "@/store/hooks";

function App() {
  // const dispatch = useAppDispatch();
  // const { topBarHeight } = useAppSelector(selectApp);
  const topBarHeight = 64; // TODO: quando adicionar a store, alterar aqui

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
          paddingTop: `${topBarHeight}px`,
          bgcolor: "burlywood",
        }}
      >
        <WebRouter />
      </Box>
    </Box>
  );
}

export default App;
