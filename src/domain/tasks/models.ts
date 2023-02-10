export type Task = {
    id: number;
    title: string;
    checklist_id: number;
    completed_at: Date;
    in_progress: boolean;
    due_date: Date;
}
