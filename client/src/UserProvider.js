import { createContext, useState } from 'react';

const UserContext = createContext();

const roles = [
  {
    id: 0,
    name: 'Nepřihlášený',
  },
  {
    id: 1,
    name: 'Návštěvník',
  },
  {
    id: 2,
    name: 'Tvůrce',
  },
  {
    id: 3,
    name: 'Administrátor',
  },
];

const users = [
  {
    id: 0,
    role: roles[3],
    fullName: 'Marie Prouzová',
  },
  {
    id: 0,
    role: roles[3],
    fullName: 'Ilya Gusakov',
  },
  {
    id: 1,
    role: roles[2],
    fullName: 'Peter Pavlovič',
    videos: [
      '7c3dc385-9ba3-449b-b10b-808bbcf53638',
      '1fb0182b-b876-4ffc-8d14-59d2244cb895',
    ],
  },
  {
    id: 2,
    role: roles[2],
    fullName: 'Petr Koller',
    videos: [
      'abc811be-f251-45f4-8986-17522185c74e',
      '3e402de9-8285-44be-8392-292864e03461',
    ],
  },
  {
    id: 3,
    role: roles[1],
    fullName: 'Michaela Rašovská',
  },
  {
    id: 4,
    role: roles[1],
    fullName: 'Petr Straka',
  },
];

export function UserProvider({ children }) {
  const alreadyLogged = JSON.parse(sessionStorage.getItem('authUser'));
  const [user, setUser] = useState(
    alreadyLogged ?? {
      role: roles[0],
    },
  );

  const isLoggedIn = () => {
    return user.role.id > 0;
  };

  const isVisitor = () => {
    return user.role.id === 1;
  };

  const isCreator = () => {
    return user.role.id === 2;
  };

  const isAdministrator = () => {
    return user.role.id === 3;
  };

  const canEdit = () => {
    if (user.role.id > 1) return true;

    return false;
  };

  const changeUser = (id) => {
    const user = users.find((user) => user.id === id);
    const result = user ?? {
      role: roles[0],
    };

    setUser(result);
    sessionStorage.setItem('authUser', JSON.stringify(result));
  };
  const value = {
    user,
    users,
    changeUser,
    isLoggedIn,
    isCreator,
    isAdministrator,
    isVisitor,
    canEdit,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default UserContext;
