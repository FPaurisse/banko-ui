import * as React                       from 'react';

import { useFormContext }               from '@library/Form/provider/useFormContext';
import { useKeyboardEvent }             from '@library/utils';

import { FormStyle }                    from './Form.style';

const Form: React.FC = ({ children }) => {
    const { headings, entity, setEntity } = useFormContext();

    useKeyboardEvent('Escape', () => {
        setEntity(null);
    });

    return (
        <FormStyle onSubmit={ (e) => e.preventDefault() }>
            {
                headings && (
                    <h3>{ entity ? headings.edition : headings.creation }</h3>
                )
            }
            { children }
        </FormStyle>
    )
}

export default Form;
