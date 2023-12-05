import Homepage from './pages/Homepage';
import Buttonpage from './pages/Buttonpage';
import Rentpage from './pages/Rentpage';
import Productscanpage from './pages/Productscanpage';
import ConfirmationRentpage from './pages/ConfirmationRentpage';
import Returnpage from './pages/Returnpage';
import ConfirmationReturnpage from './pages/ConfirmationReturnpage';
import AdminSupplypage from './pages/AdminSupplypage';
import AddArticlepage from './pages/AddArticlepage';
import ConnectTagpage from './pages/ConnectTagpage';
import ConfirmationAddpage from './pages/ConfirmationAddpage';
import { HashRouter, Routes, Route } from 'react-router-dom';

//The routes that are available in the browser
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/button" element={<Buttonpage />} />
        <Route path="/rent" element={<Rentpage />} />
        <Route path='/scanproduct' element={<Productscanpage />} />
        <Route path='/confirmationrent' element={<ConfirmationRentpage />} />
        <Route path='/return' element={<Returnpage />} />
        <Route path='/confirmationreturn' element={<ConfirmationReturnpage />} />
        <Route path='/admin' element={<AdminSupplypage />} />
        <Route path='/add' element={<AddArticlepage />} />
        <Route path='/connectTag' element={<ConnectTagpage />} />
        <Route path='/confirmationadd' element={<ConfirmationAddpage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
