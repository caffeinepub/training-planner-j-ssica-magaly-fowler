import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calculator, Scale, AlertTriangle } from 'lucide-react';
import { calculateBMI, calculateIdealWeight } from '@/utils/healthCalculators';
import { toast } from 'sonner';

export function ToolsSection() {
  const [bmiHeight, setBmiHeight] = useState('');
  const [bmiWeight, setBmiWeight] = useState('');
  const [bmiResult, setBmiResult] = useState<{ bmi: number; category: string } | null>(null);

  const [idealHeight, setIdealHeight] = useState('');
  const [idealGender, setIdealGender] = useState<'male' | 'female'>('female');
  const [idealResult, setIdealResult] = useState<{ min: number; max: number } | null>(null);

  const handleBMICalculate = () => {
    const height = parseFloat(bmiHeight);
    const weight = parseFloat(bmiWeight);
    
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      toast.error('Please enter valid height and weight values');
      return;
    }
    
    const result = calculateBMI(height, weight);
    setBmiResult(result);
  };

  const handleIdealWeightCalculate = () => {
    const height = parseFloat(idealHeight);
    
    if (isNaN(height) || height <= 0) {
      toast.error('Please enter a valid height value');
      return;
    }
    
    const result = calculateIdealWeight(height, idealGender);
    setIdealResult(result);
  };

  return (
    <section id="tools" className="py-16 md:py-24">
      <div className="container">
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
            <Calculator className="h-4 w-4 text-primary" />
            <span className="font-medium">Health Tools</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Track Your Progress
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Use these tools to monitor your health metrics and set realistic goals. Remember, these are estimates to guide your journey.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="bmi" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
              <TabsTrigger value="ideal">Ideal Weight</TabsTrigger>
            </TabsList>

            <TabsContent value="bmi" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Body Mass Index (BMI)</CardTitle>
                  <CardDescription>Calculate your BMI to understand your weight category</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="bmi-height">Height (cm)</Label>
                      <Input
                        id="bmi-height"
                        type="number"
                        placeholder="170"
                        value={bmiHeight}
                        onChange={(e) => setBmiHeight(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bmi-weight">Weight (kg)</Label>
                      <Input
                        id="bmi-weight"
                        type="number"
                        placeholder="65"
                        value={bmiWeight}
                        onChange={(e) => setBmiWeight(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button onClick={handleBMICalculate} className="w-full">
                    Calculate BMI
                  </Button>

                  {bmiResult && (
                    <Alert className="bg-primary/5 border-primary/20">
                      <Scale className="h-4 w-4 text-primary" />
                      <AlertDescription>
                        <p className="font-semibold text-foreground mb-1">Your BMI:</p>
                        <p className="text-3xl font-bold text-primary mb-2">
                          {bmiResult.bmi.toFixed(1)}
                        </p>
                        <p className="text-sm">
                          Category: <span className="font-semibold">{bmiResult.category}</span>
                        </p>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <p className="font-semibold mb-1">Medical Disclaimer:</p>
                      <p>BMI is a screening tool and does not account for muscle mass, bone density, or body composition. Consult a healthcare professional for personalized health advice.</p>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ideal" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Ideal Weight Calculator</CardTitle>
                  <CardDescription>Estimate your healthy weight range based on height</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ideal-height">Height (cm)</Label>
                    <Input
                      id="ideal-height"
                      type="number"
                      placeholder="170"
                      value={idealHeight}
                      onChange={(e) => setIdealHeight(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <div className="flex gap-4">
                      <Button
                        type="button"
                        variant={idealGender === 'female' ? 'default' : 'outline'}
                        onClick={() => setIdealGender('female')}
                        className="flex-1"
                      >
                        Female
                      </Button>
                      <Button
                        type="button"
                        variant={idealGender === 'male' ? 'default' : 'outline'}
                        onClick={() => setIdealGender('male')}
                        className="flex-1"
                      >
                        Male
                      </Button>
                    </div>
                  </div>

                  <Button onClick={handleIdealWeightCalculate} className="w-full">
                    Calculate Ideal Weight
                  </Button>

                  {idealResult && (
                    <Alert className="bg-primary/5 border-primary/20">
                      <Scale className="h-4 w-4 text-primary" />
                      <AlertDescription>
                        <p className="font-semibold text-foreground mb-1">Your Ideal Weight Range:</p>
                        <p className="text-3xl font-bold text-primary mb-2">
                          {idealResult.min.toFixed(1)} - {idealResult.max.toFixed(1)} kg
                        </p>
                        <p className="text-sm text-muted-foreground">
                          This range represents a healthy weight for your height
                        </p>
                      </AlertDescription>
                    </Alert>
                  )}

                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-sm">
                      <p className="font-semibold mb-1">Medical Disclaimer:</p>
                      <p>This is an estimate based on general formulas. Individual ideal weight varies based on body composition, muscle mass, frame size, and health goals. Always consult with a healthcare professional.</p>
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
