import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import Input                        from '@library/Form/Input';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';

import { ProfileStyle, Container, Content } from './Profile.style';
import { usePeriod } from '@providers/period/usePeriod';
import { PeriodContextProvider } from '@providers/period/usePeriodContext';
import { useProfileContext } from '@providers/profile/useProfileContext';

const Profile: React.FC<RouteComponentProps> = () => {
    const period                        = usePeriod();
    const { form, definition, profile } = useProfileContext();

    if (!profile) {
        return null;
    }

    return (
        <ProfileStyle>
            <PeriodContextProvider { ...period }>
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
            </PeriodContextProvider>
        </ProfileStyle>
    )
};

export default Profile;
