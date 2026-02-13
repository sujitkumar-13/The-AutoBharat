import { Skeleton } from "@/components/ui/skeleton";

export function BlogCardSkeleton() {
    return (
        <div className="group cursor-pointer">
            <div className="relative aspect-[16/10] mb-6 overflow-hidden bg-muted">
                <Skeleton className="w-full h-full" />
            </div>
            <div className="space-y-3">
                <div className="flex items-center gap-3">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
            </div>
        </div>
    );
}
