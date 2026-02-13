import { Dumbbell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function Header() {
  const [imgSrc, setImgSrc] = useState('/assets/generated/jessica-headshot-v2.dim_800x800.png');

  const handleImageError = () => {
    setImgSrc('/assets/generated/logo-jmf.dim_512x512.png');
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src={imgSrc}
            alt="JMF Logo" 
            className="h-10 w-10 rounded-full object-cover"
            onError={handleImageError}
          />
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight">Jéssica Magaly Fowler</span>
            <span className="text-xs text-muted-foreground">ISSA Certified Trainer</span>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('schedule')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Schedule
          </button>
          <button 
            onClick={() => scrollToSection('progress')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Progress
          </button>
          <button 
            onClick={() => scrollToSection('exercises')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Exercises
          </button>
          <button 
            onClick={() => scrollToSection('tools')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Tools
          </button>
          <button 
            onClick={() => scrollToSection('nutrition')}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Nutrition
          </button>
          <Button 
            onClick={() => scrollToSection('bio')}
            size="sm"
            className="ml-2"
          >
            <Dumbbell className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </nav>

        <Button 
          onClick={() => scrollToSection('bio')}
          size="sm"
          className="md:hidden"
        >
          Start
        </Button>
      </div>
    </header>
  );
}
