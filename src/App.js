// App.js

import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import './App.css';

//----------------------Importing Components------------------------
import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/Navigation/Footer';

//----------------------Context------------------------
import { AuthContext } from './shared/context/auth-context';
import { UserContext } from './shared/context/user-context';

//----------------------Hooks-------------------------
import {UserAuth} from './shared/hooks/auth-hook';
import {UserInfo} from './shared/hooks/user-hook';


//----------------------Importing Pages------------------------------
import Welcome from './landing/pages/Welcome';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

//----------------------Code Splitting ----------------------(production efficiency)
const NewStudents = React.lazy(() => import('./student_resources/pages/NewStudents'));
const GraduatingStudents = React.lazy(() => import('./student_resources/pages/GraduatingStudents'));
const Login = React.lazy(() => import('./users/pages/AuthPage'));
const ContinuingStudents = React.lazy(() => import('./student_resources/pages/ContinuingStudents'));

const App = () => {

  const { token, login, logout, UID } = UserAuth();
  const { name, email, userId, imageUrl, setUser, removeUser } = UserInfo();

  let routes;
  if(token){ //if user is logged in Routes
    routes =  (
    <Routes>
      <Route path = "*" element = {<Welcome />} />
      <Route path="/" exact element={<Welcome />} />
      <Route path="/NewStudents" exact element={<NewStudents />} />
      <Route path="/ContinuingStudents" exact element={<ContinuingStudents />} />
      <Route path="/GraduatingStudents" exact element={<GraduatingStudents />} />
      <Route path="/Login" exact element={<Login />} /> 
    </Routes>
    );
  }
  else{//non authenticated user Routes
    routes = (
      <Routes>
        <Route path = "*" element = {<Welcome />} />
        <Route path="/" exact element={<Welcome />} />
        <Route path="/NewStudents" exact element={<NewStudents />} />
        <Route path="/ContinuingStudents" exact element={<ContinuingStudents />} />
        <Route path="/GraduatingStudents" exact element={<GraduatingStudents />} />
        <Route path="/Login" exact element={<Login />} /> 
      </Routes>
    )
  }

  return (
    <UserContext.Provider
      value={{
        name,
        email,
        userId,
        imageUrl,
        setUser,
        removeUser,
      }}
    >
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token,
          UID,
          login,
          logout,
        }}
      >
        <Router>
          <MainNavigation />
          <main className ="main-content" id="content">
            <Toaster />
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </Router>
      </AuthContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
