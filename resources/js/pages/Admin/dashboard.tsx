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
    Clock,
    ArrowRight
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

interface RecentItem {
    id: number;
    title?: string;
    name?: string;
    question?: string;
    created_at: string;
}

interface Recent {
    news: RecentItem[];
    officers: RecentItem[];
    faqs: RecentItem[];
}

interface Props {
    stats: Stats;
    recent: Recent;
}

export default function Dashboard({ stats, recent }: Props) {
    const totalItems = stats.officers + stats.faqs + stats.downloadables + stats.galleries + stats.news + stats.homePageImages;

    const cards = [
        {
            title: 'Officers',
            count: stats.officers,
            icon: Users,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
        },
        {
            title: 'FAQs',
            count: stats.faqs,
            icon: HelpCircle,
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
        },
        {
            title: 'Downloadables',
            count: stats.downloadables,
            icon: Download,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50 dark:bg-purple-950',
        },
        {
            title: 'Galleries',
            count: stats.galleries,
            icon: Image,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50 dark:bg-orange-950',
        },
        {
            title: 'News',
            count: stats.news,
            icon: Newspaper,
            color: 'text-red-600',
            bgColor: 'bg-red-50 dark:bg-red-950',
        },
        {
            title: 'HomePage Images',
            count: stats.homePageImages,
            icon: Home,
            color: 'text-cyan-600',
            bgColor: 'bg-cyan-50 dark:bg-cyan-950',
        },
    ];

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

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
                            <Card key={card.title} className={`hover:shadow-lg transition-all duration-200 border-0 ${card.bgColor}`}>
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium">
                                        {card.title}
                                    </CardTitle>
                                    <div className={`p-2 rounded-lg ${card.bgColor} ${card.color}`}>
                                        <Icon className="h-4 w-4" />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-3xl font-bold">{card.count}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="h-5 w-5" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                    <Newspaper className="h-4 w-4 text-red-600" />
                                    Latest News
                                </h4>
                                <div className="space-y-2">
                                    {recent.news.length > 0 ? (
                                        recent.news.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                                <span className="text-sm truncate flex-1">{item.title}</span>
                                                <div className="flex items-center gap-2 ml-2">
                                                    <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                                                    <Link href={`/News/${item.id}`} className="text-primary hover:underline">
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No recent news</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                    <Users className="h-4 w-4 text-blue-600" />
                                    Latest Officers
                                </h4>
                                <div className="space-y-2">
                                    {recent.officers.length > 0 ? (
                                        recent.officers.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                                <span className="text-sm truncate flex-1">{item.name}</span>
                                                <div className="flex items-center gap-2 ml-2">
                                                    <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                                                    <Link href={`/Officers/${item.id}/edit`} className="text-primary hover:underline">
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No recent officers</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                                    <HelpCircle className="h-4 w-4 text-green-600" />
                                    Latest FAQs
                                </h4>
                                <div className="space-y-2">
                                    {recent.faqs.length > 0 ? (
                                        recent.faqs.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                                                <span className="text-sm truncate flex-1">{item.question}</span>
                                                <div className="flex items-center gap-2 ml-2">
                                                    <span className="text-xs text-muted-foreground">{formatDate(item.created_at)}</span>
                                                    <Link href={`/Faq/${item.id}/edit`} className="text-primary hover:underline">
                                                        <ArrowRight className="h-3 w-3" />
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-muted-foreground">No recent FAQs</p>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-center">
                                <div className="text-4xl font-bold text-primary mb-1">{totalItems}</div>
                                <p className="text-sm text-muted-foreground">Total Content Items</p>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span>Categories</span>
                                    <span className="font-medium">{stats.officerCategories + stats.faqCategories + stats.downloadableCategories + stats.galleryCategories}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Content Types</span>
                                    <span className="font-medium">6</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span>Growth</span>
                                    <Badge variant="outline" className="text-green-600">+12%</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
