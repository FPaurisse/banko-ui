import { TypedDocumentNode, useMutation, UseMutationState, useQuery, UseQueryState } from 'urql';
import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

import { CategoryModel }   from '@models/CategoryModel';

const CATEGORIES_BY_USER_QUERY: DocumentNode = gql`
    query ($accountId: String!) {
        getCategoriesByAccount(accountId: $accountId){
            _id, title, accountId, userId
        }
    }
`;

const CREATE_CATEGORY_MUTATION: TypedDocumentNode = gql`
    mutation CreateCategoryMutation(
        $title: String!,
        $accountId: String!,
        $userId: String!
    ){
        createCategory(
            title: $title,  
            accountId: $accountId,
            userId: $userId
        ){
            _id, title, accountId, userId
        }
    }
`;

const UPDATE_CATEGORY_MUTATION: TypedDocumentNode = gql`
    mutation updateCategoryMutation(
        $_id: ID!,
        $title: String!
    ){
        updateCategory(
            _id: $_id,  
            title: $title
        ){
            _id, title, accountId, userId
        }
    }
`;

const DELETE_CATEGORY_MUTATION: TypedDocumentNode = gql`
    mutation DeleteCategoryMutation(
        $_id: ID!,
    ){
        deleteCategory(
            _id: $_id
        ){
            _id, title, accountId, userId
        }
    }
`;

const useCategoriesByAccount = (accountId: string): UseQueryState<CategoryModel[]> => {
    const [{ data = { getCategoriesByAccount: [] }, fetching, error, stale }] = useQuery({ query: CATEGORIES_BY_USER_QUERY, variables: { accountId } });
    return { data: data.getCategoriesByAccount, fetching, error, stale };
}

const useCategoryCreate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(CREATE_CATEGORY_MUTATION);
    return { state, executeMutation };
}

const useCategoryUpdate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(UPDATE_CATEGORY_MUTATION);
    return { state, executeMutation };
}

const useCategoryDelete = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(DELETE_CATEGORY_MUTATION);
    return { state, executeMutation };
}

export {
    useCategoriesByAccount,
    useCategoryCreate,
    useCategoryUpdate,
    useCategoryDelete
};
