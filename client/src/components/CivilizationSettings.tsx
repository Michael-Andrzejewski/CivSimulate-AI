
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Civilization } from "@shared/schema";

const settingsSchema = z.object({
  userName: z.string().min(1, "Your name is required").max(100),
  name: z.string().min(1, "Civilization name is required").max(100),
  location: z.string().min(1, "Starting location is required").max(200),
  timescale: z.string(),
  customTimescale: z.string().optional(),
  randomNumberEval: z.string(),
  customRandomNumber: z.string().optional(),
  goalQuestions: z.string(),
  enemyCivilization: z.string(),
  catastropheTimer: z.string(),
  altruismStats: z.boolean(),
  optimisticMode: z.boolean(),
  simulatorModel: z.string().optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface CivilizationSettingsProps {
  civilization: Civilization;
  isOpen: boolean;
  onClose: () => void;
}

export function CivilizationSettings({ civilization, isOpen, onClose }: CivilizationSettingsProps) {
  const { toast } = useToast();
  const [showCustomTimescale, setShowCustomTimescale] = useState(
    civilization.timescale === "custom"
  );

  const form = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      userName: civilization.userName,
      name: civilization.name,
      location: civilization.location,
      timescale: civilization.timescale,
      customTimescale: civilization.customTimescale || "",
      randomNumberEval: civilization.randomNumberEval,
      customRandomNumber: civilization.customRandomNumber || "5",
      goalQuestions: civilization.goalQuestions,
      enemyCivilization: civilization.enemyCivilization,
      catastropheTimer: civilization.catastropheTimer,
      altruismStats: civilization.altruismStats,
      optimisticMode: civilization.optimisticMode,
      simulatorModel: (civilization as any).simulatorModel || "sonnet",
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: SettingsFormData) => {
      const result = await apiRequest(
        "PATCH",
        `/api/civilizations/${civilization.id}`,
        data
      );
      return result.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations", civilization.id],
      });
      queryClient.invalidateQueries({
        queryKey: ["/api/civilizations"],
      });
      toast({
        title: "Settings Updated",
        description: "Your civilization settings have been saved.",
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update settings. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: SettingsFormData) => {
    updateMutation.mutate(data);
  };

  const timescale = form.watch("timescale");
  const randomNumberEval = form.watch("randomNumberEval");

  useEffect(() => {
    setShowCustomTimescale(timescale === "custom");
  }, [timescale]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Civilization Settings</DialogTitle>
          <DialogDescription>
            Configure your civilization's parameters and values.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="userName">Your Name</Label>
              <Input
                id="userName"
                {...form.register("userName")}
                data-testid="input-user-name"
              />
              {form.formState.errors.userName && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.userName.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Civilization Name</Label>
              <Input
                id="name"
                {...form.register("name")}
                data-testid="input-civilization-name"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startingCentury">Starting Century (Read-only)</Label>
            <Input
              id="startingCentury"
              value={civilization.startingCentury < 0 
                ? `${Math.abs(civilization.startingCentury)} BCE` 
                : `${civilization.startingCentury} CE`}
              disabled
              className="bg-muted"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              {...form.register("location")}
              data-testid="input-location"
            />
            {form.formState.errors.location && (
              <p className="text-sm text-destructive">
                {form.formState.errors.location.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="timescale">Timescale</Label>
              <Select
                value={form.watch("timescale")}
                onValueChange={(value) => form.setValue("timescale", value)}
              >
                <SelectTrigger id="timescale" data-testid="select-timescale">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1 day">1 day</SelectItem>
                  <SelectItem value="1 week">1 week</SelectItem>
                  <SelectItem value="1 month">1 month</SelectItem>
                  <SelectItem value="1 year">1 year</SelectItem>
                  <SelectItem value="10 years">10 years</SelectItem>
                  <SelectItem value="100 years">100 years</SelectItem>
                  <SelectItem value="1000 years">1000 years</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {showCustomTimescale && (
              <div className="space-y-2">
                <Label htmlFor="customTimescale">Custom Timescale</Label>
                <Input
                  id="customTimescale"
                  placeholder="e.g., 50 years"
                  {...form.register("customTimescale")}
                  data-testid="input-custom-timescale"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="randomNumberEval">Random Number Evaluation</Label>
              <Select
                value={form.watch("randomNumberEval")}
                onValueChange={(value) => form.setValue("randomNumberEval", value)}
              >
                <SelectTrigger id="randomNumberEval" data-testid="select-random-eval">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="+2">Always +2</SelectItem>
                  <SelectItem value="+1">Always +1</SelectItem>
                  <SelectItem value="random">Default</SelectItem>
                  <SelectItem value="-1">Always -1</SelectItem>
                  <SelectItem value="custom">Always # (1-9)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {randomNumberEval === "custom" && (
              <div className="space-y-2">
                <Label htmlFor="customRandomNumber">Custom Number (1-9)</Label>
                <Select
                  value={form.watch("customRandomNumber") || "5"}
                  onValueChange={(value) => form.setValue("customRandomNumber", value)}
                >
                  <SelectTrigger id="customRandomNumber">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="goalQuestions">Goal Questions</Label>
              <Select
                value={form.watch("goalQuestions")}
                onValueChange={(value) => form.setValue("goalQuestions", value)}
              >
                <SelectTrigger id="goalQuestions" data-testid="select-goal-questions">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="one">One</SelectItem>
                  <SelectItem value="all">All</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="enemyCivilization">Enemy Civilization</Label>
              <Select
                value={form.watch("enemyCivilization")}
                onValueChange={(value) => form.setValue("enemyCivilization", value)}
              >
                <SelectTrigger id="enemyCivilization" data-testid="select-enemy-civilization">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="no">No</SelectItem>
                  <SelectItem value="yes">Yes</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Only takes effect when a catastrophe triggers — set a Catastrophe Timer to use this.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="catastropheTimer">Catastrophe Timer</Label>
              <Select
                value={form.watch("catastropheTimer")}
                onValueChange={(value) => form.setValue("catastropheTimer", value)}
              >
                <SelectTrigger id="catastropheTimer" data-testid="select-catastrophe-timer">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="4 centuries">4 centuries</SelectItem>
                  <SelectItem value="5 centuries">5 centuries</SelectItem>
                  <SelectItem value="random 1/4th">Random 1/4th chance</SelectItem>
                  <SelectItem value="random 1/5th">Random 1/5th chance</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="simulatorModel">Simulator Model</Label>
              <Select
                value={form.watch("simulatorModel") || "sonnet"}
                onValueChange={(value) => form.setValue("simulatorModel", value)}
              >
                <SelectTrigger id="simulatorModel" data-testid="select-simulator-model">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="haiku">Haiku 4.5 (Fast)</SelectItem>
                  <SelectItem value="sonnet">Sonnet 4.5 (Default)</SelectItem>
                  <SelectItem value="opus">Opus 5.5 (Advanced)</SelectItem>
                  <SelectItem value="gpt-4.1">GPT-4.1 (OpenAI)</SelectItem>
                  <SelectItem value="gpt-4.1-mini">GPT-4.1 Mini (OpenAI)</SelectItem>
                  <SelectItem value="gpt-5.2">GPT-5.2 (OpenAI)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="altruism-stats"
                checked={form.watch("altruismStats")}
                onCheckedChange={(checked) => form.setValue("altruismStats", checked === true)}
              />
              <Label htmlFor="altruism-stats" className="text-sm font-medium leading-none">
                Altruism Stats (Track lives saved and lost)
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="optimistic-mode"
                checked={form.watch("optimisticMode") ?? false}
                onCheckedChange={(checked) => form.setValue("optimisticMode", checked === true)}
              />
              <Label htmlFor="optimistic-mode" className="text-sm font-medium leading-none">
                Optimistic Mode (Charitable and kind simulation)
              </Label>
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-testid="button-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              data-testid="button-save-settings"
            >
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
