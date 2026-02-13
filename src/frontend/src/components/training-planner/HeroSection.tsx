import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Target, Zap } from 'lucide-react';
import { openWhatsAppChat } from '@/utils/whatsapp';

export function HeroSection() {
  const scrollToBio = () => {
    const element = document.getElementById('bio');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
      
      <div className="container relative py-16 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm">
              <Award className="h-4 w-4 text-primary" />
              <span className="font-medium">ISSA Florida Certified</span>
            </div>
            
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              Transform Your Body,
              <span className="block text-primary mt-2">Elevate Your Life</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Welcome to your personalized Training Planner. Build strength, lose fat, and achieve body recomposition with science-backed programming and expert nutrition guidance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={openWhatsAppChat} className="text-base">
                Book Your Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => {
                  const element = document.getElementById('schedule');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-base"
              >
                View Training Plan
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border/50">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold">8+</p>
                </div>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold">100%</p>
                </div>
                <p className="text-sm text-muted-foreground">Personalized</p>
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <p className="text-2xl font-bold">ISSA</p>
                </div>
                <p className="text-sm text-muted-foreground">Certified</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-3xl blur-3xl" />
            <img 
              src="/assets/generated/hero-photo-v2.dim_1600x900.png"
              alt="Training Planner Hero"
              className="relative rounded-3xl shadow-2xl w-full object-cover aspect-video"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
