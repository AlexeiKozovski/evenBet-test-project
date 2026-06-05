import { type FC, useCallback, useEffect, useRef, useState } from 'react';
import { Block } from '../Block/Block';
import { Circle } from '../Circle/Circle';
import { StartButton } from '../StartButton/StartButton';
import { BUTTON_COOLDOWN_SECONDS } from '../../constants/constants.ts';
import './AppContent.css';

export const AppContent: FC = () => {
  const block1Ref = useRef<HTMLDivElement>(null);
  const block2Ref = useRef<HTMLDivElement>(null);
  const cooldownFrameRef = useRef(0);
  const [showCircle, setShowCircle] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const canStart = countdown === null || countdown === 0;

  const handleStart = useCallback(() => {
    if (!block1Ref.current || !block2Ref.current || !canStart) {
      return;
    }

    setShowCircle(true);
    setCountdown(BUTTON_COOLDOWN_SECONDS);

    const startTime = performance.now();

    const tick = (now: number) => {
      const remaining = Math.max(
        0,
        BUTTON_COOLDOWN_SECONDS - (now - startTime) / 1000
      );

      setCountdown(remaining);

      if (remaining > 0) {
        cooldownFrameRef.current = requestAnimationFrame(tick);
      }
    };

    cooldownFrameRef.current = requestAnimationFrame(tick);
  }, [canStart]);

  const handleFlightComplete = useCallback(() => {
    setShowCircle(false);
  }, []);

  useEffect(() => {
    return () => {
      cancelAnimationFrame(cooldownFrameRef.current);
    };
  }, []);

  return (
    <div className="app">
      <main className="app__stage">
        <div className="app__block-slot">
          <Block ref={block1Ref} number={1} animated />
        </div>
        <div className="app__block-slot">
          <Block ref={block2Ref} number={2} />
        </div>
      </main>
      <div className="app__button">
        <StartButton
          disabled={!canStart}
          countdown={countdown !== null && countdown > 0 ? countdown : null}
          onClick={handleStart}
        />
      </div>
      {showCircle && (
        <Circle
          startRef={block1Ref}
          endRef={block2Ref}
          onComplete={handleFlightComplete}
        />
      )}
    </div>
  );
};
