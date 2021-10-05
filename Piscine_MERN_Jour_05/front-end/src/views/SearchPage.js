import React, {useState} from 'react';
import {fetchSearch} from '../service/search/index';
import {useForm} from 'react-hook-form';
import {Link} from 'react-router-dom';

const SearchPage = () => {

  const [searchs, setSearch] = useState([]);

  const { handleSubmit, register } = useForm();

  const onSubmit = async values => {
    const result = await fetchSearch(values.searchByTitle, values.searchByResum);
    setSearch(result);
  };

  return (
    <div>
      <h1>Page de recherche</h1>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            name="searchByTitle"
            ref={register({})}
          />

          <input
            name="searchByResum"
            ref={register({})}
          />

          <button type="submit">Recherche</button>
        </form>

      </div>
      {searchs.map(search => (
        <div key={search._id}>
          {search.title}
          {search.categories && search.categories.map((category)=>(
            <span  key={category._id}  className="badge badge-pill badge-info">{category.name}</span>
          ))}
          <Link className="nav-link" to={`/${search.user.login}/${search._id}`}>Plus</Link>
        </div>
      ))}
    </div>
  );
};

export default SearchPage;
