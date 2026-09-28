import { Button } from "@/components/ui/button";
import { Globe2, Calendar, Users, Sparkles } from "lucide-react";

export default function Landing() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="rounded-full bg-primary/10 p-6">
              <Globe2 className="w-16 h-16 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Civilization Simulator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Build your legacy through time. Guide your civilization from ancient beginnings to modern greatness with AI-powered strategic simulation.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            <div className="space-y-2">
              <div className="flex justify-center">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold">Journey Through Time</h3>
              <p className="text-sm text-muted-foreground">
                Simulate centuries of history with customizable timescales
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold">AI-Powered Events</h3>
              <p className="text-sm text-muted-foreground">
                Experience dynamic scenarios powered by Claude AI
              </p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-center">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold">Multiple Civilizations</h3>
              <p className="text-sm text-muted-foreground">
                Manage up to 5 unique civilization save files
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-8">
            <Button
              size="lg"
              className="text-lg px-8 py-6 h-auto"
              onClick={() => window.location.href = "/api/login"}
              data-testid="button-login"
            >
              Begin Your Journey
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto text-center text-sm text-muted-foreground">
          Powered by Claude AI • Experience the rise and fall of civilizations
        </div>
      </footer>
    </div>
  );
}
