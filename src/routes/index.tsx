import { Switch, Route } from 'react-router-dom';

import Details from '../pages/details';
import Main from '../pages/main';

function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Main} />
      <Route path="/detail/:id/:type" exact component={Details} />
    </Switch>
  );
}

export default Routes;
