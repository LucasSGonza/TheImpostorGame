import { useAppSelector } from "@/store/hooks";
import { selectPaths } from "@/store/paths/pathsSlice";
import { selectThemes } from "@/store/theme/themeSlice";
import { Player, Theme } from "@/types";
import {
  Box,
  Typography,
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
  const themes = useAppSelector(selectThemes);
  const paths = useAppSelector(selectPaths);
  const navigate = useNavigate();

  // Game setup
  const [numPlayers, setNumPlayers] = useState(3);
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", ""]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [gameMode, setGameMode] = useState<"without-word" | "with-word">(
    "without-word"
  );

  // Game state
  const [showWord, setShowWord] = useState(false);
  const [gamePlayers, setGamePlayers] = useState<Player[]>([]);
  const [mainWord, setMainWord] = useState("");
  const [impostorWord, setImpostorWord] = useState("");

  //TODO: remover `useEffect` e adicionar a store para gerenciar o estado do jogo
  useEffect(() => {
    console.log("showWord:", showWord);
    console.log("gamePlayers:", gamePlayers);
    console.log("mainWord:", mainWord);
    console.log("impostorWord:", impostorWord);
  }, [gamePlayers, impostorWord, mainWord, showWord]);

  const handleNumPlayersChange = (num: number) => {
    setNumPlayers(num);
    setPlayerNames(
      Array(num)
        .fill("")
        .map((_, i) => playerNames[i] || "")
    );
  };

  // TODO: revisar func
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
    setShowWord(false);
    navigate(paths.newGamePath);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Configuração do Jogo
      </Typography>

      {/* 1 = 8px, 2 = 16px, 3 = 24px, ... */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Número de Jogadores
          </Typography>
          {/* Adicionar Tooltip */}
          <TextField
            type="number"
            value={numPlayers}
            onChange={(e) =>
              handleNumPlayersChange(Math.max(3, parseInt(e.target.value) || 3))
            }
            slotProps={{
              htmlInput: {
                min: 3,
                max: 10,
              },
            }}
            sx={{ mb: 2 }}
          />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Nomes dos Jogadores
          </Typography>
          {playerNames.map((name, index) => (
            <TextField
              key={index}
              fullWidth
              label={`Jogador ${index + 1}`}
              value={name}
              onChange={(e) => {
                const newNames = [...playerNames];
                newNames[index] = e.target.value;
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
                const theme = themes.find(
                  (t) => t.id.toString() === e.target.value
                );
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
        <Button variant="outlined" onClick={() => navigate(paths.basePath)}>
          Voltar
        </Button>
        <Button variant="contained" onClick={handleStartGame}>
          Iniciar Jogo
        </Button>
      </Box>
    </Box>
  );
};
