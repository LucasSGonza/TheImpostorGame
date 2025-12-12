import { Button, Icon, SxProps, Theme } from "@mui/material";

interface ButtonCustomProps {
  buttonRole: "primary" | "secondary" | "tertiary";
  label?: string;
  startIcon?: string;
  onClick?: () => void;
}

export const ButtonCustom = ({
  buttonRole,
  label,
  startIcon,
  onClick,
}: ButtonCustomProps) => {
  const buttonStyles: SxProps<Theme> =
    buttonRole === "primary"
      ? {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.3)",
          "&:hover": {
            boxShadow: "0 6px 24px rgba(0, 0, 0, 0.4)",
          },
          transition: "all 0.3s ease",
        }
      : buttonRole === "secondary"
      ? {
          color: "white",
          borderColor: "rgba(255, 255, 255, 0.5)",
          borderWidth: 2,
          fontWeight: 600,
          "&:hover": {
            borderColor: "white",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
          },
        }
      : {
          color: "white",
          fontWeight: 600,
        };

  const buttonVariant =
    buttonRole === "primary"
      ? "contained"
      : buttonRole === "secondary"
      ? "outlined"
      : "text";

  return (
    <Button
      variant={buttonVariant}
      startIcon={startIcon ? <Icon>{startIcon}</Icon> : undefined}
      onClick={onClick}
      sx={buttonStyles}
    >
      {label}
    </Button>
  );
};
