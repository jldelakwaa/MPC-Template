import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import {
    Users,
    HelpCircle,
    Download,
    Image,
    Newspaper,
    Home,
    TrendingUp,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Stats {
    officerCategories: number;
    officers: number;
    faqs: number;
    faqCategories: number;
    downloadables: number;
    downloadableCategories: number;
    galleries: number;
    galleryCategories: number;
    news: number;
    homePageImages: number;
}



interface Props {
    stats: Stats;
}

export default function Dashboard({ stats, }: Props) {
    const totalItems = stats.officers + stats.faqs + stats.downloadables + stats.galleries + stats.news + stats.homePageImages;

    const cards = [
        {
            title: 'Officers',
            count: stats.officers,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
            href: '/Officers',
        },
        {
            title: 'FAQs',
            count: stats.faqs,
            icon: HelpCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
            href: '/Faq',
        },
        {
            title: 'Downloadables',
            count: stats.downloadables,
            icon: Download,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
            href: '/Downloadables',
        },
        {
            title: 'Galleries',
            count: stats.galleries,
            icon: Image,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
            href: '/Gallery',
        },
        {
            title: 'News',
            count: stats.news,
            icon: Newspaper,
            color: 'text-destructive',
            bgColor: 'bg-red-50 dark:bg-red-950',
            href: '/News',
        },
        {
            title: 'HomePage Images',
            count: stats.homePageImages,
            icon: Home,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50 dark:bg-cyan-950',
            href: '/HomePage',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Dashboard</h1>
                        <p className="text-muted-foreground mt-1">
                            Welcome back! Here's an overview of your content.
                        </p>
                    </div>
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3" />
                        {totalItems} Total Items
                    </Badge>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {cards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <Link key={card.title} href={card.href} className="block" aria-label={`Manage ${card.title}`}>
                                <Card className={`cursor-pointer border-0 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${card.bgColor}`}>
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                        <CardTitle className="text-sm font-medium">
                                            {card.title}
                                        </CardTitle>
                                        <div className={`rounded-lg p-2 ${card.bgColor} ${card.color}`}>
                                            <Icon className="h-4 w-4" />
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-3xl font-bold">{card.count}</div>
                                    </CardContent>
                                </Card>
                            </Link>
                        );
                    })}
                </div>

            </div>
        </AppLayout>
    );
}
