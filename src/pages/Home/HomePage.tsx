import { useAppSelector } from "@/store/hooks";
import { selectPaths } from "@/store/paths/pathsSlice";
import { Container, Box, Typography, Button, Icon, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const paths = useAppSelector(selectPaths);

  return (
    <Container maxWidth={false} sx={{ margin: 0 }} disableGutters>
      <Box sx={{ textAlign: "center" }}>
        <Alert
          severity="info"
          variant="filled"
          color="info"
          elevation={3}
          sx={{
            justifyContent: "center",
            mx: "auto",
            marginBottom: 2,
            maxWidth: "600px",
          }}
        >
          Caso desejar voltar aos temas iniciais, limpe o armazenamento local do
          navegador em "F12", "Application", "Storage", "Local Storage" e remova
          "impostor_themes".
        </Alert>
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 4 }}
        >
          O Impostor
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            maxWidth: 300,
            mx: "auto",
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<Icon>play_arrow</Icon>}
            onClick={() => navigate(paths.newGamePath)}
          >
            Iniciar Jogo
          </Button>
          <Button
            variant="outlined"
            size="large"
            startIcon={<Icon>settings</Icon>}
            onClick={() => navigate(paths.configPath)}
          >
            Gerenciar Temas
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
