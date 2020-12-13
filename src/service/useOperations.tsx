import { useQuery, useMutation, UseQueryState, TypedDocumentNode, UseMutationState } from 'urql';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import { OperationModel }   from '@models/OperationModel';

const OPERATIONS_BY_PERIOD_QUERY: DocumentNode = gql`
    query ($month: String!, $year: String!, $accountId: String!) {
        getOperationsByPeriod(month: $month, year: $year, accountId: $accountId){
            _id, title, categories, amount, date, isPassed, isCredit, userId, accountId
        }
    }
`;

const OPERATIONS_TO_CALCULATE_QUERY: DocumentNode = gql`
    query ($month: String!, $year: String!, $accountId: String!) {
        getOperationsToCalculate(month: $month, year: $year, accountId: $accountId){
            _id, amount, isPassed, isCredit
        }
    }
`;

const CREATE_OPERATION_MUTATION: TypedDocumentNode = gql`
    mutation CreateOperationMutation(
        $title: String!,
        $categories: [String!]!,
        $amount: String!,
        $date: String!,
        $isPassed: Boolean!,
        $isCredit: Boolean!,
        $userId: String!
        $accountId: String!
    ){
        createOperation(
            title: $title, 
            categories: $categories, 
            amount: $amount,
            date: $date,
            isPassed: $isPassed,
            isCredit: $isCredit, 
            userId: $userId, 
            accountId: $accountId
        ){
            _id, title, categories, amount, date, isPassed, isCredit, userId, accountId
        }
    }
`;

const UPDATE_OPERATION_MUTATION: TypedDocumentNode = gql`
    mutation UpdateOperationMutation(
        $_id: ID!,
        $title: String,
        $categories: [String!],
        $amount: String,
        $date: String,
        $isPassed: Boolean,
        $isCredit: Boolean
    ){
        updateOperation(
            _id: $_id,
            title: $title, 
            categories: $categories, 
            amount: $amount,
            date: $date,
            isPassed: $isPassed,
            isCredit: $isCredit
        ){
            _id, title, categories, amount, date, isPassed, isCredit
        }
    }
`;

const UPDATE_OPERATIONS_MUTATION: TypedDocumentNode = gql`
    mutation UpdateOperationsMutation(
        $selected: [ID!]!,
        $isPassed: Boolean
    ){
        updateOperations(
            selected: $selected,
            isPassed: $isPassed
        ){
            selected
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

const DELETE_OPERATIONS_MUTATION: TypedDocumentNode = gql`
    mutation DeleteOperationsMutation(
        $selected: [ID!]!
    ){
        deleteOperations(
            selected: $selected
        ){
            selected
        }
    }
`;

const useOperationsByPeriod = (month: string, year: string, accountId: string): UseQueryState<OperationModel[]> => {
    const [{ data = { getOperationsByPeriod: [] }, fetching, error, stale }] = useQuery({ query: OPERATIONS_BY_PERIOD_QUERY, variables: { month, year, accountId } });
    return { data: data.getOperationsByPeriod, fetching, error, stale };
}

const useOperationsToCalculate = (month: string, year: string, accountId: string): UseQueryState<OperationModel[]> => {
    const [{ data = { getOperationsToCalculate: [] }, fetching, error, stale }] = useQuery({ query: OPERATIONS_TO_CALCULATE_QUERY, variables: { month, year, accountId } });
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

const useOperationsUpdate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(UPDATE_OPERATIONS_MUTATION);
    return { state, executeMutation };
}

const useOperationDelete = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(DELETE_OPERATION_MUTATION);
    return { state, executeMutation };
}

const useOperationsDelete = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(DELETE_OPERATIONS_MUTATION);
    return { state, executeMutation };
}

export {
    useOperationsByPeriod,
    useOperationsToCalculate,
    useOperationCreate, 
    useOperationUpdate,
    useOperationDelete,
    useOperationsDelete,
    useOperationsUpdate
};
