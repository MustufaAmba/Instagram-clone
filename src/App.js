
import './App.css';
import {Switch,Route} from 'react-router-dom';
import Home from './Home';
import Header from './Header';
import Chat from './Chat';
//import {Button} from '@material-ui/core';

/*
the flow of the code is given below visit the below given files to understand the program flow
1: App.js
2: header.js
3: home.js
4: posts.js
5: upload.js
6: chat.js
7: sidebar.js
8: sidechats.js
9: chatarea.js
*/
function App() {

  return (
//this is the starting point of the application here routing is done using react-router-dom there are total 2 pages home page and chat page
    <div className="App">
      <Header/>
        <Switch>
        <Route  exact path="/" component={Home}/>
        <Route  exact  path="/Chat" component={Chat}/>
        <Route  exact path="/Home" component={Home}/>
       </Switch>
      
    </div>

  );
}

export default App;
