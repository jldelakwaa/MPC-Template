<!DOCTYPE html>
<html
    lang="{{ str_replace('_', '-', app()->getLocale()) }}"
    @class([
        'dark' => ($appearance ?? 'system') == 'dark',
        'system-theme' => ($appearance ?? 'system') == 'system',
    ])
>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        {{-- Inline script to detect system dark mode preference and apply it immediately --}}
        <script>
            (function() {
                const appearance = '{{ $appearance ?? "system" }}';
                const root = document.documentElement;

                root.classList.toggle('dark', appearance === 'dark');
                root.classList.toggle('system-theme', appearance === 'system');
                root.style.colorScheme = appearance === 'dark' ? 'dark' : 'light';
            })();
        </script>

        {{-- Inline style to set the HTML background color based on our theme in app.css --}}
        <style>
            html {
                background-color: #f8fafc;
            }

            html.dark {
                background-color: #0f172a;
            }
        </style>

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <link rel="icon" type="image/png" sizes="32x32" href="/Logo-removebg.png?v=1">
        <link rel="shortcut icon" type="image/png" href="/Logo-removebg.png?v=1">
        <link rel="apple-touch-icon" href="/Logo-removebg.png?v=1">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        {{-- Font — loaded once here; change VITE_APP_FONT_URL in .env to swap fonts --}}
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=inter:300,400,500,600,700,800&display=swap" rel="stylesheet" />

        @viteReactRefresh
        @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
