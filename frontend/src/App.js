import "./App.css";
import Layout from "./components/Layout/Layout";
import { UserProvider } from './context/UserContext';

function App() {
  return (<UserProvider>
  <Layout />
    </UserProvider>)
}

export default App;