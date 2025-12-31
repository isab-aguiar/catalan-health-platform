/**
 * Design System para o Calendário Administrativo
 * Define cores, animações e estilos consistentes
 */

export const CALENDAR_COLORS = {
  reuniao: {
    base: 'bg-blue-500',
    light: 'bg-blue-50',
    border: 'border-blue-200',
    text: 'text-blue-700',
    gradient: 'from-blue-500 to-blue-600',
    hover: 'hover:bg-blue-600',
    ring: 'ring-blue-500'
  },
  lembrete: {
    base: 'bg-purple-500',
    light: 'bg-purple-50',
    border: 'border-purple-200',
    text: 'text-purple-700',
    gradient: 'from-purple-500 to-purple-600',
    hover: 'hover:bg-purple-600',
    ring: 'ring-purple-500'
  },
  agendamento: {
    base: 'bg-green-500',
    light: 'bg-green-50',
    border: 'border-green-200',
    text: 'text-green-700',
    gradient: 'from-green-500 to-green-600',
    hover: 'hover:bg-green-600',
    ring: 'ring-green-500'
  }
};

export const CALENDAR_ANIMATIONS = {
  transitions: {
    fast: 'transition-all duration-200 ease-out',
    normal: 'transition-all duration-300 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out'
  },
  hover: {
    scale: 'hover:scale-105',
    lift: 'hover:-translate-y-1 hover:shadow-lg',
    glow: 'hover:shadow-xl'
  },
  fadeIn: 'animate-fade-in',
  slideUp: 'animate-slide-up',
  slideDown: 'animate-slide-down',
  scaleIn: 'animate-scale-in'
};

export const CALENDAR_SHADOWS = {
  card: 'shadow-sm hover:shadow-md',
  cardHover: 'hover:shadow-card-hover',
  floating: 'shadow-lg',
  strong: 'shadow-xl'
};

export const CALENDAR_SPACING = {
  card: 'p-4 sm:p-6',
  cardCompact: 'p-3 sm:p-4',
  gridGap: 'gap-1',
  sectionGap: 'space-y-4 sm:space-y-6'
};

export const CALENDAR_RADIUS = {
  sm: 'rounded-md',
  md: 'rounded-lg',
  lg: 'rounded-xl',
  full: 'rounded-full'
};

/**
 * Retorna as classes de cor para um tipo de evento
 */
export const getEventColors = (tipo) => {
  return CALENDAR_COLORS[tipo] || {
    base: 'bg-neutral-500',
    light: 'bg-neutral-50',
    border: 'border-neutral-200',
    text: 'text-neutral-700',
    gradient: 'from-neutral-500 to-neutral-600',
    hover: 'hover:bg-neutral-600',
    ring: 'ring-neutral-500'
  };
};

/**
 * Retorna as classes de animação completas para hover
 */
export const getHoverAnimation = (type = 'default') => {
  const animations = {
    default: `${CALENDAR_ANIMATIONS.transitions.normal} ${CALENDAR_ANIMATIONS.hover.scale} ${CALENDAR_SHADOWS.card}`,
    lift: `${CALENDAR_ANIMATIONS.transitions.normal} ${CALENDAR_ANIMATIONS.hover.lift}`,
    glow: `${CALENDAR_ANIMATIONS.transitions.normal} ${CALENDAR_ANIMATIONS.hover.glow}`,
  };

  return animations[type] || animations.default;
};
