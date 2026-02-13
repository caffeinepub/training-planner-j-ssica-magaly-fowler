import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Droplets, Bell, BellOff, Info } from 'lucide-react';
import { calculateWaterIntake } from '@/utils/hydration';
import { useInAppReminder } from '@/hooks/useInAppReminder';
import { toast } from 'sonner';

export function HydrationSection() {
  const [weight, setWeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('moderate');
  const [reminderInterval, setReminderInterval] = useState('60');
  const [waterTarget, setWaterTarget] = useState<{ liters: number; cups: number } | null>(null);

  const { isActive, start, stop } = useInAppReminder(
    parseInt(reminderInterval),
    () => {
      toast.info('💧 Hydration Reminder', {
        description: 'Time to drink water! Stay hydrated for optimal performance.',
      });
    }
  );

  const handleCalculate = () => {
    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      toast.error('Please enter a valid weight');
      return;
    }
    const result = calculateWaterIntake(weightNum, activityLevel);
    setWaterTarget(result);
  };

  return (
    <section id="hydration" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
            <Droplets className="h-4 w-4 text-primary" />
            <span className="font-medium">Hydration Tracker</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Stay Hydrated, Stay Strong
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proper hydration is crucial for performance, recovery, and fat loss. Calculate your daily water needs and set reminders to stay on track.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Water Intake Calculator</CardTitle>
              <CardDescription>Calculate your personalized daily water target</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="weight">Body Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  placeholder="70"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity">Activity Level</Label>
                <Select value={activityLevel} onValueChange={setActivityLevel}>
                  <SelectTrigger id="activity">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                    <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                    <SelectItem value="very-active">Very Active (intense daily training)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Calculate Water Needs
              </Button>

              {waterTarget && (
                <Alert className="bg-primary/5 border-primary/20">
                  <Droplets className="h-4 w-4 text-primary" />
                  <AlertDescription>
                    <p className="font-semibold text-foreground mb-1">Your Daily Water Target:</p>
                    <p className="text-2xl font-bold text-primary">
                      {waterTarget.liters.toFixed(1)} L
                      <span className="text-base font-normal text-muted-foreground ml-2">
                        ({waterTarget.cups} cups)
                      </span>
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription className="text-sm">
                  This is a general guideline. Adjust based on climate, sweat rate, and individual needs.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Hydration Reminders</CardTitle>
              <CardDescription>Set in-app reminders while this page is open</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="interval">Reminder Interval</Label>
                <Select value={reminderInterval} onValueChange={setReminderInterval}>
                  <SelectTrigger id="interval">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">Every 15 minutes</SelectItem>
                    <SelectItem value="30">Every 30 minutes</SelectItem>
                    <SelectItem value="60">Every hour</SelectItem>
                    <SelectItem value="90">Every 90 minutes</SelectItem>
                    <SelectItem value="120">Every 2 hours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {!isActive ? (
                <Button onClick={start} className="w-full">
                  <Bell className="mr-2 h-4 w-4" />
                  Start Reminders
                </Button>
              ) : (
                <Button onClick={stop} variant="outline" className="w-full">
                  <BellOff className="mr-2 h-4 w-4" />
                  Stop Reminders
                </Button>
              )}

              {isActive && (
                <Alert className="bg-primary/5 border-primary/20">
                  <Bell className="h-4 w-4 text-primary animate-pulse" />
                  <AlertDescription>
                    <p className="font-semibold text-foreground">Reminders Active</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      You'll receive a notification every {reminderInterval} minutes while this page is open.
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="rounded-lg bg-muted p-4 space-y-2">
                <p className="text-sm font-medium">Hydration Tips:</p>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                  <li>Drink water first thing in the morning</li>
                  <li>Sip water throughout your workout</li>
                  <li>Monitor urine color (pale yellow is ideal)</li>
                  <li>Increase intake on training days</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
