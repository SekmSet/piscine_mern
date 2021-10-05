import React, {useEffect, useState} from 'react';
import {fetchHome} from '../../service/getHome';


const Footer = () => {

  const [api, setApi] = useState({});
  useEffect(() =>{
    fetchHome(setApi);
  }, []);


  return (
    <footer className="text-muted">
      <div className="container">
        <p> © My App  with React, NodeJS and Mongo By Priscilla !
                    api version: {api.api}, api description: {api.description}
        </p>
      </div>
    </footer>
  );
};

export default Footer;