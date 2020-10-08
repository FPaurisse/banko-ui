import { FormModel }                        from '@library/Form/models/FormModel';
import useForm, { UseFormContextValues }    from '@library/Form/provider/useForm';

import { OperationModel }                   from '@models/OperationModel';

import { useOperationCreate }               from '@service/useOperations';

export type OperationReturn = {
    form: UseFormContextValues<OperationModel>;
    definition: FormModel<OperationModel>;
}

const useOperationForm = (): OperationReturn => {

    const form = useForm({
        initial: OperationModel.Empty(),
        actions: {
            create: useOperationCreate,
        },
    });

    const definition = [
        {
            name: 'title',   
            label: 'Titre',
        },
        {
            name: 'amount', 
            label: 'Montant',
        },
        {
            name: 'date', 
            label: 'Date',
        },
    ];

    return { form, definition }
};

export default useOperationForm;
