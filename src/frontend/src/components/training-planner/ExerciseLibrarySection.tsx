import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { BookOpen, CheckCircle2 } from 'lucide-react';
import { exerciseLibraryData } from '@/content/exerciseLibraryData';

export function ExerciseLibrarySection() {
  return (
    <section id="exercises" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
            <BookOpen className="h-4 w-4 text-primary" />
            <span className="font-medium">Exercise Library</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Top 3 Exercises Per Muscle Group
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Master these fundamental movements with proper form and technique. Each exercise includes coaching cues to maximize results and prevent injury.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {exerciseLibraryData.map((group) => (
            <Card key={group.muscleGroup} className="overflow-hidden">
              <CardHeader className="bg-primary/5 border-b">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{group.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{group.muscleGroup}</CardTitle>
                    <CardDescription>{group.exercises.length} exercises</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full">
                  {group.exercises.map((exercise, index) => (
                    <AccordionItem key={index} value={`${group.muscleGroup}-${index}`} className="border-b last:border-0">
                      <AccordionTrigger className="px-6 py-4 hover:bg-muted/50 text-left">
                        <div className="flex items-start gap-3">
                          <Badge variant="outline" className="mt-0.5 shrink-0">
                            {index + 1}
                          </Badge>
                          <span className="font-medium">{exercise.name}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4">
                        <div className="space-y-3 text-sm">
                          <p className="text-muted-foreground leading-relaxed">
                            {exercise.description}
                          </p>
                          <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <div>
                                <p className="font-medium text-primary text-xs mb-1">Form Cue:</p>
                                <p className="text-foreground/80">{exercise.formCue}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
