import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface WorkoutLog {
    day: Weekday;
    completionTime: Time;
    durationMinutes?: bigint;
    notes?: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export enum Weekday {
    tuesday = "tuesday",
    wednesday = "wednesday",
    saturday = "saturday",
    thursday = "thursday",
    sunday = "sunday",
    friday = "friday",
    monday = "monday"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteWorkoutLog(index: bigint): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    getWorkoutLogs(): Promise<Array<WorkoutLog>>;
    isCallerAdmin(): Promise<boolean>;
    logWorkout(day: Weekday, durationMinutes: bigint | null, notes: string | null): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
