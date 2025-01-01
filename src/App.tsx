import { Detail } from '@pages/detail/Detail';
import { Home } from '@pages/home/Home';
import { NotFound } from '@pages/not-found/NotFound';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};
