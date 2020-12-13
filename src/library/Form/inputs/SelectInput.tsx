import { Link } from '@reach/router';
import { find } from 'lodash';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import { OptionTypeBase } from 'react-select';
import Select from 'react-select/creatable';
import { InputProps } from '../models/InputModel';
import { useFormContext } from '../provider/useFormContext';

const SelectInput: React.FC<InputProps> = (props) => {

    const { form } = useFormContext();
    const { name, label, options, isMulti } = props;
    
    // get array of values
    const innerOptions = options ? options.map((option) => option.value) : [];
    
    const customStyles = {
        control: (provided: Record<string, unknown>) => ({
            ...provided,
            margin: '.3rem 0',
            borderRadius: '.3rem',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderColor: '#DFEEF3',
            backgroundColor: '#FBFBFB',
            outline: 'none',
        })
    }

    const mapper = (value: unknown, key: 'value' | 'label'): string => {
        const option = find(options as OptionTypeBase[], { value });
        if (option) {
            return option[key]   
        }
    }

    return (
        <Controller
            name={ name }
            defaultValue={ name }
            control={ form.control }
            as={
                <Select
                    isMulti={ isMulti }
                    options={ innerOptions }
                    getOptionLabel={ (option) => mapper(option, 'label') }
                    getOptionValue={ (option) => mapper(option, 'value') }
                    noOptionsMessage={ () => <Link to='/categories'>Ajouter une catégorie</Link> as never }
                    styles={ customStyles }
                    placeholder={ label }
                />
            }
        />
    )
};

export default SelectInput;
