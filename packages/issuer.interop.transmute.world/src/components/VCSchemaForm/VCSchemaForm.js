import React from 'react';
import Button from '@material-ui/core/Button'
import { SchemaForm } from 'react-schema-form';

import Ajv from 'ajv';


import { getFormSafe, getCredentialBindingModel } from './formUtils.js'
function VCSchemaForm({ schema, form, bindingModel, onSubmit }) {

    const { formSafeFlatBinding, formSafeFlatSchema, flatForm } = getFormSafe({ schema, form, bindingModel })

    const [model, setModel] = React.useState(formSafeFlatBinding);
    const [state, setState] = React.useState({
        formSafeFlatBinding, formSafeFlatSchema, flatForm
    });

    React.useEffect(() => {
        const { formSafeFlatBinding, formSafeFlatSchema, flatForm } = getFormSafe({ schema, form, bindingModel })
        setModel(formSafeFlatBinding)
        setState({
            formSafeFlatBinding, formSafeFlatSchema, flatForm
        })
    }, [schema, form, bindingModel])

    const [schemaFormState, setSchemaFormState] = React.useState({
        showErrors: false
    })

    return (
        <React.Fragment>
            <SchemaForm
                showErrors={schemaFormState.showErrors}
                schema={state.formSafeFlatSchema}
                form={state.flatForm}
                model={model}
                onModelChange={([key], value) => {
                    setModel({
                        ...model,
                        [key]: value
                    })
                }} />
            <Button variant={'contained'} style={{ marginTop: '16px' }} onClick={() => {
                let ajv = new Ajv();
                ajv.addSchema(state.formSafeFlatSchema, state.formSafeFlatSchema.$id)
                let valid = ajv.validate(
                    state.formSafeFlatSchema,
                    model
                );
                if (!valid) {
                    setSchemaFormState({
                        ...schemaFormState,
                        showErrors: true
                    })
                    console.error(ajv.errors)
                } else {
                    setSchemaFormState({
                        ...schemaFormState,
                        showErrors: false
                    })
                    const credentialBindingModel = getCredentialBindingModel(model)
                    onSubmit(credentialBindingModel);
                }
            }}>Receive</Button>
        </React.Fragment>

    );
}

export default VCSchemaForm;
