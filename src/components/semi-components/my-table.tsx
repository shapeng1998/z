import { Table } from '@douyinfe/semi-ui';
import { useAsync, useMountEffect } from '@react-hookz/web';

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
}

const fetchUsers = async () => {
  const url = 'http://localhost:3000/users';
  const res = await fetch(url);
  const data = (await res.json()) as User[];
  return data;
};

export const MyTable = () => {
  const [usersState, fetchUsersActions] = useAsync(fetchUsers);

  useMountEffect(fetchUsersActions.execute);

  return (
    <>
      <Table<User>
        loading={usersState.status === 'loading'}
        dataSource={usersState.result}
        columns={[
          {
            title: 'name',
            dataIndex: 'name',
          },
          {
            title: 'age',
            dataIndex: 'age',
          },
          {
            title: 'email',
            dataIndex: 'email',
          },
        ]}
      />
    </>
  );
};
