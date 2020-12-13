import * as React from 'react';
import { RouteComponentProps } from '@reach/router';
import { FormContextProvider } from '@library/Form/provider/useFormContext';
import Form from '@library/Form/Form';
import Input from '@library/Form/Input';
import { useUserContext } from '@providers/user/useUserContext';
import useAccountList from '@providers/account/useAccountList';
import { usePeriod } from '@providers/period/usePeriod';
import { PeriodContextProvider } from '@providers/period/usePeriodContext';

const OnBoarding: React.FC<RouteComponentProps> = () => {
    const period   = usePeriod();
    const { user } = useUserContext();
    const { form, definition } = useAccountList(user._id);

    return (
        <React.Fragment>
            <PeriodContextProvider { ...period }>
                <FormContextProvider { ...form }>
                    <Form>
                        <Input { ...definition.find((field) => field.name === 'title') } />
                        <Input { ...definition.find((field) => field.name === 'isDefault') } />
                        <Input { ...definition.find((field) => field.name === 'guests') } />
                    </Form>
                </FormContextProvider>
            </PeriodContextProvider>
        </React.Fragment>
    )
};

export default OnBoarding;