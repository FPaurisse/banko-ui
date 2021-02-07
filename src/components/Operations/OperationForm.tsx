import * as React               from 'react';

import Form                     from '@library/Form/Form';
import Input                    from '@library/Form/Input';
import { FormContextProvider }  from '@library/Form/provider/useFormContext';

import { useOperationSave }     from '@providers/operation/useOperationSave';

const OperationForm: React.FC = () => {
    const { form, definition, save } = useOperationSave();
    
    return (
        <FormContextProvider { ...form }>
            <Form>
                <Input { ...definition.find((field) => field.name === 'title') } />
                <Input { ...definition.find((field) => field.name === 'categories') } />
                <Input { ...definition.find((field) => field.name === 'isCredit') } />
                <Input { ...definition.find((field) => field.name === 'amount') } />
                <Input { ...definition.find((field) => field.name === 'isPassed') } />
                <Input { ...definition.find((field) => field.name === 'date') } />
                <button onClick={ save }>Valider</button>
            </Form>
        </FormContextProvider>
    )
};

export default OperationForm;