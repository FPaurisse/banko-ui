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

const LIST_OPERATIONS_QUERY = `
query QueryRootType {
  operations {
    _id, title, amount, date
  }
}`

const CREATE_OPERATION_MUTATION = `
mutation Mutation($title: String!, $amount: String!, $date: String!) {
  addOperation(title: $title, amount: $amount, date: $date) {
    title, amount, date
  }
}`

const REMOVE_OPERATION_MUTATION = `
mutation Mutation($_id: String!) {
    removeOperation(_id: $_id) {
      _id
    }
}`

const useAllOperations = (): ListReturn<OperationModel[]> => {
    const { cacheHit,  data = { operations: [] }, loading, error, refetch } = useQuery(LIST_OPERATIONS_QUERY);
    return { cacheHit, loading, error, data: data.operations, refetch };
}

const useOperationCreate = (): CreateReturn<OperationModel> => {
    const [addOperation, { loading, error }] = useMutation(CREATE_OPERATION_MUTATION);
    return { create: addOperation, loading, error };
}

const useOperationRemove = (): RemoveReturn => {
    const [removeOperation, { loading, error }] = useMutation(REMOVE_OPERATION_MUTATION);
    return { remove: removeOperation, loading, error };
}

export { useAllOperations, useOperationCreate, useOperationRemove };
