import React from "react";
import ReactDOM from "react-dom";
import sample from "./image/sample.jpg";

function App() {
  return (
    <div className="App">
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid cum debitis ex fuga maiores molestiae nemo quis quo totam veniam. Animi aspernatur commodi dicta expedita incidunt molestias qui sunt vero?
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad adipisci consequuntur cumque debitis ea earum eligendi, ex harum id ipsam iste molestias non numquam odit rem veritatis vitae voluptate. Quas?
      </div>
      <img src={sample} alt="sample" />
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);