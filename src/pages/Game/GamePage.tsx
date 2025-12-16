import danceBreakGif from "/dance-break.gif";
import niftySmashersGif from "/nifty-smashers-nifty-league.gif";
import helloKittyGif from "/hello-kiyty-cute.gif";
import birdDancingGif from "/bird-dancing.gif";
import emojiDanceGif from "/emoji-dance.gif";
import penguinGif from "/penguin2.gif";
import gatitoGif from "/gatito.gif";
import lilChimpsGif from "/lil-chimps-dance-lil-chimps.gif";

import { ButtonCustom } from "@/components";
import { selectGameState } from "@/store/game/gameSlice";
import { useAppSelector } from "@/store/hooks";
import { selectPaths } from "@/store/paths/pathsSlice";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Icon,
  Container,
  Chip,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const GamePage = () => {
  const navigate = useNavigate();
  const paths = useAppSelector(selectPaths);

  const gameState = useAppSelector(selectGameState);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentPlayer, setCurrentPlayer] = useState(gameState.players[0]);
  const [showWord, setShowWord] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const handleNextPlayer = () => {
    const nextIndex = currentPlayerIndex + 1;
    if (nextIndex < gameState.players.length) {
      setCurrentPlayerIndex(nextIndex);
      setCurrentPlayer(gameState.players[nextIndex]);
      setShowWord(false);
    } else {
      setGameStarted(true);
    }
  };

  const handleFinishGame = () => {
    navigate(paths.basePath);
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
      {gameState && gameState.players.length > 0 ? (
        <Container maxWidth="md">
          {gameStarted ? (
            // Tela de Finalização
            <>
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    color: "white",
                    fontSize: { xs: "2.5rem", md: "4rem" },
                  }}
                >
                  ✅ Jogo Iniciado!
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    maxWidth: 600,
                    mx: "auto",
                  }}
                >
                  Todos os jogadores viram suas palavras, agora é hora de
                  descobrir quem é o impostor. Boa sorte!
                </Typography>
                <Typography variant="h6" sx={{ opacity: 0.85, color: "white" }}>
                  Tema: <strong>{gameState.theme.name}</strong>
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  mt: 4,
                }}
              >
                <Typography variant="h6">
                  Enquanto jogam, aproveitem a festa!
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "flex-end",
                    justifyContent: "center",
                  }}
                >
                  <img src={danceBreakGif} alt="dance-break" width="auto" />
                  <img
                    src={niftySmashersGif}
                    alt="nifty-smashers-nifty-league"
                    width="auto"
                  />
                  <img
                    src={helloKittyGif}
                    alt="hello-kitty-cute"
                    width="76px"
                  />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    padding: `${0} ${2}`,
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <img src={birdDancingGif} alt="bird-dancing" width="76px" />
                  <img src={emojiDanceGif} alt="emoji-dance" width="76px" />
                  <img src={penguinGif} alt="penguin" width="76px" />
                  <img src={gatitoGif} alt="gatito" width="76px" />
                  <img
                    src={lilChimpsGif}
                    alt="lil-chimps-dance-lil-chimps"
                    width="76px"
                  />
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
                <ButtonCustom
                  buttonRole="primary"
                  label="Voltar ao Menu"
                  onClick={handleFinishGame}
                />
              </Box>
            </>
          ) : (
            // Tela do Jogo
            <Box>
              {/* Header com Avatar do Jogador */}
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Avatar
                  sx={{
                    width: 100,
                    height: 100,
                    margin: "0 auto 20px",
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    border: "3px solid white",
                    fontSize: "3rem",
                  }}
                >
                  {currentPlayer.name.charAt(0).toUpperCase()}
                </Avatar>

                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "white",
                    mb: 1,
                    fontSize: { xs: "2rem", md: "3rem" },
                  }}
                >
                  Vez de: {currentPlayer.name}
                </Typography>

                <Chip
                  label={`Jogador ${currentPlayerIndex + 1} de ${
                    gameState.players.length
                  }`}
                  sx={{
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)",
                    color: "white",
                    fontWeight: 600,
                    fontSize: "1rem",
                    px: 1,
                  }}
                />
              </Box>

              {/* Card Principal */}
              <Card
                sx={{
                  background: "rgba(255, 255, 255, 0.15)",
                  backdropFilter: "blur(20px)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  borderRadius: 4,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  {/* Tema */}
                  <Box
                    sx={{
                      textAlign: "center",
                      mb: 4,
                      pb: 3,
                      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <Typography
                      variant="overline"
                      sx={{
                        color: "rgba(255, 255, 255, 0.7)",
                        fontWeight: 600,
                      }}
                    >
                      Tema da Partida
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      sx={{ color: "white", mt: 1 }}
                    >
                      {gameState.theme.name}
                    </Typography>
                  </Box>

                  {!showWord ? (
                    // Estado: Palavra Oculta
                    <Box sx={{ textAlign: "center" }}>
                      <Icon
                        sx={{
                          fontSize: 80,
                          color: "rgba(255, 255, 255, 0.5)",
                          mb: 3,
                        }}
                      >
                        visibility_off
                      </Icon>
                      <Typography
                        variant="h6"
                        sx={{ color: "white", mb: 4, px: 2 }}
                      >
                        Clique no botão abaixo para ver sua palavra.
                        <br />
                        <Typography
                          component="span"
                          sx={{ opacity: 0.8, fontSize: "0.95rem" }}
                        >
                          Certifique-se de que apenas você está vendo!
                        </Typography>
                      </Typography>
                      <Button
                        variant="contained"
                        size="large"
                        startIcon={<Icon>visibility</Icon>}
                        onClick={() => setShowWord(true)}
                        sx={{
                          py: 2,
                          px: 4,
                          fontSize: "1.2rem",
                          backgroundColor: "white",
                          color: "#1e3c72",
                          fontWeight: 700,
                          borderRadius: 3,
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.4)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        Mostrar Minha Palavra
                      </Button>
                    </Box>
                  ) : (
                    // Estado: Palavra Revelada
                    <Box sx={{ textAlign: "center" }}>
                      {/* Card da Palavra/Impostor */}
                      <Card
                        sx={{
                          background:
                            currentPlayer.isImpostor &&
                            gameState.mode === "without-word"
                              ? "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
                              : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                          color: "white",
                          mb: 2,
                          p: 2,
                        }}
                      >
                        <CardContent>
                          {currentPlayer.isImpostor &&
                            gameState.mode === "without-word" &&
                            !currentPlayer.word && (
                              <Box>
                                <Icon sx={{ fontSize: 60, mb: 2 }}>
                                  warning
                                </Icon>
                                <Typography
                                  variant="h4"
                                  fontWeight={800}
                                  mb={2}
                                  sx={{
                                    fontSize: { xs: "1.8rem", md: "2.5rem" },
                                  }}
                                >
                                  Você é o IMPOSTOR!
                                </Typography>
                                <Typography variant="h6" sx={{ opacity: 0.95 }}>
                                  Você não tem palavra. Tente descobrir qual é!
                                </Typography>
                              </Box>
                            )}
                          {currentPlayer.isImpostor &&
                            gameState.mode === "with-word" &&
                            currentPlayer.word && (
                              <Box>
                                <Icon sx={{ fontSize: 60, mb: 2 }}>
                                  check_circle
                                </Icon>
                                <Typography
                                  variant="h5"
                                  fontWeight={600}
                                  mb={2}
                                  sx={{ opacity: 0.95 }}
                                >
                                  Sua palavra é:
                                </Typography>
                                <Typography
                                  variant="h2"
                                  fontWeight={800}
                                  sx={{
                                    fontSize: { xs: "3rem", md: "4rem" },
                                    textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                                  }}
                                >
                                  {currentPlayer.word}
                                </Typography>
                              </Box>
                            )}
                          {!currentPlayer.isImpostor && (
                            <Box>
                              <Icon sx={{ fontSize: 60, mb: 2 }}>
                                check_circle
                              </Icon>
                              <Typography
                                variant="h5"
                                fontWeight={600}
                                mb={2}
                                sx={{ opacity: 0.95 }}
                              >
                                Sua palavra é:
                              </Typography>
                              <Typography
                                variant="h2"
                                fontWeight={800}
                                sx={{
                                  fontSize: { xs: "3rem", md: "4rem" },
                                  textShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
                                }}
                              >
                                {currentPlayer.word}
                              </Typography>
                            </Box>
                          )}
                        </CardContent>
                      </Card>

                      {/* Botão de Próximo */}
                      <Button
                        variant="contained"
                        size="large"
                        onClick={handleNextPlayer}
                        endIcon={
                          <Icon>
                            {currentPlayerIndex < gameState.players.length - 1
                              ? "arrow_forward"
                              : "check"}
                          </Icon>
                        }
                        sx={{
                          py: 2,
                          px: 4,
                          fontSize: "1.2rem",
                          backgroundColor: "white",
                          color: "#1e3c72",
                          fontWeight: 700,
                          borderRadius: 3,
                          minWidth: 250,
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
                          "&:hover": {
                            backgroundColor: "rgba(255, 255, 255, 0.95)",
                            transform: "translateY(-2px)",
                            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.4)",
                          },
                          transition: "all 0.3s ease",
                        }}
                      >
                        {currentPlayerIndex < gameState.players.length - 1
                          ? "Próximo Jogador"
                          : "Finalizar Distribuição"}
                      </Button>
                    </Box>
                  )}
                </CardContent>
              </Card>

              {/* Indicador de Progresso */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 1,
                  mt: 3,
                }}
              >
                {gameState.players.map((_, index) => (
                  <Box
                    key={index}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor:
                        index <= currentPlayerIndex
                          ? "white"
                          : "rgba(255, 255, 255, 0.3)",
                      transition: "all 0.3s ease",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Container>
      ) : (
        <Card
          sx={{
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            mb: 2,
            p: 2,
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              py: 8,
              gap: 2,
            }}
          >
            <Icon sx={{ fontSize: 100, mb: 3, color: "#white" }}>
              error_circle
            </Icon>
            <Typography variant="h5" color="white">
              Nenhum estado de jogo encontrado. Por favor, inicie um novo jogo.
            </Typography>
            <ButtonCustom
              buttonRole="primary"
              label="Voltar ao Menu"
              onClick={handleFinishGame}
            />
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
