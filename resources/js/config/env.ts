const envAppName = import.meta.env.VITE_APP_NAME;
const envLogoUrl = import.meta.env.VITE_APP_LOGO_URL;

export const appConfig = {
    name: envAppName && envAppName.trim().length > 0 ? envAppName : 'Website',
    logoUrl: envLogoUrl && envLogoUrl.trim().length > 0 ? envLogoUrl : '/Logo.png',
} as const;
