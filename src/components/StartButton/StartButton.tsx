import { type FC } from 'react';
import './StartButton.css';

type StartButtonProps = {
  disabled: boolean;
  countdown: number | null;
  onClick: () => void;
};

export const StartButton: FC<StartButtonProps> = ({
  disabled,
  countdown,
  onClick,
}) => {
  const showCountdown = countdown !== null && countdown > 0;
  const label = showCountdown ? countdown.toFixed(0) : 'START';

  return (
    <button
      type="button"
      className="start-button"
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </button>
  );
};
