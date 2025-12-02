import { Dimensions, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

const normalizeScale = (scale: number, min: number = 0.8, max: number = 1.3): number => {
    return Math.max(min, Math.min(max, scale));
};

export const scaleFont = (size: number): number => {
    const scale = normalizeScale(SCREEN_WIDTH / BASE_WIDTH);
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const scaleFontVertical = (size: number): number => {
    const scale = normalizeScale(SCREEN_HEIGHT / BASE_HEIGHT);
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const scaleSize = (size: number): number => {
    const scale = normalizeScale(SCREEN_WIDTH / BASE_WIDTH, 0.85, 1.25);
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export const scaleVertical = (size: number): number => {
    const scale = normalizeScale(SCREEN_HEIGHT / BASE_HEIGHT, 0.85, 1.25);
    const newSize = size * scale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

// Предустановленные размеры шрифтов
export const fontSizes = {
    // Заголовки
    h1: scaleFont(34),
    h2: scaleFont(28),
    h3: scaleFont(24),
    h4: scaleFont(20),
    h5: scaleFont(18),
    
    // Основной текст
    body: scaleFont(16),
    bodySmall: scaleFont(14),
    bodyLarge: scaleFont(18),
    
    // Мелкий текст
    caption: scaleFont(12),
    captionSmall: scaleFont(10),
    
    // Специальные размеры
    large: scaleFont(32),
    xlarge: scaleFont(36),
    small: scaleFont(13),
    xsmall: scaleFont(11),
};

// Предустановленные размеры для отступов и элементов
export const spacing = {
    xs: scaleSize(4),
    sm: scaleSize(8),
    md: scaleSize(12),
    lg: scaleSize(16),
    xl: scaleSize(20),
    xxl: scaleSize(24),
    xxxl: scaleSize(32),
    
    // Вертикальные отступы
    verticalXs: scaleVertical(4),
    verticalSm: scaleVertical(8),
    verticalMd: scaleVertical(12),
    verticalLg: scaleVertical(16),
    verticalXl: scaleVertical(20),
    verticalXxl: scaleVertical(24),
    verticalXxxl: scaleVertical(32),
    
    // Горизонтальные отступы
    horizontalXs: scaleSize(4),
    horizontalSm: scaleSize(8),
    horizontalMd: scaleSize(12),
    horizontalLg: scaleSize(16),
    horizontalXl: scaleSize(20),
    horizontalXxl: scaleSize(24),
};

// Предустановленные размеры для элементов UI
export const sizes = {
    // Иконки
    iconSmall: scaleSize(16),
    iconMedium: scaleSize(24),
    iconLarge: scaleSize(32),
    iconXlarge: scaleSize(48),
    
    // Логотипы
    logoSmall: scaleSize(40),
    logoMedium: scaleSize(50),
    logoLarge: scaleSize(80),
    
    // Кнопки
    buttonHeight: scaleVertical(48),
    buttonHeightSmall: scaleVertical(40),
    buttonHeightLarge: scaleVertical(56),
    
    // Карточки
    cardPadding: scaleSize(16),
    cardPaddingLarge: scaleSize(20),
    cardBorderRadius: scaleSize(20),
    
    // Input поля
    inputHeight: scaleVertical(48),
    inputPadding: scaleSize(16),
};


