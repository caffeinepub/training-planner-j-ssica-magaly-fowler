import Principal "mo:core/Principal";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Array "mo:core/Array";
import Iter "mo:core/Iter";

import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";


actor {
  public type Weekday = {
    #monday;
    #tuesday;
    #wednesday;
    #thursday;
    #friday;
    #saturday;
    #sunday;
  };

  public type WorkoutLog = {
    day : Weekday;
    completionTime : Time.Time;
    durationMinutes : ?Nat;
    notes : ?Text;
  };

  public type UserProfile = {
    name : Text;
  };

  let workoutLogs = Map.empty<Principal, [WorkoutLog]>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public shared ({ caller }) func logWorkout(day : Weekday, durationMinutes : ?Nat, notes : ?Text) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can log workouts");
    };

    let newLog : WorkoutLog = {
      day;
      durationMinutes;
      notes;
      completionTime = Time.now();
    };

    let currentLogs = switch (workoutLogs.get(caller)) {
      case (?logs) { logs };
      case (null) { [] };
    };

    let updatedLogs = currentLogs.concat([newLog]);
    workoutLogs.add(caller, updatedLogs);
  };

  public query ({ caller }) func getWorkoutLogs() : async [WorkoutLog] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view their workout logs");
    };
    switch (workoutLogs.get(caller)) {
      case (?logs) { logs };
      case (null) { [] };
    };
  };

  public shared ({ caller }) func deleteWorkoutLog(index : Nat) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can delete workout logs");
    };

    let currentLogs = switch (workoutLogs.get(caller)) {
      case (?logs) { logs };
      case (null) { [] };
    };

    if (index >= currentLogs.size()) {
      Runtime.trap("Invalid index");
    };

    let updatedLogs = Array.tabulate(
      currentLogs.size() - 1,
      func(i) {
        if (i < index) { currentLogs[i] } else { currentLogs[i + 1] };
      },
    );
    workoutLogs.add(caller, updatedLogs);
  };
};
