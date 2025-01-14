import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import MicroFrontend from "./MicroFrontend";


import "./App.css";

const {
  REACT_APP_DOGS_HOST: dogsHost,
  REACT_APP_CATS_HOST: catsHost,
  REACT_APP_CONTENTS_HOST: contentsHost,
} = process.env;

function Header() {
  return (
    <div className="banner">
      <h1 className="banner-title">Hi there!, this is container app built using MicroFrontend</h1>      
    </div>
  );
}

function Dogs({ history }) {
  return <MicroFrontend history={history} host={dogsHost} name="Dogs" />;
}


/*Call the dogs MicroFrontend through MicroFrontend  JS*/
function Contents({ history }) {
  return <MicroFrontend history={history} host={contentsHost} name="Contents" />;
}


function Cats({ history }) {
  return <MicroFrontend history={history} host={catsHost} name="Cats" />;
}

function GreetingCat({ history }) {
  return (
    <div>
      <Header />
      <div className="home">
        <MicroFrontend history={history} host={catsHost} name="Cats" />
      </div>
    </div>
  );
}

function Home({ history }) {
  const [input, setInput] = useState("");

  const handleOnClick = () => {
    history.push(`/cat/${input}`);
  };

  return (
    <div>
      <Header />
      <div className="home">
        <div><Contents /></div>
          <div className="cat"><Cats />
          <div className="dogs"><Dogs /></div>
            <div>
              <input
                placeholder="Input a message to Cat"
                defaultValue={input}
                onBlur={(e) => setInput(e.target.value)}
              />
              <button onClick={handleOnClick}>Greet Me</button>
              </div>
              </div>
              
            </div>
      </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/cat/:greeting" component={GreetingCat} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;