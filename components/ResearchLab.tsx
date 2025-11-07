import React from 'react';
import type { Research } from '../types';
import ResearchItem from './ResearchItem';

interface ResearchLabProps {
  researchList: Research[];
  onBuyResearch: (id: number) => void;
  currentInferences: number;
  formatNumber: (num: number) => string;
}

const ResearchLab: React.FC<ResearchLabProps> = ({ researchList, onBuyResearch, currentInferences, formatNumber }) => {
  return (
    <div className="space-y-2 max-h-[75vh] overflow-y-auto pr-2">
      {researchList.map(research => (
        <ResearchItem
          key={research.id}
          research={research}
          onBuy={onBuyResearch}
          currentInferences={currentInferences}
          formatNumber={formatNumber}
          researchList={researchList}
        />
      ))}
    </div>
  );
};

export default ResearchLab;
