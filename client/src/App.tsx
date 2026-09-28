import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import Dashboard from "@/pages/dashboard";
import CreateCivilization from "@/pages/create-civilization";
import Simulation from "@/pages/simulation";
import CompetitiveSimulation from "@/pages/competitive-simulation";
import MapSandbox from "@/pages/map-sandbox";
import Multiplayer from "@/pages/multiplayer";

function Router() {
  const { isAuthenticated, isLoading } = useAuth();

  // Standalone client-only tool — reachable without auth so it can be tested
  // in isolation from the simulation game.
  if (isLoading || !isAuthenticated) {
    return (
      <Switch>
        <Route path="/map-sandbox" component={MapSandbox} />
        <Route path="/multiplayer" component={Multiplayer} />
        <Route path="/" component={Landing} />
        <Route component={Landing} />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/create" component={CreateCivilization} />
      <Route path="/civilization/:id" component={Simulation} />
      <Route path="/civilization/:id/competitive" component={CompetitiveSimulation} />
      <Route path="/map-sandbox" component={MapSandbox} />
      <Route path="/multiplayer" component={Multiplayer} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
