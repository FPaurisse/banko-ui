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
            operator: form.form.watch('isCredit') === true ? '+' : '-'
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
            label: 'Opération passée',
        },
        {
            name: 'isCredit', 
            type: 'checkbox',
            label: 'Crédit'
        },
    ];

    return { form, definition }
};

export default useOperationForm;
