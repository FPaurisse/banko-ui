import * as React from 'react';
import AsyncCreatableSelect from 'react-select/async-creatable';

const SelectInput: React.FC = () => {
    
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]
    
    const filterColors = (inputValue: string): Record<string, unknown>[] => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };
      
    const promiseOptions = (inputValue: string): Promise<void> =>
        new Promise((resolve) => {
            setTimeout(() => {
                resolve(filterColors(inputValue) as never);
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
            isMulti
            cacheOptions
            defaultOptions
            loadOptions={ promiseOptions }
            styles={ customStyles }
            placeholder='Catégories'
        />
    )
};

export default SelectInput;
