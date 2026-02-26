import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    // read the name from Vite's environment (mirrors the Laravel APP_NAME by
    // default). fall back to a hard‑coded string if nothing is supplied.
    const appName = import.meta.env.VITE_APP_NAME || 'Website';

    return (
        <>
            <div className="flex aspect-square size-11 items-center justify-center rounded-full bg-sidebar-primary text-sidebar-primary-foreground">
                <AppLogoIcon className="size-11 rounded-full fill-current text-white dark:text-black" />
            </div>
            <div className="ml-4 grid flex-1 text-left text-lg">
                <span className="mb-1 truncate leading-tight font-semibold">{appName}</span>
            </div>
        </>
    );
}
