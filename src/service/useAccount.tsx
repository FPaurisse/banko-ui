import { TypedDocumentNode, useMutation, UseMutationState, useQuery, UseQueryState } from 'urql';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import { AccountModel }   from '@models/AccountModel';

const ACCOUNTS_BY_USER_QUERY: DocumentNode = gql`
    query ($userId: String!) {
        getAccountsByUser(userId: $userId){
            _id, title, userId, guests, guestAccount
        }
    }
`;

const CREATE_ACCOUNT_MUTATION: TypedDocumentNode = gql`
    mutation CreateAccountMutation(
        $title: String!,
        $userId: String!,
        $guests: [String!]
    ){
        createAccount(
            title: $title,  
            userId: $userId,
            guests: $guests
        ){
            _id, title, userId, guests
        }
    }
`;

const UPDATE_ACCOUNT_MUTATION: TypedDocumentNode = gql`
    mutation updateAccountMutation(
        $_id: ID!,
        $title: String!,
        $guests: [String!]
    ){
        updateAccount(
            _id: $_id,  
            title: $title,
            guests: $guests
        ){
            _id, title, userId, guests
        }
    }
`;

const DELETE_ACCOUNT_MUTATION: TypedDocumentNode = gql`
    mutation DeleteAccountMutation(
        $_id: ID!,
    ){
        deleteAccount(
            _id: $_id
        ){
            _id, title, userId, guests
        }
    }
`;

const useAccountsByUser = (userId: string): UseQueryState<AccountModel[]> => {
    const [{ data: response = { getAccountsByUser: null }, fetching, error, stale }] = useQuery({ query: ACCOUNTS_BY_USER_QUERY, variables: { userId } });
    return { data: response.getAccountsByUser, fetching, error, stale };
}

const useAccountCreate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(CREATE_ACCOUNT_MUTATION);
    return { state, executeMutation };
}

const useAccountUpdate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(UPDATE_ACCOUNT_MUTATION);
    return { state, executeMutation };
}

const useAccountDelete = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(DELETE_ACCOUNT_MUTATION);
    return { state, executeMutation };
}

export {
    useAccountsByUser,
    useAccountCreate,
    useAccountUpdate,
    useAccountDelete
};
