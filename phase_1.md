---
Titlle: Fitness Training Software – Phase 1
Author: Rudra Goyani (8017876)
Term: Winter 2025
Course: COMP 2450
---


```mermaid

classDiagram

%% ============== Core ==============

class User {
  Text name
  Text email
  PositiveNumber heightCm
  PositiveNumber weightKg

  assignProgram(Program, Date) PlanAssignment
}

note for User "Invariants:
  * name.length() > 0
  * email has one '@', domain has '.', no spaces
  * heightCm > 0, weightKg > 0
  Pre/Post:
  * assignProgram(p, s): Pre p != null & s != null; Post returns PlanAssignment for this user starting s
"

class Program {
  Text title
  Text goalType          
  PositiveNumber durationWeeks
  List~Workout~ workouts

  addWorkout(Workout) void
}

note for Program "Invariants:
  * title.length() > 0
  * durationWeeks >= 1
  * workouts != null and workouts.size() >= 1
  Pre/Post:
  * addWorkout(w): Pre w != null; Post w appended to workouts
"

class Workout {
  Text title
  Number dayNumber      
  Text status            
  List~WorkoutExercise~ exercises

  addExercise(WorkoutExercise) void
  markCompleted() void
}

note for Workout "Invariants:
  * title.length() > 0
  * dayNumber >= 1
  * status ∈ {'PLANNED','SKIPPED','COMPLETED'}
  * exercises != null and exercises.size() >= 1
  Pre/Post:
  * addExercise(ex): Pre ex != null & order unique; Post ex added
  * markCompleted(): Pre status != 'COMPLETED'; Post status == 'COMPLETED'
"

class WorkoutExercise {
  Number orderIndex
  Exercise exercise
  SetScheme scheme
  Text cues
}

note for WorkoutExercise "Invariants:
  * orderIndex >= 1 (unique within parent)
  * exercise != null
  * scheme != null
"

class Exercise {
  Text name
  Text primaryMuscle    
}

note for Exercise "Invariants:
  * name.length() > 0 (unique in catalog)
  * primaryMuscle in allowed set
"

class SetScheme {
  PositiveNumber sets
  Text reps             
  Text intensity        
  NonNegativeNumber restSec
  Text tempo            

  validate() void
}

note for SetScheme "Invariants:
  * sets >= 1
  * reps ∈ { integer string, 'a-b' with 1<=a<=b, 'AMRAP' }
  * intensity ∈ { 'BW', '%1RM*', 'RPE*', numeric range with unit }
  * restSec >= 0
  * tempo matches 'a-b-c-d' (digits or 'X')
  Pre/Post:
  * validate(): Pre none; Post flags error if any invariant fails
"

class PlanAssignment {
  User user
  Program program
  Date startDate
}

note for PlanAssignment "Invariants:
  * user != null
  * program != null
  * startDate != null
"

class WorkoutLog {
  User user
  Workout workout
  DateTime startedAt
  DateTime finishedAt
  Text notes

  addSetLog(SetLog) void
  complete(DateTime) void
}

note for WorkoutLog "Invariants:
  * user != null & workout != null
  * startedAt != null
  * if finishedAt present then finishedAt >= startedAt
  * notes == null or notes.length() <= 500
  Pre/Post:
  * addSetLog(sl): Pre sl != null; Post sl appended
  * complete(t): Pre t != null & t >= startedAt; Post finishedAt == t
"

class SetLog {
  WorkoutExercise workoutExercise
  PositiveNumber setNumber
  NonNegativeNumber reps
  NonNegativeNumber loadKg
  Number rpe
  NonNegativeNumber restSecActual
}

note for SetLog "Invariants:
  * workoutExercise != null
  * setNumber >= 1
  * reps >= 0
  * loadKg >= 0
  * if rpe present then 1.0 <= rpe <= 10.0
  * restSecActual >= 0
"

class Goal {
  User user
  Text kpi         
  Number targetValue
  Text unit
  Date targetDate

  markAchieved(Date) void
}

note for Goal "Invariants:
  * user != null
  * kpi in allowed set
  * targetValue > 0
  * unit.length() > 0
  * targetDate >= today
  Pre/Post:
  * markAchieved(d): Pre d != null & d <= targetDate; Post achievement recorded
"

%% ============== Relationships (diamonds) ==============
User "1" o-- "0..*" PlanAssignment : assigned
PlanAssignment "1" o-- "1" Program : references

Program *-- "1..*" Workout : contains
Workout *-- "1..*" WorkoutExercise : orders
WorkoutExercise *-- "1" SetScheme : prescribes
WorkoutExercise "1" o-- "1" Exercise : uses

User "1" o-- "0..*" WorkoutLog : logs
WorkoutLog "1" o-- "1" Workout : for
WorkoutLog *-- "0..*" SetLog : has
User "1" o-- "0..*" Goal : pursues