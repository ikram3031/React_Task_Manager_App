import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import AddEmployee from './Pages/AddEmployee/AddEmployee';
import AddTask from './Pages/AddTask/AddTask';
import Employee from './Pages/Employee/Employee';
import EmployeeList from './Pages/EmployeeList/EmployeeList';
import TaskList from './Pages/TaskList/TaskList';
import CreateLeave from "./Pages/CreateLeave/CreateLeave";

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee" element={<AddEmployee />} />
        <Route path="/task" element={<AddTask />} />
        <Route path="/employees/:id" element={<Employee />} />
        <Route path="/employees/leave" element={<CreateLeave />} />
        <Route path="/employees" element={<EmployeeList />} />
        <Route path="/tasks" element={<TaskList />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
