import { Container, Box, Typography, Button, Icon } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  const renderMenu = () => (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold", mb: 4 }}>
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
          onClick={() => navigate("/theimpostorgame/new-game")}
        >
          Iniciar Jogo
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Icon>settings</Icon>}
          onClick={() => navigate("/theimpostorgame/config")}
        >
          Gerenciar Temas
        </Button>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {renderMenu()}
    </Container>
  );
};
