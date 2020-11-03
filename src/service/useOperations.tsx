import {
    Result,
    APIError,
    useQuery,
    FetchData,
    useMutation,
    UseQueryOptions,
    UseClientRequestResult
}                           from 'graphql-hooks'

import { OperationModel }   from '@models/OperationModel';

export interface ListReturn<T> {
    data: T;
    loading: boolean;
    error: APIError;
    cacheHit: boolean;
    refetch: (options?: UseQueryOptions) => Promise<UseClientRequestResult<UseQueryOptions>>;
}

export interface CreateReturn<T> {
    create: FetchData<Result, T>;
    creating: boolean;
    createError: APIError;
}

export interface UpdateReturn<T>  {
    update: FetchData<Result, T>;
    updating: boolean;
    updateError: APIError;
}

export interface RemoveReturn {
    remove: FetchData<Result, Record<string, unknown>>;
    removing: boolean;
    removeError: APIError;
}

const OPERATIONS_BY_PERIOD_QUERY = (fields: Array<keyof OperationModel>, period: Record<string, unknown>): string => `
query QueryRootType {
    operationsByPeriod(month: "${period.month}", year: "${period.year}") {
        ${fields}
    }
}`

const OPERATIONS_TO_CALCULATE_QUERY = (fields: Array<keyof OperationModel>, period: Record<string, unknown>): string => `
query QueryRootType {
    operationsToCalculate(month: "${period.month}", year: "${period.year}") {
        ${fields}
    }
}`

const CREATE_OPERATION_MUTATION = (): string => `
mutation Mutation($title: String!, $amount: String!, $date: String!, $isPassed: Boolean!, $isCredit: Boolean!) {
  addOperation(title: $title, amount: $amount, date: $date, isPassed: $isPassed, isCredit: $isCredit) {
    title, amount, date, isPassed, isCredit
  }
}`

const UPDATE_OPERATION_MUTATION = (id: string): string => `
mutation Mutation($title: String!, $amount: String!, $date: String!, $isPassed: Boolean!, $isCredit: Boolean!) {
    updateOperation(_id: "${id}", title: $title, amount: $amount, date: $date, isPassed: $isPassed, isCredit: $isCredit) {
      _id
    }
}`

const REMOVE_OPERATION_MUTATION = (): string => `
mutation Mutation($_id: String!) {
    removeOperation(_id: $_id) {
      _id
    }
}`

const useOperationsByPeriod = (fields?: Array<keyof OperationModel>, period?: Record<string, unknown>): ListReturn<OperationModel[]> => {
    const { cacheHit, data = { operationsByPeriod: [] }, loading, error, refetch } = useQuery(OPERATIONS_BY_PERIOD_QUERY(fields, period));
    return { cacheHit, loading, error, data: data.operationsByPeriod, refetch };
}

const useOperationsToCalculate = (fields?: Array<keyof OperationModel>, period?: Record<string, unknown>): ListReturn<OperationModel[]> => {
    const { cacheHit, data = { operationsToCalculate: [] }, loading, error, refetch } = useQuery(OPERATIONS_TO_CALCULATE_QUERY(fields, period));
    return { cacheHit, loading, error, data: data.operationsToCalculate, refetch };
}

const useOperationCreate = (): CreateReturn<OperationModel> => {
    const [addOperation, { loading: creating, error: createError }] = useMutation(CREATE_OPERATION_MUTATION());
    return { create: addOperation, creating, createError };
}

const useOperationUpdate = (entity: OperationModel): UpdateReturn<OperationModel> => {
    const [updateOperation, { loading: updating, error: updateError }] = useMutation(entity ? UPDATE_OPERATION_MUTATION(entity._id) : '');
    return { update: updateOperation, updating, updateError };
}

const useOperationRemove = (): RemoveReturn => {
    const [removeOperation, { loading: removing, error: removeError }] = useMutation(REMOVE_OPERATION_MUTATION());
    return { remove: removeOperation, removing, removeError };
}

export { useOperationsByPeriod, useOperationsToCalculate, useOperationCreate, useOperationUpdate, useOperationRemove };
