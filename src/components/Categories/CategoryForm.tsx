import * as React               from 'react';

import Form                     from '@library/Form/Form';
import Input                    from '@library/Form/Input';
import Modal                    from '@library/Modal/Modal';
import { FormContextProvider }  from '@library/Form/provider/useFormContext';

import { useCategorySave }     from '@providers/category/useCategorySave';

const CategoryForm: React.FC = () => {
    const { form, definition, save } = useCategorySave();
    
    return (
        <FormContextProvider { ...form }>
            <Modal>
                <Form>
                    <Input { ...definition.find((field) => field.name === 'title') } />
                    <button onClick={ save }>Valider</button>
                </Form>
            </Modal>
        </FormContextProvider> 
    )
};

export default CategoryForm;