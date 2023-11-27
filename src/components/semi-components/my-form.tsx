import { forwardRef } from 'react';
import { Form, useFormState } from '@douyinfe/semi-ui';
import { type BaseFormProps } from '@douyinfe/semi-ui/lib/es/form';

const { Input } = Form;

export interface MyFormValues {
  username?: string;
  email?: string;
}

export const MyForm = forwardRef<Form<MyFormValues>, BaseFormProps<MyFormValues>>((props, ref) => {
  return (
    <Form<MyFormValues> ref={ref} {...props}>
      <Input field="username" label="用户名" showClear rules={[{ required: true, message: '用户名为必填项' }]} />
      <Input field="email" label="邮箱" showClear rules={[{ required: true, message: '邮箱为必填项' }]} />
      <FormValues />
    </Form>
  );
});

MyForm.displayName = 'MyForm';

const FormValues = () => {
  const formState = useFormState<MyFormValues>();
  return <code>{JSON.stringify(formState.values)}</code>;
};
