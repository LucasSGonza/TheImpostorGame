import { initialThemes } from "@/mock";
import { Theme } from "@/types";
import {
  Alert,
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
  List,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// TODO: adicionar Dialog para confirmar exclusão de tema
export const ConfigurationPage = () => {
  const navigate = useNavigate();

  const [themes, setThemes] = useState<Theme[]>(initialThemes);
  const [themeDialog, setThemeDialog] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState("");
  const [themeWords, setThemeWords] = useState("");

  //TODO: adicionar carregamento dos temas do localStorage
  // const stored = localStorage.getItem("impostor_themes");
  // if (stored) {
  //   const newTheme = JSON.parse(stored) as Theme[];
  //   setThemes(newTheme);
  // } else {
  //   // Temas iniciais
  //   localStorage.setItem("impostor_themes", JSON.stringify(initialThemes));
  // }

  const saveThemes = (newThemes: Theme[]) => {
    setThemes(newThemes);
    localStorage.setItem("impostor_themes", JSON.stringify(newThemes));
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

  const handleDeleteTheme = (themeId: string) => {
    const newThemes = themes.filter((t) => t.id !== themeId);
    saveThemes(newThemes);
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
      saveThemes(newThemes);
    } else {
      const newTheme: Theme = {
        id: Date.now().toString(),
        name: themeName,
        words,
      };
      saveThemes([...themes, newTheme]);
    }

    setThemeDialog(false);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Temas e Palavras</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Button
            variant="outlined"
            onClick={() => navigate("/theimpostorgame/")}
          >
            Voltar
          </Button>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddTheme}
          >
            Novo Tema
          </Button>
        </Box>
      </Box>

      <List>
        {themes.length === 0 ? (
          <Alert severity="warning">
            Nenhum tema cadastrado. Clique no botão "Novo tema" para criar um.
          </Alert>
        ) : (
          themes.map((theme) => (
            <Card key={theme.id} sx={{ mb: 2 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6">{theme.name}</Typography>
                  <Box>
                    <IconButton
                      onClick={() => handleEditTheme(theme)}
                      color="primary"
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteTheme(theme.id)}
                      color="error"
                    >
                      <Icon>delete</Icon>
                    </IconButton>
                  </Box>
                </Box>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {theme.words.map((word, idx) => (
                    <Chip key={idx} label={word} />
                  ))}
                </Box>
              </CardContent>
            </Card>
          ))
        )}
      </List>

      <Dialog
        open={themeDialog}
        onClose={() => setThemeDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>{editingTheme ? "Editar Tema" : "Novo Tema"}</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome do Tema"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            sx={{ mt: 2, mb: 2 }}
          />
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Palavras (separadas por vírgula)"
            value={themeWords}
            onChange={(e) => setThemeWords(e.target.value)}
            helperText="Ex: Futebol, Basquete, Vôlei"
          />
        </DialogContent>
        <DialogActions sx={{ padding: `8px 24px 16px 0` }}>
          <Button onClick={() => setThemeDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveTheme} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
