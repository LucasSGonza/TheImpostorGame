import { ButtonCustom } from "@/components/";
import { updateGameState } from "@/store/game/gameSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectPaths } from "@/store/paths/pathsSlice";
import { selectThemes } from "@/store/theme/themeSlice";
import { Game, Player, Theme } from "@/types";
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
  Container,
  Icon,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const NewGamePage = () => {
  const themes = useAppSelector(selectThemes);
  const paths = useAppSelector(selectPaths);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Game setup
  const [numPlayers, setNumPlayers] = useState(3);
  const [playerNames, setPlayerNames] = useState<string[]>(["", "", ""]);
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null);
  const [gameMode, setGameMode] = useState<"without-word" | "with-word">(
    "without-word"
  );

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

    const gameState: Game = {
      id: Date.now(),
      players: players,
      mode: gameMode,
      theme: selectedTheme,
    };
    dispatch(updateGameState(gameState));
    navigate(paths.gamePath);
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
            <Icon sx={{ fontSize: 40, color: "white" }}>settings</Icon>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Configuração do Jogo
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
              label="Iniciar Jogo"
              onClick={handleStartGame}
              startIcon="play_arrow"
            />
          </Box>
        </Box>

        {/* Card 1: Jogadores */}
        <Card
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Icon sx={{ fontSize: 32 }}>groups</Icon>
              <Typography variant="h5" fontWeight={700}>
                Jogadores
              </Typography>
            </Box>

            <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
              Número de Jogadores
            </Typography>
            <TextField
              type="number"
              value={numPlayers}
              onChange={(e) =>
                handleNumPlayersChange(
                  Math.max(3, parseInt(e.target.value) || 3)
                )
              }
              slotProps={{
                htmlInput: {
                  min: 3,
                  max: 10,
                },
              }}
              sx={{
                mb: 3,
                maxWidth: 150,
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  borderRadius: 2,
                  "& fieldset": {
                    borderColor: "transparent",
                  },
                },
              }}
            />

            <Typography variant="h6" sx={{ mb: 2 }}>
              Nomes dos Jogadores
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                gap: 2,
              }}
            >
              {playerNames.map((name, index) => (
                <TextField
                  key={index}
                  fullWidth
                  placeholder={`Jogador ${index + 1}`}
                  value={name}
                  onChange={(e) => {
                    const newNames = [...playerNames];
                    newNames[index] = e.target.value;
                    setPlayerNames(newNames);
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      borderRadius: 2,
                      "& fieldset": {
                        borderColor: "transparent",
                      },
                    },
                    "& .MuiInputLabel-root": {
                      color: "rgba(0, 0, 0, 0.6)",
                    },
                  }}
                />
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Card 2: Tema */}
        <Card
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Icon sx={{ fontSize: 32 }}>category</Icon>
              <Typography variant="h5" fontWeight={700}>
                Selecione o Tema
              </Typography>
            </Box>

            {themes.length === 0 ? (
              <Alert
                severity="warning"
                sx={{
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  "& .MuiAlert-icon": {
                    color: "white",
                  },
                }}
              >
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
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" },
                    gap: 2,
                  }}
                >
                  {themes.map((theme) => (
                    <Box
                      key={theme.id}
                      sx={{
                        backgroundColor: "rgba(255, 255, 255, 0.15)",
                        backdropFilter: "blur(10px)",
                        border:
                          selectedTheme?.id === theme.id
                            ? "2px solid white"
                            : "1px solid rgba(255, 255, 255, 0.3)",
                        borderRadius: 2,
                        p: 2,
                        transition: "all 0.3s ease",
                        cursor: "pointer",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.25)",
                          transform: "translateY(-2px)",
                        },
                      }}
                      onClick={() => setSelectedTheme(theme)}
                    >
                      <FormControlLabel
                        value={theme.id}
                        control={
                          <Radio
                            sx={{
                              color: "white",
                              "&.Mui-checked": {
                                color: "white",
                              },
                            }}
                          />
                        }
                        label={
                          <Box>
                            <Typography fontWeight={600} fontSize="1.1rem">
                              {theme.name}
                            </Typography>
                            <Chip
                              size="small"
                              label={`${theme.words.length} palavras`}
                              sx={{
                                mt: 0.5,
                                backgroundColor: "rgba(255, 255, 255, 0.3)",
                                color: "white",
                                fontWeight: 600,
                              }}
                            />
                          </Box>
                        }
                        sx={{
                          width: "100%",
                          margin: 0,
                          "& .MuiFormControlLabel-label": {
                            color: "white",
                          },
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </RadioGroup>
            )}
          </CardContent>
        </Card>

        {/* Card 3: Modo de Jogo */}
        <Card
          sx={{
            mb: 3,
            background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
            color: "white",
          }}
        >
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
              <Icon sx={{ fontSize: 32 }}>tune</Icon>
              <Typography variant="h5" fontWeight={700}>
                Modo de Jogo
              </Typography>
            </Box>

            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                value={gameMode}
                onChange={(e) =>
                  setGameMode(
                    e.target.value === "with-word"
                      ? "with-word"
                      : "without-word"
                  )
                }
              >
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      border:
                        gameMode === "without-word"
                          ? "2px solid white"
                          : "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: 2,
                      p: 2,
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                      },
                    }}
                    onClick={() => setGameMode("without-word")}
                  >
                    <FormControlLabel
                      value="without-word"
                      control={
                        <Radio
                          sx={{
                            color: "white",
                            "&.Mui-checked": {
                              color: "white",
                            },
                          }}
                        />
                      }
                      label={
                        <Box>
                          <Typography fontWeight={600} fontSize="1.1rem">
                            Impostor não recebe palavra
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.9, mt: 0.5 }}
                          >
                            Modo mais difícil - O impostor deve deduzir a
                            palavra
                          </Typography>
                        </Box>
                      }
                      sx={{
                        width: "100%",
                        margin: 0,
                        "& .MuiFormControlLabel-label": {
                          color: "white",
                        },
                      }}
                    />
                  </Box>

                  <Box
                    sx={{
                      backgroundColor: "rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(10px)",
                      border:
                        gameMode === "with-word"
                          ? "2px solid white"
                          : "1px solid rgba(255, 255, 255, 0.3)",
                      borderRadius: 2,
                      p: 2,
                      transition: "all 0.3s ease",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.25)",
                      },
                    }}
                    onClick={() => setGameMode("with-word")}
                  >
                    <FormControlLabel
                      value="with-word"
                      control={
                        <Radio
                          sx={{
                            color: "white",
                            "&.Mui-checked": {
                              color: "white",
                            },
                          }}
                        />
                      }
                      label={
                        <Box>
                          <Typography fontWeight={600} fontSize="1.1rem">
                            Impostor recebe palavra diferente
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ opacity: 0.9, mt: 0.5 }}
                          >
                            Modo equilibrado - O impostor recebe uma palavra
                            diferente dos demais
                          </Typography>
                        </Box>
                      }
                      sx={{
                        width: "100%",
                        margin: 0,
                        "& .MuiFormControlLabel-label": {
                          color: "white",
                        },
                      }}
                    />
                  </Box>
                </Box>
              </RadioGroup>
            </FormControl>
          </CardContent>
        </Card>

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
              <Typography sx={{ color: "white" }}>
                <strong>Dica:</strong> Certifique-se de que todos os jogadores
                estão prontos antes de iniciar. Cada um verá sua palavra
                individualmente!
              </Typography>
            </Box>
            {/* TODO: adicionar botao flutuante para voltar ao topo */}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
