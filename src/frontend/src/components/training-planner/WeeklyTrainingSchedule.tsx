import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Dumbbell, Heart, CheckCircle } from 'lucide-react';
import { weeklyScheduleData } from '@/content/trainingPlannerCopy';
import { type WorkoutLog, type Weekday } from '@/backend';
import { weekdayEnumToLabel } from '@/utils/workoutLogMapping';

interface WeeklyTrainingScheduleProps {
  workoutLogs?: WorkoutLog[];
  isAuthenticated?: boolean;
}

export function WeeklyTrainingSchedule({ workoutLogs = [], isAuthenticated = false }: WeeklyTrainingScheduleProps) {
  const [selectedDay, setSelectedDay] = useState(0);

  const days = [
    { name: 'Monday', focus: 'Glutes & Shoulders', icon: '🍑', isRest: false },
    { name: 'Tuesday', focus: 'Back & Biceps', icon: '💪', isRest: false },
    { name: 'Wednesday', focus: 'Rest & Recovery', icon: '😌', isRest: true },
    { name: 'Thursday', focus: 'Legs, Abs & Calves', icon: '🦵', isRest: false },
    { name: 'Friday', focus: 'Chest & Triceps', icon: '💪', isRest: false },
    { name: 'Saturday', focus: 'Cardio', icon: '🏃', isRest: false },
    { name: 'Sunday', focus: 'Rest & Recovery', icon: '😌', isRest: true },
  ];

  const completedDays = useMemo(() => {
    if (!isAuthenticated || workoutLogs.length === 0) return new Set<string>();
    
    const completed = new Set<string>();
    workoutLogs.forEach((log) => {
      completed.add(weekdayEnumToLabel(log.day));
    });
    return completed;
  }, [workoutLogs, isAuthenticated]);

  return (
    <section id="schedule" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="font-medium">Weekly Training Plan</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Your 7-Day Training Schedule
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A structured weekly program designed for optimal muscle development and recovery. Each day targets specific muscle groups for balanced growth.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-3">
            {days.map((day, index) => {
              const isCompleted = completedDays.has(day.name);
              
              return (
                <Button
                  key={day.name}
                  variant={selectedDay === index ? 'default' : 'outline'}
                  className="w-full justify-start h-auto py-4 px-6"
                  onClick={() => setSelectedDay(index)}
                >
                  <div className="flex items-center gap-4 w-full">
                    <span className="text-2xl">{day.icon}</span>
                    <div className="flex-1 text-left">
                      <p className="font-semibold">{day.name}</p>
                      <p className={`text-sm ${selectedDay === index ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>
                        {day.focus}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {isCompleted && (
                        <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Completed
                        </Badge>
                      )}
                      {day.isRest && (
                        <Badge variant="secondary">
                          <Heart className="h-3 w-3 mr-1" />
                          Rest
                        </Badge>
                      )}
                      {!day.isRest && !isCompleted && (
                        <Badge variant="outline">
                          <Dumbbell className="h-3 w-3 mr-1" />
                          Train
                        </Badge>
                      )}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          <Card className="lg:sticky lg:top-24 h-fit">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{days[selectedDay].icon}</span>
                <div>
                  <CardTitle>{days[selectedDay].name}</CardTitle>
                  <CardDescription>{days[selectedDay].focus}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose prose-sm dark:prose-invert">
                <p className="text-foreground/90 leading-relaxed">
                  {weeklyScheduleData[selectedDay].description}
                </p>
              </div>
              
              {weeklyScheduleData[selectedDay].tips && (
                <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm font-medium mb-2 text-primary">Pro Tip:</p>
                  <p className="text-sm text-foreground/80">
                    {weeklyScheduleData[selectedDay].tips}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
