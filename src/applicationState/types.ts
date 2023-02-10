export type SuccessAction<T = any>= {
    type: string;
    data: T;
}

export type ErrorAction = {
    type: string;
    error: any;
}

export type ResultAction<T> = SuccessAction<T> | ErrorAction;
