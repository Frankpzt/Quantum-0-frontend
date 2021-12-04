export interface Task {
    id: string;
    name: string;
    start: string;
    end: string;
    priority: "critical" | "important" | "normal";
    checked: boolean;
    assignee: string;
    reporter: string;
    note: string;
}

export interface Tasks {
    data: Array<Task>;
}
