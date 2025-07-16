# REFACTOR TODO

## Interfaces
- [ ] Creare interfacce CreateTask, UpdateTask, TaskListItem
- [ ] Creare interfacce CreateGoal, UpdateGoal, GoalSummary  
- [ ] Sostituire Omit/Pick con interfacce dedicate

## ID Management
- [ ] Implementare funzione generateTaskId() → "tsk1", "tsk2"
- [ ] Implementare funzione generateGoalId() → "goal1", "goal2"
- [ ] Cambiare id da string|number a string

## Code Organization
- [ ] Spostare utility functions in /utils
- [ ] Creare barrel exports più puliti
- [ ] Aggiungere JSDoc alle interfacce

## Backend Integration (prossima settimana)
- [ ] Sostituire ID custom con UUID
- [ ] Implementare API calls
- [ ] Gestire stati loading/error