import { forwardRef } from 'react';
import './Block.css';

type BlockProps = {
  number: 1 | 2;
  animated?: boolean;
};

export const Block = forwardRef<HTMLDivElement, BlockProps>(
  ({ number, animated }, ref) => (
    <div
      ref={ref}
      className={`block${animated ? ' block--animated' : ''}`}
      aria-label={`Block ${number}`}
    >
      <span className="block__number">{number}</span>
    </div>
  )
);
