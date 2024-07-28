import React, { useState, useEffect } from 'react';
import ContentGrid from './components/ContentGrid';
import SearchBar from './components/SearchBar';
import { fetchData } from './utils/apiService'; 
import './styles/App.css';

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
  };

  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <ContentGrid data={filteredItems} setPage={setCurrentPage} />
    </div>
  );
};

export default App;
