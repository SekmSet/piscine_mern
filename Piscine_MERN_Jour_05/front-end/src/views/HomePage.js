import React, {useEffect, useState} from 'react';
import {fetchUsers} from '../service/users/index';
import {Link} from 'react-router-dom';

const HomePage = () => {
  const [users, setUsers] = useState([]);
  useEffect(() =>{
    fetchUsers(setUsers);
  }, []);

  return (
    <div>
      <h1>Liste des blogs</h1>
      { users.map((user) => (
        <div key={user._id}>
          <h3>
                        Blog de {user.login}
          </h3>
          <Link className="nav-link" to={`/${user.login}`}>Plus</Link>
        </div>
      ))}
    </div>
  );
};
export default HomePage;
