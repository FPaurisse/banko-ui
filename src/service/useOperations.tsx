import { useQuery, useMutation, UseQueryState, TypedDocumentNode, UseMutationState } from 'urql';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import { OperationModel }   from '@models/OperationModel';

const OPERATIONS_BY_PERIOD_QUERY: DocumentNode = gql`
    query ($month: String!, $year: String!) {
        getOperationsByPeriod(month: $month, year: $year){
            _id, title, amount, date, isPassed, isCredit, user{
                _id, name, email
            }
        }
    }
`;

const OPERATIONS_TO_CALCULATE_QUERY: DocumentNode = gql`
    query ($month: String!, $year: String!) {
        getOperationsToCalculate(month: $month, year: $year){
            _id, amount, isPassed, isCredit
        }
    }
`;

const CREATE_OPERATION_MUTATION: TypedDocumentNode = gql`
    mutation CreateOperationMutation(
        $title: String!,
        $amount: String!,
        $date: String!,
        $isPassed: Boolean!,
        $isCredit: Boolean!
    ){
        createOperation(
            title: $title, 
            amount: $amount,
            date: $date,
            isPassed: $isPassed,
            isCredit: $isCredit
        ){
            _id, title, amount, date, isPassed, isCredit
        }
    }
`;

const UPDATE_OPERATION_MUTATION: TypedDocumentNode = gql`
    mutation UpdateOperationMutation(
        $_id: ID!,
        $title: String,
        $amount: String,
        $date: String,
        $isPassed: Boolean,
        $isCredit: Boolean
    ){
        updateOperation(
            _id: $_id,
            title: $title, 
            amount: $amount,
            date: $date,
            isPassed: $isPassed,
            isCredit: $isCredit
        ){
            _id, title, amount, date, isPassed, isCredit
        }
    }
`;

const DELETE_OPERATION_MUTATION: TypedDocumentNode = gql`
    mutation DeleteOperationMutation(
        $_id: ID!
    ){
        deleteOperation(
            _id: $_id
        ){
            _id
        }
    }
`;

const useOperationsByPeriod = (period: Record<string, unknown>): UseQueryState<OperationModel[]> => {
    const [{ data = { getOperationsByPeriod: [] }, fetching, error, stale }] = useQuery({ query: OPERATIONS_BY_PERIOD_QUERY, variables: { month: period.month, year: period.year } })
    return { data: data.getOperationsByPeriod, fetching, error, stale };
}

const useOperationsToCalculate = (period: Record<string, unknown>): UseQueryState<OperationModel[]> => {
    const [ { data = { getOperationsToCalculate: [] }, fetching, error, stale } ] = useQuery({ query: OPERATIONS_TO_CALCULATE_QUERY, variables: { month: period.month, year: period.year } })
    return { data: data.getOperationsToCalculate, fetching, error, stale };
}

const useOperationCreate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(CREATE_OPERATION_MUTATION);
    return { state, executeMutation };
}

const useOperationUpdate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(UPDATE_OPERATION_MUTATION);
    return { state, executeMutation };
}

const useOperationDelete = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(DELETE_OPERATION_MUTATION);
    return { state, executeMutation };
}

export { useOperationsByPeriod, useOperationsToCalculate, useOperationCreate, useOperationUpdate, useOperationDelete };
