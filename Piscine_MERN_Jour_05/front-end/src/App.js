import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import './App.css';

import Header from './components/parts/header';
import Footer from './components/parts/footer';
import HomePage from './views/HomePage';
import LoginPage from './views/auth/Login';
import LogoutPage from './views/auth/Logout';
import RegisterPage from './views/auth/Register';
import BlogsUser from './views/blog/BlogsUser';
import BlogUser from './views/blog/BlogUser';
import BlogCreate from './views/blog/BlogCreate';
import BlogUpdate from './views/blog/BlogUpdate';
import Search from './views/SearchPage';
import Category from './views/category/index';

function App () {
  return (
    <Router>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Switch>
              <Route exact path="/">
                <HomePage/>
              </Route>

              <Route path="/login">
                <LoginPage />
              </Route>

              <Route path="/logout">
                <LogoutPage />
              </Route>

              <Route path="/register">
                <RegisterPage />
              </Route>

              <Route path="/search">
                <Search />
              </Route>

              <Route path="/category">
                <Category />
              </Route>

              <Route path="/:login/create">
                <BlogCreate />
              </Route>

              <Route path="/:login/:id/update">
                <BlogUpdate />
              </Route>

              <Route path="/:login/:id">
                <BlogUser />
              </Route>

              <Route path="/:login">
                <BlogsUser />
              </Route>
            </Switch>
          </div>
        </div>

      </div>
      <Footer />
    </Router>
  );
}


export default App;
