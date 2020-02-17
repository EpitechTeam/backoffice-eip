import { Form } from 'antd';

export default (form, beforeSave) => ({
  beforeSave,
  form: Form.create({
    mapPropsToFields(props) {
      if (!props.data)
        return null;

      return [...Object.keys(props.data), ...Object.keys(props.errors)].reduce((acc, name) => ({
        ...acc,
        [name]: Form.createFormField({
          value: props.data[name],
          errors: props.errors[name] ? [new Error(props.errors[name].message)] : null
        })
      }), {});
    },

    onFieldsChange(props, values) {
      if (!props.onUpdate)
        return;
      const updates = Object.keys(values).reduce((acc, key) => {
        const { name, value } = values[key];
        return  { ...acc, [name]: value }
      }, {});
      props.onUpdate(updates);
    },
  })(form)
});
