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
    kind: 'success' | 'error' | 'auth_required';
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
            data: {
                accessToken: string;
                refreshToken: string;
                user: { id: string; login: string };
            };
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
            data: {
                accessToken: string;
                refreshToken: string;
                user: { id: string; login: string };
            };
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
            data: {
                accessToken: string;
                refreshToken: string;
                user: { id: string; login: string };
            };
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
        export type ResponseBody = { data: { id: string; login: string }; status: Status };
    }
}
