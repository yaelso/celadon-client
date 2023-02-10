import { Checklist } from "../checklists/models";

export type Category = {
    id: number;
    user_id: number;
    title: string;
    description: string;
    checklists: Checklist[];
}
