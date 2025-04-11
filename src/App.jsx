import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layouts/DefaultLayout";
import TaskList from "./Pages/TaskList";
import AddTask from "./Pages/AddTask";
import NotFound from "./Pages/NotFound";
import Homepage from "./Pages/Homepage";
import { GlobalProvider } from "./Context/GlobalContext";

const App = () => {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DefaultLayout />}>
            <Route path="/home" element={<Homepage />} />
            <Route path="/add-task" element={<AddTask />} />
            <Route path="/task-list" element={<TaskList />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
