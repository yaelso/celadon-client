export const API_ROUTES = () => {
    const apiRoot = process.env['REACT_APP_DEV_API_ROOT'];

    return {
        Categories:              `${apiRoot}/categories`,
        Categories_Delete:       (id: number) => `${apiRoot}/categories/${id}`,
        Checklists:              `${apiRoot}/checklists`,
        Checklists_GetArchived:  `${apiRoot}/checklists/archive`,
        Checklists_GetFavorites: `${apiRoot}/checklists/favorites`,
        Checklists_Archive:      (id: number) => `${apiRoot}/checklists/${id}/archive`,
        Checklists_Unarchive:    (id: number) => `${apiRoot}/checklists/${id}/unarchive`,
        Checklists_Favorite:     (id: number) => `${apiRoot}/checklists/${id}/favorite`,
        Checklists_Unfavorite:   (id: number) => `${apiRoot}/checklists/${id}/unfavorite`,
        Checklists_Delete:       (id: number) => `${apiRoot}/checklists/${id}`,
        Tasks:                   `${apiRoot}/tasks`,
        Tasks_MarkComplete:      (id: number) => `${apiRoot}/tasks/${id}/mark_complete`,
        Tasks_MarkIncomplete:    (id: number) => `${apiRoot}/tasks/${id}/mark_incomplete`,
        Tasks_MarkInProgress:    (id: number) => `${apiRoot}/tasks/${id}/mark_in_progress`,
        Tasks_MarkNotInProgress: (id: number) => `${apiRoot}/tasks/${id}/mark_not_in_progress`,
        Tasks_SetDueDate:        (id: number) => `${apiRoot}/tasks/${id}/due_date`,
        Tasks_ClearDueDate:      (id: number) => `${apiRoot}/tasks/${id}/clear_due_date`,
        Tasks_Delete:            (id: number) => `${apiRoot}/tasks/${id}`,
        Habits:                  `${apiRoot}/habits`,
        Habits_UpdateReps:       (id: number) => `${apiRoot}/habits/${id}/update_reps`,
        Habits_ResetReps:        (id: number) => `${apiRoot}/habits/${id}/reset_reps`,
        Habits_Delete:           (id: number) => `${apiRoot}/habits/${id}`,
        Pokemon:                 `${apiRoot}/pokemon`,
        Pokemon_Delete:          (id: number) => `${apiRoot}/pokemon/${id}`,
        UserPokemon:             `${apiRoot}/user_pokemon`,
        UserPokemon_AddExp:      (id: number) => `${apiRoot}/user_pokemon/${id}/exp`,
        UserPokemon_ResetExp:    (id: number) => `${apiRoot}/user_pokemon/${id}/reset_exp`,
        User:                    `${apiRoot}/user`,
        User_Get:                (id: number) => `${apiRoot}/user/${id}`,
        User_SetActivePokemon:   (id: number) => `${apiRoot}/user/${id}/active_pokemon`,
        User_Delete:             (id: number) => `${apiRoot}/user/${id}`,
    };
};

export const makeApiRoute = (route: string) => `${process.env['REACT_APP_DEV_API_ROOT']}/${route}`;
