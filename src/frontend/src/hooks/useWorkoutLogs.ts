import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useInternetIdentity } from './useInternetIdentity';
import { type WorkoutLog, type Weekday } from '@/backend';
import { toast } from 'sonner';

export function useGetWorkoutLogs() {
  const { actor, isFetching: actorFetching } = useActor();
  const { identity } = useInternetIdentity();

  const query = useQuery<WorkoutLog[]>({
    queryKey: ['workoutLogs'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getWorkoutLogs();
    },
    enabled: !!actor && !actorFetching && !!identity,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
  };
}

export function useLogWorkout() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      day,
      durationMinutes,
      notes,
    }: {
      day: Weekday;
      durationMinutes?: number;
      notes?: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      
      const duration = durationMinutes ? BigInt(durationMinutes) : null;
      const notesValue = notes && notes.trim() ? notes.trim() : null;
      
      await actor.logWorkout(day, duration, notesValue);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      toast.success('Workout logged successfully!');
    },
    onError: (error: Error) => {
      console.error('Failed to log workout:', error);
      if (error.message.includes('Unauthorized')) {
        toast.error('Please sign in to log workouts');
      } else {
        toast.error('Failed to log workout. Please try again.');
      }
    },
  });
}

export function useDeleteWorkoutLog() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (index: number) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteWorkoutLog(BigInt(index));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['workoutLogs'] });
      toast.success('Workout log deleted');
    },
    onError: (error: Error) => {
      console.error('Failed to delete workout log:', error);
      toast.error('Failed to delete workout log. Please try again.');
    },
  });
}
