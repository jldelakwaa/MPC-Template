import { ImgHTMLAttributes } from 'react';

// logo component reads URL from Vite environment variable so it can be
// configured at build/runtime via `.env`.  If the variable is not set we
// fall back to the original `/Logo.png` file used by the project.
export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    const logoUrl = import.meta.env.VITE_APP_LOGO_URL || '/Logo.png';
    return <img {...props} src={logoUrl} alt="App Logo" />;
}
