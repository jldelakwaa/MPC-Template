import { ImgHTMLAttributes } from 'react';
import { appConfig } from '@/config/env';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return <img {...props} src={appConfig.logoUrl} alt="App Logo" />;
}
