import { Input, Table } from '@douyinfe/semi-ui';
import { useAsync, useMountEffect } from '@react-hookz/web';
import { useEffect, useRef } from 'react';

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
  const tableRef = useRef<Table<User>>(null);

  useMountEffect(fetchUsersActions.execute);

  useEffect(() => {
    const innerTable = tableRef.current?.tableRef.current;
    if (!innerTable || !usersState.result) {
      return;
    }
    innerTable.foundation.setCachedFilteredSortedDataSource(usersState.result);
  }, [usersState.result]);

  return (
    <>
      <Input
        placeholder="Please enter your name"
        onChange={(value) => {
          if (!usersState.result) {
            return;
          }

          const filteredDataSource = usersState.result.filter((u) => u.name.includes(value));
          const innerTable = tableRef.current?.tableRef.current;
          innerTable?.foundation.setCachedFilteredSortedDataSource(filteredDataSource);
        }}
      />
      <Table<User>
        ref={tableRef}
        pagination={false}
        loading={usersState.status === 'loading'}
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
