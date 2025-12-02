import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  IconButton,
  Chip,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Alert,
  Icon,
} from "@mui/material";
import { initialThemes } from "./mock";

interface Theme {
  id: string;
  name: string;
  words: string[];
}

interface Player {
  name: string;
  isImpostor: boolean;
  word?: string;
}

// interface GameConfig {
//   players: string[];
//   theme: Theme;
//   gameMode: "without-word" | "with-word";
// }

export function App() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [screen, setScreen] = useState<
    "menu" | "themes" | "game-setup" | "game"
  >("menu");
  const [themeDialog, setThemeDialog] = useState(false);
  const [editingTheme, setEditingTheme] = useState<Theme | null>(null);
  const [themeName, setThemeName] = useState("");
  const [themeWords, setThemeWords] = useState("");

  // Game setup
  const [numPlayers, setNumPlayers] = useState(3);
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", ""]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [gameMode, setGameMode] = useState<"without-word" | "with-word">(
    "without-word"
  );

  // Game state
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [showWord, setShowWord] = useState(false);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);
  const [mainWord, setMainWord] = useState("");
  const [impostorWord, setImpostorWord] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("impostor_themes");
    if (stored) {
      const newTheme = JSON.parse(stored) as Theme[];
      setThemes(newTheme);
    } else {
      // Temas iniciais
      localStorage.setItem("impostor_themes", JSON.stringify(initialThemes));
    }
  }, []);

  useEffect(() => {
    console.log("mainWord:", mainWord);
    console.log("impostorWord:", impostorWord);
  }, [impostorWord, mainWord]);

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

  const handleNumPlayersChange = (num: number) => {
    setNumPlayers(num);
    setPlayerNames(
      Array(num)
        .fill("")
        .map((_, i) => playerNames[i] || "")
    );
  };

  const handleStartGame = () => {
    if (!selectedTheme) {
      alert("Selecione um tema!");
      return;
    }

    if (playerNames.some((name) => !name.trim())) {
      alert("Preencha o nome de todos os jogadores!");
      return;
    }

    if (selectedTheme.words.length < 1) {
      alert("O tema precisa ter pelo menos 1 palavra!");
      return;
    }

    // Selecionar palavra principal
    const mainWordIndex = Math.floor(
      Math.random() * selectedTheme.words.length
    );
    const mainWordSelected = selectedTheme.words[mainWordIndex];
    setMainWord(mainWordSelected);

    // Selecionar palavra do impostor (se modo com palavra)
    let impostorWordSelected = "";
    if (gameMode === "with-word") {
      const availableWords = selectedTheme.words.filter(
        (_, i) => i !== mainWordIndex
      );
      if (availableWords.length > 0) {
        impostorWordSelected =
          availableWords[Math.floor(Math.random() * availableWords.length)];
      }
      setImpostorWord(impostorWordSelected);
    }

    // Definir impostor aleatoriamente
    const impostorIndex = Math.floor(Math.random() * playerNames.length);

    const players: Player[] = playerNames.map((name, index) => ({
      name: name.trim(),
      isImpostor: index === impostorIndex,
      word:
        index === impostorIndex
          ? gameMode === "with-word"
            ? impostorWordSelected
            : undefined
          : mainWordSelected,
    }));

    setGamePlayers(players);
    setCurrentPlayerIndex(0);
    setShowWord(false);
    setScreen("game");
  };

  const handleNextPlayer = () => {
    setShowWord(false);
    if (currentPlayerIndex < gamePlayers.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      setScreen("menu");
      alert("Jogo finalizado! Agora votem para descobrir quem é o impostor.");
    }
  };

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
          onClick={() => setScreen("game-setup")}
        >
          Iniciar Jogo
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Icon>settings</Icon>}
          onClick={() => setScreen("themes")}
        >
          Gerenciar Temas
        </Button>
      </Box>
    </Box>
  );

  const renderThemes = () => (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">Temas e Palavras</Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<Icon>add</Icon>}
            onClick={handleAddTheme}
            sx={{ mr: 1 }}
          >
            Novo Tema
          </Button>
          <Button variant="outlined" onClick={() => setScreen("menu")}>
            Voltar
          </Button>
        </Box>
      </Box>

      <List>
        {themes.map((theme) => (
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
        ))}
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
        <DialogActions>
          <Button onClick={() => setThemeDialog(false)}>Cancelar</Button>
          <Button onClick={handleSaveTheme} variant="contained">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );

  const renderGameSetup = () => (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configuração do Jogo
      </Typography>

      <Stepper activeStep={0} sx={{ mb: 4 }}>
        <Step>
          <StepLabel>Jogadores</StepLabel>
        </Step>
        <Step>
          <StepLabel>Tema</StepLabel>
        </Step>
        <Step>
          <StepLabel>Modo</StepLabel>
        </Step>
      </Stepper>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Número de Jogadores
          </Typography>
          <TextField
            type="number"
            value={numPlayers}
            onChange={(e) =>
              handleNumPlayersChange(Math.max(3, parseInt(e.target.value) || 3))
            }
            inputProps={{ min: 3, max: 20 }}
            sx={{ mb: 2 }}
          />

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Nomes dos Jogadores
          </Typography>
          {playerNames.map((name, idx) => (
            <TextField
              key={idx}
              fullWidth
              label={`Jogador ${idx + 1}`}
              value={name}
              onChange={(e) => {
                const newNames = [...playerNames];
                newNames[idx] = e.target.value;
                setPlayerNames(newNames);
              }}
              sx={{ mb: 2 }}
            />
          ))}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Selecione o Tema
          </Typography>
          {themes.length === 0 ? (
            <Alert severity="warning">
              Nenhum tema cadastrado. Vá em "Gerenciar Temas" para criar um.
            </Alert>
          ) : (
            <RadioGroup
              value={selectedTheme?.id || ""}
              onChange={(e) => {
                const theme = themes.find((t) => t.id === e.target.value);
                setSelectedTheme(theme || null);
              }}
            >
              {themes.map((theme) => (
                <FormControlLabel
                  key={theme.id}
                  value={theme.id}
                  control={<Radio />}
                  label={`${theme.name} (${theme.words.length} palavras)`}
                />
              ))}
            </RadioGroup>
          )}
        </CardContent>
      </Card>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <FormControl>
            <FormLabel>Modo de Jogo</FormLabel>
            <RadioGroup
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value === "with-word" ? "with-word" : "without-word")}
            >
              <FormControlLabel
                value="without-word"
                control={<Radio />}
                label="Impostor não recebe palavra"
              />
              <FormControlLabel
                value="with-word"
                control={<Radio />}
                label="Impostor recebe palavra diferente"
              />
            </RadioGroup>
          </FormControl>
        </CardContent>
      </Card>

      <Box sx={{ display: "flex", gap: 2 }}>
        <Button variant="outlined" onClick={() => setScreen("menu")}>
          Voltar
        </Button>
        <Button variant="contained" onClick={handleStartGame}>
          Iniciar Jogo
        </Button>
      </Box>
    </Box>
  );

  const renderGame = () => {
    const currentPlayer = gamePlayers[currentPlayerIndex];

    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Vez de: {currentPlayer.name}
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Jogador {currentPlayerIndex + 1} de {gamePlayers.length}
        </Typography>

        <Paper sx={{ p: 4, maxWidth: 500, mx: "auto", mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Tema: {selectedTheme?.name}
          </Typography>

          {!showWord ? (
            <Box>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Clique no botão abaixo para ver sua palavra. Certifique-se de
                que apenas você está vendo!
              </Typography>
              <Button
                variant="contained"
                size="large"
                startIcon={<Icon>visibility</Icon>}
                onClick={() => setShowWord(true)}
              >
                Mostrar Minha Palavra
              </Button>
            </Box>
          ) : (
            <Box>
              <Alert
                severity={currentPlayer.isImpostor ? "warning" : "info"}
                sx={{ mb: 3 }}
              >
                {currentPlayer.isImpostor && !currentPlayer.word && (
                  <Typography variant="h5">
                    Você é o IMPOSTOR! Você não tem palavra.
                  </Typography>
                )}
                {currentPlayer.isImpostor && currentPlayer.word && (
                  <Typography variant="h5">
                    Você é o IMPOSTOR! Sua palavra:{" "}
                    <strong>{currentPlayer.word}</strong>
                  </Typography>
                )}
                {!currentPlayer.isImpostor && (
                  <Typography variant="h5">
                    Sua palavra: <strong>{currentPlayer.word}</strong>
                  </Typography>
                )}
              </Alert>

              <Button
                variant="contained"
                size="large"
                onClick={handleNextPlayer}
              >
                {currentPlayerIndex < gamePlayers.length - 1
                  ? "Próximo Jogador"
                  : "Finalizar"}
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {screen === "menu" && renderMenu()}
      {screen === "themes" && renderThemes()}
      {screen === "game-setup" && renderGameSetup()}
      {screen === "game" && renderGame()}
    </Container>
  );
}
