import type { IconType } from "react-icons";
import { Button } from "reactstrap";

interface Props {
  tooltip?: string;
  onClick?: () => void;
  color?: string;
  size?: "sm" | "lg";
  disabled?: boolean;
  icon?: IconType;
  className?: string;
  variant?: "ghost" | "outline" | undefined;
  text?: string;
}

export const ActionButton = ({
  tooltip = "",
  onClick,
  color = "primary",
  size = "sm",
  disabled = false,
  icon: Icon,
  className = "",
  variant,
  text = "",
}: Props) => {
  return (
    <Button
      color={color}
      size={size}
      onClick={onClick}
      disabled={disabled}
      className={className}
      variant={variant}
      title={tooltip}
    >
      {Icon && <Icon />} {text}
    </Button>
  );
};
