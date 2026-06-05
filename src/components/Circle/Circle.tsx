import {
  type FC,
  type RefObject,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react';
import { getElementCenter } from '../../helpers/getElementCenter';
import { FLIGHT_DURATION_MS } from '../../constants/constants.ts';
import './Circle.css';

type CircleProps = {
  startRef: RefObject<HTMLDivElement | null>;
  endRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
};

export const Circle: FC<CircleProps> = ({ startRef, endRef, onComplete }) => {
  const circleRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const startElement = startRef.current;
    const endElement = endRef.current;
    const circle = circleRef.current;

    if (!startElement || !endElement || !circle) {
      return;
    }

    const startPosition = getElementCenter(startElement);
    const startTime = performance.now();
    let frameId = 0;
    let completed = false;

    const setCirclePosition = (x: number, y: number) => {
      circle.style.left = `${x}px`;
      circle.style.top = `${y}px`;
    };

    setCirclePosition(startPosition.x, startPosition.y);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / FLIGHT_DURATION_MS, 1);
      const endPosition = getElementCenter(endElement);

      setCirclePosition(
        startPosition.x + (endPosition.x - startPosition.x) * progress,
        startPosition.y + (endPosition.y - startPosition.y) * progress
      );

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      if (!completed) {
        completed = true;
        onCompleteRef.current();
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [startRef, endRef]);

  return <div ref={circleRef} className="circle" aria-hidden="true" />;
};
