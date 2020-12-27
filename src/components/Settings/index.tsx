import * as React                   from 'react';
import { RouteComponentProps }      from '@reach/router';

import Form                         from '@library/Form/Form';
import Input                        from '@library/Form/Input';
import { FormContextProvider }      from '@library/Form/provider/useFormContext';

import { SettingsStyle, Container, Content } from './Settings.style';
import { usePeriod } from '@providers/period/usePeriod';
import { PeriodContextProvider } from '@providers/period/usePeriodContext';
import { useSettingContext } from '@providers/setting/useSettingContext';

const Settings: React.FC<RouteComponentProps> = () => {
    const period               = usePeriod();
    const { form, definition } = useSettingContext();

    return (
        <SettingsStyle>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <Container>
                        <Form>
                            <Input { ...definition.find((field) => field.name === 'accountIdByDefault') } />
                        </Form>
                        <Content>

                        </Content>
                    </Container>
                </FormContextProvider>
            </PeriodContextProvider>
        </SettingsStyle>
    )
};

export default Settings;
