import React from 'react';

export interface TechTextProps {
  text?: string;
  highlightText?: string;
  gradient?: boolean;
  gradientColors?: string[];
  fontFamily?: string;
  fontWeight?: number | string;
  fontSize?: number;
  letterSpacing?: number;
  color?: string;
  accentColor?: string;
  align?: 'center' | 'left' | 'right';
  reach?: number;
  softness?: number;
  dashLength?: number;
  dashGap?: number;
  strokeWidth?: number;
  lineStyle?: 'dashed' | 'solid';
  reveal?: 'letter' | 'area';
  specks?: number;
  selection?: boolean;
  labels?: boolean;
  draggable?: boolean;
  bounce?: number;
  sweep?: boolean;
  speed?: number;
  clickKick?: boolean;
  intro?: 'none' | 'type' | 'assemble' | 'metrics';
  introDuration?: number;
  guides?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export declare const TechText: React.FC<TechTextProps>;
export default TechText;

