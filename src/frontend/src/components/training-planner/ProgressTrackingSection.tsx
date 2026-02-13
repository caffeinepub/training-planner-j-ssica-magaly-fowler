import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CheckCircle2, TrendingUp, Trash2, Calendar, Clock, StickyNote } from 'lucide-react';
import { useInternetIdentity } from '@/hooks/useInternetIdentity';
import { useGetWorkoutLogs, useLogWorkout, useDeleteWorkoutLog } from '@/hooks/useWorkoutLogs';
import {
  WEEKDAY_LABELS,
  weekdayLabelToEnum,
  weekdayEnumToLabel,
  formatCompletionTime,
  formatDuration,
  type WeekdayLabel,
} from '@/utils/workoutLogMapping';

export function ProgressTrackingSection() {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const { data: workoutLogs = [], isLoading } = useGetWorkoutLogs();
  const logWorkoutMutation = useLogWorkout();
  const deleteWorkoutMutation = useDeleteWorkoutLog();

  const [selectedDay, setSelectedDay] = useState<WeekdayLabel>('Monday');
  const [durationMinutes, setDurationMinutes] = useState('');
  const [notes, setNotes] = useState('');

  const isAuthenticated = !!identity;

  const handleLogWorkout = () => {
    if (!selectedDay) return;

    const duration = durationMinutes ? parseInt(durationMinutes, 10) : undefined;
    
    logWorkoutMutation.mutate(
      {
        day: weekdayLabelToEnum(selectedDay),
        durationMinutes: duration,
        notes: notes || undefined,
      },
      {
        onSuccess: () => {
          setDurationMinutes('');
          setNotes('');
        },
      }
    );
  };

  const handleDeleteLog = (index: number) => {
    deleteWorkoutMutation.mutate(index);
  };

  const sortedLogs = [...workoutLogs].sort((a, b) => {
    return Number(b.completionTime - a.completionTime);
  });

  return (
    <section id="progress" className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
            <TrendingUp className="h-4 w-4 text-primary" />
            <span className="font-medium">Progress Tracking</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Track Your Workouts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Log your completed workouts to monitor your consistency and progress over time.
          </p>
        </div>

        {!isAuthenticated ? (
          <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle>Sign In Required</CardTitle>
              <CardDescription>
                Please sign in to save and view your workout progress
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center pb-8">
              <Button onClick={login} disabled={isLoggingIn} size="lg">
                {isLoggingIn ? 'Signing in...' : 'Sign In'}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                  Log a Workout
                </CardTitle>
                <CardDescription>
                  Record a completed training session
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="day-select">Day of Week</Label>
                  <Select value={selectedDay} onValueChange={(value) => setSelectedDay(value as WeekdayLabel)}>
                    <SelectTrigger id="day-select">
                      <SelectValue placeholder="Select a day" />
                    </SelectTrigger>
                    <SelectContent>
                      {WEEKDAY_LABELS.map((day) => (
                        <SelectItem key={day} value={day}>
                          {day}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration-input">Duration (minutes) - Optional</Label>
                  <Input
                    id="duration-input"
                    type="number"
                    min="1"
                    placeholder="e.g., 45"
                    value={durationMinutes}
                    onChange={(e) => setDurationMinutes(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes-input">Notes - Optional</Label>
                  <Textarea
                    id="notes-input"
                    placeholder="How did it go? Any observations..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleLogWorkout}
                  disabled={!selectedDay || logWorkoutMutation.isPending}
                  className="w-full"
                >
                  {logWorkoutMutation.isPending ? 'Logging...' : 'Log Workout'}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Workout History
                </CardTitle>
                <CardDescription>
                  {workoutLogs.length === 0
                    ? 'No workouts logged yet'
                    : `${workoutLogs.length} workout${workoutLogs.length === 1 ? '' : 's'} logged`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Loading your workout history...
                  </div>
                ) : sortedLogs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    Start logging workouts to track your progress!
                  </div>
                ) : (
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {sortedLogs.map((log, index) => (
                        <div key={index} className="border rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <Badge variant="default">
                                  {weekdayEnumToLabel(log.day)}
                                </Badge>
                                {log.durationMinutes && (
                                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {formatDuration(log.durationMinutes)}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-muted-foreground">
                                {formatCompletionTime(log.completionTime)}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteLog(index)}
                              disabled={deleteWorkoutMutation.isPending}
                              className="h-8 w-8 text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          {log.notes && (
                            <>
                              <Separator />
                              <div className="space-y-1">
                                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                                  <StickyNote className="h-3 w-3" />
                                  Notes
                                </p>
                                <p className="text-sm">{log.notes}</p>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
