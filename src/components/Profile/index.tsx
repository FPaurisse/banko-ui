import * as React                           from 'react';
import { RouteComponentProps }              from '@reach/router';

import Form                                 from '@library/Form/Form';
import Input                                from '@library/Form/Input';
import { FormContextProvider }              from '@library/Form/provider/useFormContext';

import { useProfileContext }                from '@providers/profile/useProfileContext';

import { ProfileStyle, Container, Content } from './Profile.style';

const Profile: React.FC<RouteComponentProps> = () => {
    const { form, definition, profile } = useProfileContext();

    if (!profile) {
        return null;
    }

    return (
        <ProfileStyle>
            <FormContextProvider { ...form }>
                <Container>
                    <Form>
                        <Input { ...definition.find((field) => field.name === 'accountIdByDefault') } />
                        <Input { ...definition.find((field) => field.name === 'shareMyProfile') } />
                        <Input { ...definition.find((field) => field.name === 'username') } />
                        <Input { ...definition.find((field) => field.name === 'email') } />
                        <Input { ...definition.find((field) => field.name === 'firstname') } />
                        <Input { ...definition.find((field) => field.name === 'lastname') } />
                    </Form>
                    <Content>

                    </Content>
                </Container>
            </FormContextProvider>
        </ProfileStyle>
    )
};

export default Profile;
