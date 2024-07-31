import React, { useState, useEffect } from 'react';
import ReactGA from 'react-ga';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import ContentGrid from './components/ContentGrid';
import SearchBar from './components/SearchBar';
import { fetchData } from './utils/apiService'; 
import './styles/App.css';

ReactGA.initialize('G-9LFYT4HFZV');

const App = () => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadItems = async () => {
      const fetchedItems = await fetchData(currentPage);
      setItems(prevItems => [...prevItems, ...fetchedItems]);
      setFilteredItems(prevItems => [...prevItems, ...fetchedItems]);
    };
    loadItems();
  }, [currentPage]);

  const handleSearch = (query) => {
    const results = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(results);

    ReactGA.event({
      category: 'User',
      action: 'Search',
      label: query
    });
  };

  return (
    <Router>
      <div className="App">
        <SearchBar onSearch={handleSearch} />
        <ContentGrid data={filteredItems} setPage={setCurrentPage} />
        <Tracker />
      </div>
    </Router>
  );
};

const Tracker = () => {
  const location = useLocation();

  useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location]);

  return null;
};

export default App;
