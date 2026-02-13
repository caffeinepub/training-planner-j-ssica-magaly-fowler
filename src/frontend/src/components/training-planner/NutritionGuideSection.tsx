import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Apple, ChefHat, Clock, Flame } from 'lucide-react';
import { nutritionGuideData } from '@/content/nutritionGuideData';

export function NutritionGuideSection() {
  return (
    <section id="nutrition" className="py-16 md:py-24 bg-muted/30">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
            <Apple className="h-4 w-4 text-primary" />
            <span className="font-medium">Nutrition Guide</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Fuel Your Transformation
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Body recomposition requires strategic nutrition. Build muscle and lose fat simultaneously with these science-backed principles and practical recipes.
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-primary" />
                Body Recomposition Principles
              </CardTitle>
              <CardDescription>The foundation of simultaneous muscle gain and fat loss</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {nutritionGuideData.principles.map((principle, index) => (
                  <div key={index} className="rounded-lg border bg-card p-4 space-y-2">
                    <h4 className="font-semibold text-foreground">{principle.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <ChefHat className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">3 Practical Recipes</h3>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {nutritionGuideData.recipes.map((recipe, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardHeader className="bg-primary/5 border-b">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline">{recipe.mealType}</Badge>
                      <Badge variant="secondary" className="ml-auto">
                        <Clock className="h-3 w-3 mr-1" />
                        {recipe.prepTime}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <CardDescription className="text-xs">{recipe.macros}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="ingredients" className="border-b">
                        <AccordionTrigger className="px-6 py-3 hover:bg-muted/50">
                          Ingredients
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <ul className="space-y-1.5 text-sm">
                            {recipe.ingredients.map((ingredient, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-primary mt-1">•</span>
                                <span className="text-muted-foreground">{ingredient}</span>
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="instructions" className="border-0">
                        <AccordionTrigger className="px-6 py-3 hover:bg-muted/50">
                          Instructions
                        </AccordionTrigger>
                        <AccordionContent className="px-6 pb-4">
                          <ol className="space-y-2 text-sm">
                            {recipe.instructions.map((instruction, i) => (
                              <li key={i} className="flex gap-3">
                                <Badge variant="outline" className="shrink-0 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                                  {i + 1}
                                </Badge>
                                <span className="text-muted-foreground pt-0.5">{instruction}</span>
                              </li>
                            ))}
                          </ol>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <p className="text-sm text-center text-muted-foreground">
                <strong className="text-foreground">Remember:</strong> Consistency beats perfection. Focus on whole foods, adequate protein, and sustainable habits. Adjust portions based on your progress and energy levels.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
