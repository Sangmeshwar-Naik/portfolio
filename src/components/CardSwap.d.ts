import React from 'react';

export interface CardSwapItem {
  title?: string;
  image?: string;
  alt?: string;
  icon?: React.ReactNode;
}

export interface CardSwapProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: CardSwapItem[];
  width?: number;
  height?: number;
  cardDistance?: number;
  verticalDistance?: number;
  depth?: number;
  skewAmount?: number;
  visibleCards?: number;
  delay?: number;
  autoplay?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  speed?: number;
  bounce?: number;
  parallax?: number;
  hoverSpread?: number;
  dim?: number;
  cardRadius?: number;
  intro?: boolean;
  theme?: 'cyber' | 'dark' | 'light' | string;
  onCardClick?: (index: number) => void;
  onChange?: (index: number) => void;
  className?: string;
  children?: React.ReactNode;
}

export declare const Card: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & { customClass?: string }>;
export declare const CardSwap: React.ForwardRefExoticComponent<CardSwapProps & React.RefAttributes<{ next: () => void; prev: () => void }>>;
export default CardSwap;

