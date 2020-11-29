import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ApolloProvider from './ApolloProvider';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import NavBar from './components/NavBar'
import UserProvider from './contexts/UserProvider';
import AuthRoute from './AuthRoute';

function App() {
    return (
        <ApolloProvider>
            <UserProvider>
                <BrowserRouter>
                    <NavBar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <AuthRoute exact path="/signup" component={Signup} />
                        <AuthRoute exact path="/login" component={Login} />
                    </Switch>
                </BrowserRouter>
            </UserProvider>
        </ApolloProvider>
    );
}

export default App;
