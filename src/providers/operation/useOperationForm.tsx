import { FormModel }                        from '@library/Form/models/FormModel';
import useForm, { UseFormContextValues }    from '@library/Form/provider/useForm';

import { OperationModel }                   from '@models/OperationModel';

import { useOperationCreate, useOperationUpdate }               from '@service/useOperations';

export type OperationReturn = {
    form: UseFormContextValues<OperationModel>;
    definition: FormModel<OperationModel>;
}

const useOperationForm = (): OperationReturn => {

    const form = useForm<OperationModel>({
        actions: {
            create: useOperationCreate,
            update: useOperationUpdate
        },
    });

    const definition: FormModel<OperationModel> = [
        {
            name: 'title',
            type: 'text',
            label: 'Titre',
            required: true
        },
        {
            name: 'amount',
            type: 'number',
            label: 'Montant',
            required: true,
            before: form.form.watch('isCredit') === true ? '+' : '-',
            after: '€'
        },
        {
            name: 'date', 
            type: 'date',
            label: 'Date',
            required: true
        },
        {
            name: 'isPassed', 
            type: 'checkbox',
            label: 'Approuver',
            inverse: 'À venir'
        },
        {
            name: 'isCredit', 
            type: 'checkbox',
            label: 'Crédit',
            inverse: 'Débit'
        },
    ];

    return { form, definition }
};

export default useOperationForm;
