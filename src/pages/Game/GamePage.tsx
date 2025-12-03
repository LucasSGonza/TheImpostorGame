import { Box, Typography, Paper, Button, Icon, Alert } from "@mui/material";

export const GamePage = () => {
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
              Clique no botão abaixo para ver sua palavra. Certifique-se de que
              apenas você está vendo!
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

            <Button variant="contained" size="large" onClick={handleNextPlayer}>
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
