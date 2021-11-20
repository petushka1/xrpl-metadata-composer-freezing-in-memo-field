import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Route } from 'react-router-dom'

import NoMatch from '../shared/RouteNotMatch';
import { StateProvider } from './AppContext';
import reducer, { initialState } from '../../reducers/Reducer';
import Composer from "../composer/Composer";

function App() {
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <StateProvider reducer={reducer} initialState={initialState}>
                <Router>
                    <Switch>
                        <Route requireAuth path='/' component={Composer} />
                        <Route component={NoMatch}/>
                    </Switch>
                </Router>
            </StateProvider>
        </MuiPickersUtilsProvider>
    );
}

export default App;
