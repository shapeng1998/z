import fs from 'node:fs';
import { faker } from '@faker-js/faker';

interface User {
  id: string;
  name: string;
  age: number;
  email: string;
}

const getFakeUser = (): User => ({
  id: faker.string.uuid(),
  name: faker.person.fullName(),
  age: faker.number.int({ min: 20, max: 50 }),
  email: faker.internet.email(),
});

const getFakeUserList = () => ({
  users: Array.from({ length: 20 }, getFakeUser),
});

fs.writeFileSync('./data.json', JSON.stringify(getFakeUserList(), null, 2));
