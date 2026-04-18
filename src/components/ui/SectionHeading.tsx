import React from 'react';

interface SectionHeadingProps {
  title: string;
  count?: number;
  countLabel?: string;
}

/** Consistent section header with optional counter badge. */
export const SectionHeading: React.FC<SectionHeadingProps> = ({ title, count, countLabel }) => (
  <div className="flex justify-between items-center">
    <h2 className="text-base font-bold text-cyan-950 uppercase tracking-wider" style={{ fontFamily: 'var(--font-family-header)' }}>
      {title}
    </h2>
    {count !== undefined && (
      <span className="text-[9px] font-bold text-cyan-500 uppercase tracking-widest">
        {count} {countLabel || 'Available'}
      </span>
    )}
  </div>
);
