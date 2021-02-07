import * as React               from 'react';

import Form                     from '@library/Form/Form';
import Input                    from '@library/Form/Input';
import Modal                    from '@library/Modal/Modal';
import { FormContextProvider }  from '@library/Form/provider/useFormContext';

import { useAccountSave }     from '@providers/account/useAccountSave';

const AccountForm: React.FC = () => {
    const { form, definition, save } = useAccountSave();
    
    return (
        <FormContextProvider { ...form }>
            <Modal>
                <Form>
                    <Input { ...definition.find((field) => field.name === 'title') } />
                    <Input { ...definition.find((field) => field.name === 'guests') } />
                    <button onClick={ save }>Valider</button>
                </Form>
            </Modal>
        </FormContextProvider> 
    )
};

export default AccountForm;