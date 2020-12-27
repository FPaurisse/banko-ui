import { TypedDocumentNode, useMutation, UseMutationState, useQuery, UseQueryState } from 'urql';
import { DocumentNode } from 'graphql';
import gql              from 'graphql-tag';

import { SettingModel }   from '@models/SettingModel';

const SETTING_BY_USER: DocumentNode = gql`
    query ($userId: String!) {
        getSettingByUser(userId: $userId){
            _id, userId, accountIdByDefault
        }
    }
`;

const CREATE_SETTING_MUTATION: TypedDocumentNode = gql`
    mutation CreateSettingMutation(
        $userId: String!,
        $accountIdByDefault: String
    ){
        createSetting(
            userId: $userId,
            accountIdByDefault: $accountIdByDefault
        ){
            _id, userId, accountIdByDefault
        }
    }
`;

const UPDATE_SETTING_MUTATION: TypedDocumentNode = gql`
    mutation updateSettingMutation(
        $userId: String!,
        $accountIdByDefault: String
    ){
        updateSetting(
            userId: $userId,
            accountIdByDefault: $accountIdByDefault
        ){
            _id, userId, accountIdByDefault
        }
    }
`;

const DELETE_SETTING_MUTATION: TypedDocumentNode = gql`
    mutation DeleteSettingMutation(
        $userId: String!,
    ){
        deleteSetting(
            userId: $userId
        ){
            _id, userId, accountIdByDefault
        }
    }
`;

const useSettingByUser = (userId: string): UseQueryState<SettingModel> => {
    const [{ data = { getSettingByUser: null }, fetching, error, stale }] = useQuery({ query: SETTING_BY_USER, variables: { userId } });
    return { data: data.getSettingByUser, fetching, error, stale };
}

const useSettingCreate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(CREATE_SETTING_MUTATION);
    return { state, executeMutation };
}

const useSettingUpdate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(UPDATE_SETTING_MUTATION);
    return { state, executeMutation };
}

const useSettingDelete = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(DELETE_SETTING_MUTATION);
    return { state, executeMutation };
}

export {
    useSettingByUser,
    useSettingCreate,
    useSettingUpdate,
    useSettingDelete
};
