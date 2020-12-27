import { TypedDocumentNode, useMutation, UseMutationState, useQuery, UseQueryState } from 'urql';
import { DocumentNode } from 'graphql';
import gql              from 'graphql-tag';

import { ProfileModel }   from '@models/ProfileModel';

const GET_ALL_SHARED_PROFILES: DocumentNode = gql`
    query ($userId: String!) {
        getAllSharedProfiles(userId: $userId){
            _id, 
            userId, 
            accountIdByDefault, 
            shareMyProfile,
            email,
            username,
            firstname,
            lastname
        }
    }
`;

const GET_PROFILE_BY_USER_ID: DocumentNode = gql`
    query ($userId: String!) {
        getProfileByUserId(userId: $userId){
            _id, 
            userId, 
            accountIdByDefault, 
            shareMyProfile,
            email,
            username,
            firstname,
            lastname
        }
    }
`;

const CREATE_PROFILE_MUTATION: TypedDocumentNode = gql`
    mutation CreateProfileMutation(
        $userId: String!,
        $accountIdByDefault: String,
        $shareMyProfile: Boolean,
        $email: String,
        $username: String,
        $firstname: String,
        $lastname: String
    ){
        createProfile(
            userId: $userId,
            accountIdByDefault: $accountIdByDefault,
            shareMyProfile: $shareMyProfile,
            email: $email,
            username: $username
            firstname: $firstname,
            lastname: $lastname
        ){
            _id, 
            userId, 
            accountIdByDefault, 
            shareMyProfile,
            email,
            username,
            firstname,
            lastname
        }
    }
`;

const UPDATE_PROFILE_MUTATION: TypedDocumentNode = gql`
    mutation updateProfileMutation(
        $userId: String!,
        $accountIdByDefault: String,
        $shareMyProfile: Boolean,
        $email: String,
        $username: String,
        $firstname: String,
        $lastname: String
    ){
        updateProfile(
            userId: $userId,
            accountIdByDefault: $accountIdByDefault,
            shareMyProfile: $shareMyProfile,
            email: $email,
            username: $username
            firstname: $firstname,
            lastname: $lastname
        ){
            _id, 
            userId, 
            accountIdByDefault, 
            shareMyProfile,
            email,
            username,
            firstname,
            lastname
        }
    }
`;

const DELETE_PROFILE_MUTATION: TypedDocumentNode = gql`
    mutation DeleteProfileMutation(
        $userId: String!,
    ){
        deleteProfile(
            userId: $userId
        ){
            _id, 
            userId, 
            accountIdByDefault, 
            shareMyProfile,
            email,
            username,
            firstname,
            lastname
        }
    }
`;

const useSharedProfiles = (userId: string): UseQueryState<ProfileModel[]> => {
    const [{ data = { getAllSharedProfiles: null }, fetching, error, stale }] = useQuery({ query: GET_ALL_SHARED_PROFILES, variables: { userId } });
    return { data: data.getAllSharedProfiles, fetching, error, stale };
}

const useProfileByUserId = (userId: string): UseQueryState<ProfileModel> => {
    const [{ data = { getProfileByUserId: null }, fetching, error, stale }] = useQuery({ query: GET_PROFILE_BY_USER_ID, variables: { userId } });
    return { data: data.getProfileByUserId, fetching, error, stale };
}

const useProfileCreate = (): { state: UseMutationState, executeMutation: (variables: ProfileModel) => void } => {
    const [state, executeMutation] = useMutation(CREATE_PROFILE_MUTATION);
    return { state, executeMutation };
}

const useProfileUpdate = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(UPDATE_PROFILE_MUTATION);
    return { state, executeMutation };
}

const useProfileDelete = (): { state: UseMutationState, executeMutation: () => void } => {
    const [state, executeMutation] = useMutation(DELETE_PROFILE_MUTATION);
    return { state, executeMutation };
}

export {
    useSharedProfiles,
    useProfileByUserId,
    useProfileCreate,
    useProfileUpdate,
    useProfileDelete
};
