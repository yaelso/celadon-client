import { Task } from "../tasks/models";

export type Checklist = {
    id: number;
    title: string;
    description: string;
    category_id: number;
    is_archived: boolean;
    is_favorited: boolean;
    task: Task[];
}
