import { useAppSelector } from "@/store/hooks";
import { selectPaths } from "@/store/paths/pathsSlice";
import {
  Container,
  Box,
  Typography,
  Icon,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  const paths = useAppSelector(selectPaths);

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Chip
            label="JOGO DE DEDUÇÃO"
            sx={{
              mb: 3,
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.9rem",
              backdropFilter: "blur(10px)",
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              color: "white",
              mb: 2,
              fontSize: { xs: "2.5rem", md: "4rem" },
            }}
          >
            🎭 O Impostor
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: "rgba(255, 255, 255, 0.8)",
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Reúna seus amigos e descubra quem não está dizendo a verdade
          </Typography>
        </Box>

        {/* Cards de Ação */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
            gap: 3,
            mb: 4,
          }}
        >
          <Card
            onClick={() => navigate(paths.newGamePath)}
            sx={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 5 }}>
              <Icon sx={{ fontSize: 80, mb: 2 }}>play_circle_filled</Icon>
              <Typography variant="h4" fontWeight={700} mb={1}>
                Iniciar Jogo
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Configure e comece uma nova partida
              </Typography>
            </CardContent>
          </Card>

          <Card
            onClick={() => navigate(paths.configPath)}
            sx={{
              cursor: "pointer",
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "translateY(-8px)",
                boxShadow: "0 16px 40px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 5 }}>
              <Icon sx={{ fontSize: 80, mb: 2 }}>tune</Icon>
              <Typography variant="h4" fontWeight={700} mb={1}>
                Gerenciar Temas
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Crie e edite temas personalizados
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Info Card */}
        <Card
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Icon sx={{ color: "white", fontSize: 32 }}>lightbulb</Icon>
              <Typography sx={{ color: "white", flex: 1 }}>
                <strong>Dica:</strong> Para restaurar temas padrão, limpe o
                Local Storage (F12 → Application → Local Storage →
                "impostor_themes")
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
