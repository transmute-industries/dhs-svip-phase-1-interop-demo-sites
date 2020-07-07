var { flatten, unflatten } = require('flat')

export const getFormSafe = ({ schema, form, bindingModel }) => {
    const flatBinding = flatten({
        ...bindingModel
    });
    const flatForm = form.map((p) => {
        return p.replace(/\./g, "___")
    })
    let formSafeFlatSchemaProperties = {}
    Object.keys(schema.properties).forEach((p) => {
        const formSafeFlatSchemaPropertyKey = p.replace(/\./g, "___");
        formSafeFlatSchemaProperties[formSafeFlatSchemaPropertyKey] = schema.properties[p];
    })
    const formSafeFlatSchema = {
        ...schema,
        properties: formSafeFlatSchemaProperties,
        required: schema.required.map((p) => {
            return p.replace(/\./g, "___")
        })
    }
    const formSafeFlatBinding = {};
    Object.keys(flatBinding).forEach((p) => {
        formSafeFlatBinding[p.replace(/\./g, "___")] = flatBinding[p]
    })
    return { formSafeFlatBinding, formSafeFlatSchema, flatForm }
}

export const getCredentialBindingModel = (model) => {
    // unflatten model here....
    const formUnSafeFlatBinding = {};
    Object.keys(model).forEach((k) => {
        formUnSafeFlatBinding[k.replace(/___/g, ".")] = model[k]
    })
    const unflattenedFormData = unflatten(formUnSafeFlatBinding)
    return unflattenedFormData
}