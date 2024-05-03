export type Size = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export type fontSize = Extract<Size, 'lg' | 'md' | 'sm'>;

export type headingSize = Size;

export type iconSize = Extract<Size, 'xl' | 'lg' | 'md' | 'sm'>;

export type inputSize = Extract<Size, 'lg' | 'md' | 'sm'>;
