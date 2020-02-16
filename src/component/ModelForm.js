import { Form } from 'antd';

export default (form, beforeSave) => ({
  beforeSave,
  form: Form.create({
    mapPropsToFields(props) {
      if (!props.data)
        return null;

      return Object.keys(props.data).reduce((acc, name) => ({
        ...acc,
        [name]: Form.createFormField({ value: props.data[name] })
      }), {});
    },

    onFieldsChange(props, values) {
      if (props.onUpdate) {
        const updates = Object.keys(values).reduce((acc, key) => {
          const { name, value } = values[key];
          return  { ...acc, [name]: value }
        }, {});
        props.onUpdate(updates);
      }
    },
  })(form)
});
