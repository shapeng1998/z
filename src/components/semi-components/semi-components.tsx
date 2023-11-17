import { Input } from '@douyinfe/semi-ui';
import { IconSearch } from '@douyinfe/semi-icons';

export const Test = () => {
  return <Input style={{ width: 200 }} prefix={<IconSearch />} showClear></Input>;
};
