import './App.css';
import { BrowserRouter , Route ,Routes } from 'react-router-dom';
import Header from './components/Header';
import PageHeader from './components/PageHeader';
import CIMSTable from './components/ReadTable';
import UpdateForm from './components/ClientUpdationForm';
import CollapsibleSidebar from './components/Collapsible-Sidebar'
import CreateForm from './components/ClientCreation-Form';


function App() {

  return (    
    <div>
        <>
          <Header/>
          <CollapsibleSidebar/>    
        </>
        
        <BrowserRouter>
          <Routes>
          <Route exact path='/' element={
                                          <>
                                            <PageHeader />
                                            <CIMSTable/>
                                          </>} >
          </Route>

          <Route exact path='/createclient' element={<>
                                            <PageHeader />
                                            <CreateForm/>
                                          </>} >
          </Route>

          <Route exact path='/clientdetails/:id' element={<>
                                            <PageHeader />
                                            <UpdateForm/>
                                          </>} >
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

