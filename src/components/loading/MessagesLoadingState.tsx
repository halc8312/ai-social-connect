import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const MessagesLoadingState = () => {
  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-2rem)] gap-4">
      <div className="w-full lg:w-80 lg:border-r p-4">
        <Skeleton className="h-10 w-full mb-4" />
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex gap-3 items-center">
                  <Skeleton className="w-10 h-10 rounded-full" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-3 w-32" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col min-h-0 p-4">
        <div className="flex-1 space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? "justify-end" : "justify-start"}`}>
              <Skeleton className={`h-16 ${i % 2 === 0 ? "w-2/3" : "w-1/2"}`} />
            </div>
          ))}
        </div>
        <Skeleton className="h-12 w-full mt-4" />
      </div>
    </div>
  );
};