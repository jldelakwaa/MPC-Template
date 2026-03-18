import AppLogoIcon from './app-logo-icon';
import { appConfig } from '@/config/env';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-11 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-11 rounded-full fill-current text-white dark:text-black" />
            </div>
            <div className="ml-4 grid flex-1 text-left text-lg">
                <span className="mb-1 truncate leading-tight font-semibold">{appConfig.name}</span>
            </div>
        </>
    );
}
