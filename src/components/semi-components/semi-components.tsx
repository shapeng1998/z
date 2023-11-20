import { Form, Tooltip } from '@douyinfe/semi-ui';
import { IconHelpCircle } from '@douyinfe/semi-icons';
import { useState } from 'react';
import { cloneDeep } from 'lodash-es';

interface FormValues {
  username: string;
  password: string;
  role: 'admin' | 'user' | 'guest';
}

export const Test = () => {
  const [formValues, setFormValues] = useState<FormValues>();

  const { Option } = Form.Select;

  return (
    <>
      <Form<FormValues> layout="horizontal" onValueChange={(values) => setFormValues(cloneDeep(values))}>
        <Form.Input showClear field="username" label="用户名" style={{ width: 80 }} />
        <Form.Input
          showClear
          field="password"
          label={{
            text: '密码',
            extra: (
              <Tooltip content="详情">
                <IconHelpCircle style={{ color: 'var(--semi-color-text-2)' }} />
              </Tooltip>
            ),
          }}
          style={{ width: 176 }}
        />
        <Form.Select showClear field="role" label={{ text: '角色', optional: true }} style={{ width: 176 }}>
          <Option value="admin">管理员</Option>
          <Option value="user">普通用户</Option>
          <Option value="guest">访客</Option>
        </Form.Select>
      </Form>
      {JSON.stringify(formValues)}
    </>
  );
};
