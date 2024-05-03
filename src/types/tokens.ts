import Theme from '@styles/theme';

export type bgColor = keyof (typeof Theme)['color']['bg'];

export type borderColor = keyof (typeof Theme)['color']['border'];

export type iconColor = keyof (typeof Theme)['color']['icon'];

export type textColor = keyof (typeof Theme)['color']['text'];

type iconModule = typeof import('@assets/svg/index');

export type iconName = keyof iconModule;
