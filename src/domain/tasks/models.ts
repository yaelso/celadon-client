export type Task = {
    id: number;
    title: string;
    checklist_id: number;
    is_complete: boolean;
    in_progress: boolean;
    due_date: Date;
}
