import {
    useQuery,
    useMutation,
    APIError,
    FetchData,
    Result,
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
    loading: boolean;
    error: APIError;
}

export interface RemoveReturn {
    remove: FetchData<Result, Record<string, unknown>>;
    loading: boolean;
    error: APIError;
}

const OPERATIONS_BY_PERIOD_QUERY = (period: Record<string, unknown>): string => `
query QueryRootType {
    operations(month: "${period.month}", year: "${period.year}") {
        _id, title, amount, date, isPassed, isCredit
    }
}`

const CREATE_OPERATION_MUTATION = (): string => `
mutation Mutation($title: String!, $amount: String!, $date: String!, $isPassed: Boolean!, $isCredit: Boolean!) {
  addOperation(title: $title, amount: $amount, date: $date, isPassed: $isPassed, isCredit: $isCredit) {
    title, amount, date, isPassed, isCredit
  }
}`

const REMOVE_OPERATION_MUTATION = (): string => `
mutation Mutation($_id: String!) {
    removeOperation(_id: $_id) {
      _id
    }
}`

const useOperationsByPeriod = (period: Record<string, unknown>): ListReturn<OperationModel[]> => {
    const { cacheHit, data = { operations: [] }, loading, error, refetch } = useQuery(OPERATIONS_BY_PERIOD_QUERY(period));
    return { cacheHit, loading, error, data: data.operations, refetch };
}

const useOperationCreate = (): CreateReturn<OperationModel> => {
    const [addOperation, { loading, error }] = useMutation(CREATE_OPERATION_MUTATION());
    return { create: addOperation, loading, error };
}

const useOperationRemove = (): RemoveReturn => {
    const [removeOperation, { loading, error }] = useMutation(REMOVE_OPERATION_MUTATION());
    return { remove: removeOperation, loading, error };
}

export { useOperationsByPeriod, useOperationCreate, useOperationRemove };
