// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './Navbar';
import Home from "./Pages/Home";
import AddTask from "./Pages/AddTask";
import ViewTask from "./Pages/ViewTask";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/addtask' exact element={<AddTask />} />
          <Route path='/viewtask/:id' exact element={<ViewTask />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

