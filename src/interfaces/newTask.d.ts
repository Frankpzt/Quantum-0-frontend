export interface INewTask {
    name: string;
    start: string;
    end: string;
    priority: string;
    checked: boolean;
    assignee: string;
    reporter: string;
    note: string;
    isNewTaskUploaded: "fulfilled" | "pending" | "rejected" | "initial";
}
