import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, LogOut, Globe2 } from "lucide-react";
import { Link } from "wouter";
import type { Civilization } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      toast({
        title: "Unauthorized",
        description: "You are logged out. Logging in again...",
        variant: "destructive",
      });
      setTimeout(() => {
        window.location.href = "/api/login";
      }, 500);
      return;
    }
  }, [isAuthenticated, authLoading, toast]);

  const { data: civilizations, isLoading } = useQuery<Civilization[]>({
    queryKey: ["/api/civilizations"],
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/civilizations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/civilizations"] });
      toast({
        title: "Civilization Deleted",
        description: "Your civilization has been removed.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to delete civilization. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading your civilizations...</p>
        </div>
      </div>
    );
  }

  const maxCivilizations = 12;
  const canCreateNew = (civilizations?.length ?? 0) < maxCivilizations;
  const slots = Array.from({ length: maxCivilizations }, (_, i) => civilizations?.[i]);

  const formatCentury = (century: number) => {
    if (century < 0) {
      return `${Math.abs(century).toLocaleString()} BCE`;
    }
    return `${century.toLocaleString()} CE`;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe2 className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">Civilization Simulator</h1>
              <p className="text-sm text-muted-foreground">
                {user?.email || "Welcome"}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => window.location.href = "/api/logout"}
            data-testid="button-logout"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Log Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Your Civilizations</h2>
            <p className="text-muted-foreground">
              Manage up to {maxCivilizations} unique civilization save files. Each one is a journey through time.
            </p>
          </div>

          {/* Civilization Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {slots.map((civ, index) => (
              <Card
                key={civ?.id || `empty-${index}`}
                className={`group transition-all duration-200 ${
                  civ
                    ? "hover-elevate cursor-pointer"
                    : "border-dashed hover:border-primary/50"
                }`}
                data-testid={civ ? `card-civilization-${civ.id}` : `card-empty-slot-${index}`}
              >
                {civ ? (
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                      <Link href={`/civilization/${civ.id}`} className="space-y-1 flex-1">
                        <h3 className="text-xl font-semibold" data-testid={`text-civilization-name-${civ.id}`}>
                          {civ.name}
                        </h3>
                        <p className="text-sm text-muted-foreground" data-testid={`text-civilization-location-${civ.id}`}>
                          {civ.location}
                        </p>
                      </Link>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            data-testid={`button-delete-${civ.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Civilization?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete "{civ.name}" and all its history. This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-testid="button-cancel-delete">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(civ.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              data-testid="button-confirm-delete"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>

                    <Link href={`/civilization/${civ.id}`}>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Era:</span>
                          <span className="font-mono" data-testid={`text-current-era-${civ.id}`}>
                            {formatCentury(civ.currentCentury)}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Timescale:</span>
                          <span className="font-mono" data-testid={`text-timescale-${civ.id}`}>
                            {civ.timescale === "custom" && civ.customTimescale
                              ? civ.customTimescale
                              : civ.timescale}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t border-border">
                          <span className="text-muted-foreground">Last Played:</span>
                          <span className="text-xs" data-testid={`text-last-played-${civ.id}`}>
                            {formatDate(civ.lastPlayedAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                ) : (
                  <Link href={canCreateNew ? "/create" : "#"}>
                    <CardContent className="p-6 h-full flex items-center justify-center min-h-[200px]">
                      <div className="text-center space-y-3">
                        {canCreateNew ? (
                          <>
                            <div className="flex justify-center">
                              <div className="rounded-full bg-primary/10 p-4">
                                <Plus className="w-8 h-8 text-primary" />
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Create New Civilization</p>
                              <p className="text-sm text-muted-foreground">
                                Begin a new journey through time
                              </p>
                            </div>
                          </>
                        ) : (
                          <p className="text-sm text-muted-foreground">
                            Delete a civilization to create a new one
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Link>
                )}
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}