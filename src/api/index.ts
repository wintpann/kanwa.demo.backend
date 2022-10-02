/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface Status {
    kind: 'error' | 'success' | 'auth_required';
    message?: string;
    notifyMessage?: string;
}

export interface Comment {
    /** @example 008524ef-0e22-4e38-bf8f-8c721ebda817 */
    id: string;

    /** @example 008524ef-0e22-4e38-bf8f-8c721ebda817 */
    todoId: string;

    /** @example Great todo, innit? */
    content: string;
}

export interface Label {
    /** @example 008524ef-0e22-4e38-bf8f-8c721ebda817 */
    id: string;

    /** @example First things first */
    title: string;
}

export interface Priority {
    /** @example 008524ef-0e22-4e38-bf8f-8c721ebda817 */
    id: string;

    /** @example First things first */
    title: string;

    /** @example #ff00ff */
    color: string;
}

export interface User {
    /** @example 008524ef-0e22-4e38-bf8f-8c721ebda817 */
    id: string;

    /** @example wintpann */
    login: string;
}

export interface Todo {
    /** @example 008524ef-0e22-4e38-bf8f-8c721ebda817 */
    id: string;

    /** @example Learn something */
    title: string;

    /** @example Learn something cool & interesting */
    description: string | null;

    /** @example false */
    checked: boolean;
    comments: Comment[];
    labels: Label[];
    priority: Priority | null;

    /**
     * @format date-time
     * @example 2022-10-01T18:00:00.000Z
     */
    dueDateISO: string | null;
}

export namespace Api {
    /**
     * @description Signup a user
     * @tags User
     * @name UsersSignupCreate
     * @request POST:/api/users/signup
     */
    export namespace UsersSignupCreate {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = { login: string; password: string };
        export type RequestHeaders = {};
        export type ResponseBody = {
            data: { accessToken: string; refreshToken: string; user: User };
            status: Status;
        };
    }
    /**
     * @description Login a user
     * @tags User
     * @name UsersLoginCreate
     * @request POST:/api/users/login
     */
    export namespace UsersLoginCreate {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = { login: string; password: string };
        export type RequestHeaders = {};
        export type ResponseBody = {
            data: { accessToken: string; refreshToken: string; user: User };
            status: Status;
        };
    }
    /**
     * @description Refresh tokens
     * @tags User
     * @name UsersRefreshCreate
     * @request POST:/api/users/refresh
     */
    export namespace UsersRefreshCreate {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { refresh_token: string };
        export type ResponseBody = {
            data: { accessToken: string; refreshToken: string; user: User };
            status: Status;
        };
    }
    /**
     * @description Get current logged user
     * @tags User
     * @name UsersMeList
     * @request GET:/api/users/me
     */
    export namespace UsersMeList {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { data: User; status: Status };
    }
    /**
     * @description Delete a comment
     * @tags Comment
     * @name CommentsDelete
     * @request DELETE:/api/comments/{commentId}
     */
    export namespace CommentsDelete {
        export type RequestParams = { commentId: string };
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status };
    }
    /**
     * @description Create a comment
     * @tags Comment
     * @name CommentsCreate
     * @request POST:/api/comments
     */
    export namespace CommentsCreate {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = { todoId: string; content: string };
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Comment };
    }
    /**
     * @description Update a label
     * @tags Label
     * @name LabelsUpdate
     * @request PUT:/api/labels/{labelId}
     */
    export namespace LabelsUpdate {
        export type RequestParams = { labelId: string };
        export type RequestQuery = {};
        export type RequestBody = { title?: string };
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Label };
    }
    /**
     * @description Delete a label
     * @tags Label
     * @name LabelsDelete
     * @request DELETE:/api/labels/{labelId}
     */
    export namespace LabelsDelete {
        export type RequestParams = { labelId: string };
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status };
    }
    /**
     * @description Get user labels
     * @tags Label
     * @name LabelsList
     * @request GET:/api/labels
     */
    export namespace LabelsList {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Label[] };
    }
    /**
     * @description Create a label
     * @tags Label
     * @name LabelsCreate
     * @request POST:/api/labels
     */
    export namespace LabelsCreate {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = { title: string };
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Label };
    }
    /**
     * @description Delete a priority
     * @tags Priority
     * @name PrioritiesDelete
     * @request DELETE:/api/priorities/{priorityId}
     */
    export namespace PrioritiesDelete {
        export type RequestParams = { priorityId: string };
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status };
    }
    /**
     * @description Update a priority
     * @tags Priority
     * @name PrioritiesUpdate
     * @request PUT:/api/priorities/{priorityId}
     */
    export namespace PrioritiesUpdate {
        export type RequestParams = { priorityId: string };
        export type RequestQuery = {};
        export type RequestBody = { title?: string; color?: string };
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Priority };
    }
    /**
     * @description Get user priorities
     * @tags Priority
     * @name PrioritiesList
     * @request GET:/api/priorities
     */
    export namespace PrioritiesList {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Priority[] };
    }
    /**
     * @description Create a priority
     * @tags Priority
     * @name PrioritiesCreate
     * @request POST:/api/priorities
     */
    export namespace PrioritiesCreate {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = { title: string; color: string };
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Priority };
    }
    /**
     * @description Create a todo
     * @tags Todo
     * @name TodosCreate
     * @request POST:/api/todos
     */
    export namespace TodosCreate {
        export type RequestParams = {};
        export type RequestQuery = {};
        export type RequestBody = {
            title: string;
            description?: string;
            labelIds?: string[];
            priorityId?: string;
            dueDateISO?: string;
        };
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Todo };
    }
    /**
     * @description Get user todos
     * @tags Todo
     * @name TodosList
     * @request GET:/api/todos
     */
    export namespace TodosList {
        export type RequestParams = {};
        export type RequestQuery = {
            checked?: string;
            labelIds?: string[];
            priorityIds?: string[];
            fromDueDate?: string;
            toDueDate?: string;
        };
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Todo[] };
    }
    /**
     * @description Update a todo
     * @tags Todo
     * @name TodosUpdate
     * @request PUT:/api/todos/{todoId}
     */
    export namespace TodosUpdate {
        export type RequestParams = { todoId: string };
        export type RequestQuery = {};
        export type RequestBody = {
            title?: string;
            description?: string | null;
            checked?: string;
            labelIds?: string[];
            priorityId?: string | null;
            dueDateISO?: string | null;
        };
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Todo };
    }
    /**
     * @description Get a todo by id
     * @tags Todo
     * @name TodosDetail
     * @request GET:/api/todos/{todoId}
     */
    export namespace TodosDetail {
        export type RequestParams = { todoId: string };
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status; data: Todo };
    }
    /**
     * @description Delete a todo
     * @tags Todo
     * @name TodosDelete
     * @request DELETE:/api/todos/{todoId}
     */
    export namespace TodosDelete {
        export type RequestParams = { todoId: string };
        export type RequestQuery = {};
        export type RequestBody = never;
        export type RequestHeaders = { access_token: string };
        export type ResponseBody = { status: Status };
    }
}
