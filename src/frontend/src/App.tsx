import { Header } from './components/training-planner/Header';
import { HeroSection } from './components/training-planner/HeroSection';
import { WeeklyTrainingSchedule } from './components/training-planner/WeeklyTrainingSchedule';
import { ProgressTrackingSection } from './components/training-planner/ProgressTrackingSection';
import { ExerciseLibrarySection } from './components/training-planner/ExerciseLibrarySection';
import { HydrationSection } from './components/training-planner/HydrationSection';
import { ToolsSection } from './components/training-planner/ToolsSection';
import { NutritionGuideSection } from './components/training-planner/NutritionGuideSection';
import { ProfessionalBioSection } from './components/training-planner/ProfessionalBioSection';
import { Footer } from './components/training-planner/Footer';
import { Toaster } from '@/components/ui/sonner';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetWorkoutLogs } from './hooks/useWorkoutLogs';

function App() {
  const { identity } = useInternetIdentity();
  const { data: workoutLogs = [] } = useGetWorkoutLogs();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WeeklyTrainingSchedule 
          workoutLogs={workoutLogs} 
          isAuthenticated={isAuthenticated}
        />
        <ProgressTrackingSection />
        <ExerciseLibrarySection />
        <HydrationSection />
        <ToolsSection />
        <NutritionGuideSection />
        <ProfessionalBioSection />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
