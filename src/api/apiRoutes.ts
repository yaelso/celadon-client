const API_ROUTES = {
    categories: '/categories',
    checklists: '/checklists',
    tasks: '/tasks',
    habits: '/habits',
    habits_updateReps: (id: number) => `/habits/${id}/update_reps`,
};
