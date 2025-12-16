import { ButtonCustom } from "@/components";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPaths } from "@/store/paths/pathsSlice";
import { selectThemes, updateTheme } from "@/store/theme/themeSlice";
import { Theme } from "@/types";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Icon,
  IconButton,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: adicionar Dialog para confirmar exclusão de tema
export const ConfigurationPage = () => {
  const navigate = useNavigate();
  const themes = useAppSelector(selectThemes);
  const paths = useAppSelector(selectPaths);
  const dispatch = useAppDispatch();

  const [themeDialog, setThemeDialog] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState("");
  const [themeWords, setThemeWords] = useState("");

  const updateThemes = (newThemes: Theme[]) => {
    localStorage.setItem("impostor_themes", JSON.stringify(newThemes));
    dispatch(updateTheme(newThemes));
  };

  const handleAddTheme = () => {
    setEditingTheme(null);
    setThemeName("");
    setThemeWords("");
    setThemeDialog(true);
  };

  const handleEditTheme = (theme: Theme) => {
    setEditingTheme(theme);
    setThemeName(theme.name);
    setThemeWords(theme.words.join(", "));
    setThemeDialog(true);
  };

  const handleDeleteTheme = (themeId: number) => {
    if (window.confirm("Deseja realmente excluir este tema?")) {
      const newThemes = themes.filter((t) => t.id !== themeId);
      updateThemes(newThemes);
    }
  };

  const handleSaveTheme = () => {
    const words = themeWords
      .split(",")
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    if (!themeName || words.length < 2) {
      alert("O tema deve ter um nome e pelo menos 2 palavras!");
      return;
    }

    if (editingTheme) {
      const newThemes = themes.map((t) =>
        t.id === editingTheme.id ? { ...t, name: themeName, words } : t
      );
      updateThemes(newThemes);
    } else {
      const newTheme: Theme = {
        id: Date.now().valueOf(),
        name: themeName,
        words,
      };
      updateThemes([...themes, newTheme]);
    }

    setThemeDialog(false);
  };

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
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Icon sx={{ fontSize: 40, color: "white" }}>palette</Icon>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: "white",
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Temas e Palavras
            </Typography>
          </Box>
          <Box sx={{ display: "flex", gap: 2 }}>
            <ButtonCustom
              buttonRole="secondary"
              label="Voltar"
              startIcon="arrow_back"
              onClick={() => navigate(paths.basePath)}
            />
            <ButtonCustom
              buttonRole="primary"
              label="Novo Tema"
              onClick={handleAddTheme}
              startIcon="add"
            />
          </Box>
        </Box>

        {/* Info Card */}
        <Card
          sx={{
            mb: 3,
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Icon sx={{ color: "white", fontSize: 32 }}>info</Icon>
              <Typography sx={{ color: "white" }}>
                Crie e personalize temas para suas partidas. Cada tema deve ter
                pelo menos 2 palavras relacionadas.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Temas List */}
        {themes.length === 0 ? (
          <Card
            sx={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              color: "white",
            }}
          >
            <CardContent sx={{ textAlign: "center", py: 6 }}>
              <Icon sx={{ fontSize: 80, mb: 2, opacity: 0.8 }}>folder_off</Icon>
              <Typography variant="h5" fontWeight={700} mb={2}>
                Nenhum Tema Cadastrado
              </Typography>
              <Typography variant="body1" mb={3} sx={{ opacity: 0.9 }}>
                Clique no botão "Novo Tema" para criar seu primeiro tema
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Icon>add</Icon>}
                onClick={handleAddTheme}
                sx={{
                  backgroundColor: "white",
                  color: "#f5576c",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                  },
                }}
              >
                Criar Primeiro Tema
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
              gap: 3,
            }}
          >
            {themes.map((theme, index) => {
              // Gradientes alternados para cada tema
              const gradients = [
                "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
                "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
              ];
              const gradient = gradients[index % gradients.length];

              return (
                <Card
                  key={theme.id}
                  sx={{
                    background: gradient,
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
                    },
                  }}
                >
                  <CardContent>
                    {/* Header do Card */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 3,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Icon sx={{ fontSize: 32 }}>category</Icon>
                        <Typography variant="h5" fontWeight={700}>
                          {theme.name}
                        </Typography>
                      </Box>
                      <Box>
                        <IconButton
                          onClick={() => handleEditTheme(theme)}
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            "&:hover": {
                              backgroundColor: "rgba(255, 255, 255, 0.3)",
                            },
                          }}
                        >
                          <Icon>edit</Icon>
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteTheme(theme.id)}
                          sx={{
                            color: "white",
                            backgroundColor: "rgba(255, 255, 255, 0.2)",
                            ml: 1,
                            "&:hover": {
                              backgroundColor: "rgba(255, 67, 54, 0.8)",
                            },
                          }}
                        >
                          <Icon>delete</Icon>
                        </IconButton>
                      </Box>
                    </Box>

                    {/* Badge de contagem */}
                    <Chip
                      icon={
                        <Icon sx={{ color: "white !important" }}>list</Icon>
                      }
                      label={`${theme.words.length} palavras`}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        color: "white",
                        fontWeight: 600,
                        mb: 2,
                      }}
                    />

                    {/* Palavras */}
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 1,
                        maxHeight: 200,
                        overflowY: "auto",
                        "&::-webkit-scrollbar": {
                          width: "8px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "rgba(255, 255, 255, 0.1)",
                          borderRadius: "4px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "rgba(255, 255, 255, 0.3)",
                          borderRadius: "4px",
                          "&:hover": {
                            background: "rgba(255, 255, 255, 0.4)",
                          },
                        },
                      }}
                    >
                      {theme.words.map((word, idx) => (
                        <Chip
                          key={idx}
                          label={word}
                          sx={{
                            backgroundColor: "rgba(255, 255, 255, 0.25)",
                            color: "white",
                            fontWeight: 500,
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.3)",
                          }}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              );
            })}
          </Box>
        )}

        {/* Dialog */}
        <Dialog
          open={themeDialog}
          onClose={() => setThemeDialog(false)}
          maxWidth="sm"
          fullWidth
          slotProps={{
            paper: {
              sx: {
                borderRadius: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              },
            },
          }}
        >
          <DialogTitle
            sx={{
              color: "white",
              fontWeight: 700,
              fontSize: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Icon>{editingTheme ? "edit" : "add_circle"}</Icon>
            {editingTheme ? "Editar Tema" : "Novo Tema"}
          </DialogTitle>
          <DialogContent sx={{ pt: 3 }}>
            <TextField
              fullWidth
              placeholder="Nome do Tema"
              value={themeName}
              onChange={(e) => setThemeName(e.target.value)}
              sx={{
                mb: 2,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                },
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              placeholder="Palavras (separadas por vírgula)"
              value={themeWords}
              onChange={(e) => setThemeWords(e.target.value)}
              helperText="Ex: Futebol, Basquete, Vôlei"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255, 255, 255, 0.5)",
                  },
                },
                "& .MuiFormHelperText-root": {
                  color: "rgba(255, 255, 255, 0.9)",
                  fontWeight: 500,
                },
              }}
            />
          </DialogContent>
          <DialogActions sx={{ padding: "16px 24px" }}>
            <Button
              onClick={() => setThemeDialog(false)}
              sx={{
                color: "white",
                fontWeight: 600,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              Cancelar
            </Button>
            <Button
              onClick={handleSaveTheme}
              variant="contained"
              sx={{
                backgroundColor: "white",
                color: "#667eea",
                fontWeight: 700,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Salvar
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};
