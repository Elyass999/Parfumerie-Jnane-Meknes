import { cn } from "@/lib/utils";

interface LoaderProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  text?: string;
}

export function Loader({ fullScreen = false, size = "md", text }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-16 h-16 border-4",
  };

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div
        className={cn(
          "rounded-full border-primary/30 border-t-primary animate-spin",
          sizeClasses[size]
        )}
        role="status"
        aria-label="Chargement"
      />
      {text && (
        <p className="text-muted-foreground animate-pulse">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div
        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm flex items-center justify-center"
        data-testid="loader-fullscreen"
      >
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12" data-testid="loader">
      {content}
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader size="lg" text="Chargement..." />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-card rounded-xl border border-card-border overflow-hidden animate-pulse">
      <div className="aspect-[3/4] bg-muted" />
      <div className="p-4 space-y-3">
        <div className="h-5 bg-muted rounded w-3/4" />
        <div className="h-4 bg-muted rounded w-1/2" />
        <div className="h-6 bg-muted rounded w-1/3" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
