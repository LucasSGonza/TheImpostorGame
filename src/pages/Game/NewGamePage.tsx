import { Player, Theme } from "@/types";
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  TextField,
  Alert,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewGamePage = () => {
  const [themes, setThemes] = useState<Theme[]>([]);
  const navigate = useNavigate();

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
    console.log("currentPlayerIndex mudou:", currentPlayerIndex);
    console.log("showWord mudou:", showWord);
    console.log("gamePlayers mudou:", gamePlayers);
    console.log("mainWord mudou:", mainWord);
    console.log("impostorWord mudou:", impostorWord);
  }, [currentPlayerIndex, gamePlayers, impostorWord, mainWord, showWord]);

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
    navigate("/theimpostorgame/new-game");
  };

  return (
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
              onChange={(e) =>
                setGameMode(
                  e.target.value === "with-word" ? "with-word" : "without-word"
                )
              }
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
        <Button
          variant="outlined"
          onClick={() => navigate("/theimpostorgame/")}
        >
          Voltar
        </Button>
        <Button variant="contained" onClick={handleStartGame}>
          Iniciar Jogo
        </Button>
      </Box>
    </Box>
  );
};
