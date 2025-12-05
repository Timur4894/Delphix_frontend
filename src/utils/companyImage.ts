/**
 * Получает источник изображения для компании
 * @param logoUrl - URL логотипа компании из API
 * @returns Объект для Image source (uri или require)
 */
export const getCompanyImage = (logoUrl?: string | null) => {
    if (logoUrl && logoUrl.trim() !== '') {
        return { uri: logoUrl };
    }
    // Fallback на дефолтное изображение
    return require('../assets/img/appleLogo.png');
};

