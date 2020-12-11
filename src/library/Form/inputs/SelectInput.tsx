import * as React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';
import { InputProps } from '../models/InputModel';
import { useFormContext } from '../provider/useFormContext';

const SelectInput: React.FC<InputProps> = (props) => {

    const { form } = useFormContext();
    const { name, innerRef, label } = props;

    const value = form.watch(name);
    
    const options = [
        { value: 'Courses', label: 'Courses' },
        { value: 'Logement', label: 'Logement' },
        { value: 'Voiture', label: 'Voiture' }
    ]
    
    const filterCategories = (inputValue: string): Record<string, unknown>[] => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
      
    const promiseOptions = (inputValue: string): Promise<void> =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterCategories(inputValue) as never);
            }, 1000);
        });
    
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
      
    return (
        <AsyncCreatableSelect
            value={ value }
            isMulti
            cacheOptions
            defaultOptions
            reference={ innerRef }
            name={ name }
            id={ name }
            placeholder={ label }
            loadOptions={ promiseOptions }
            styles={ customStyles }
        />
    )
};

export default SelectInput;
