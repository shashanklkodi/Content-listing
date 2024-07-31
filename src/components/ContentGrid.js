import React, { useEffect, useCallback } from 'react';
import ReactGA from 'react-ga';

const ContentGrid = ({ data, setPage }) => {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;

    ReactGA.event({
      category: 'User',
      action: 'Load More Content',
      label: `Page ${data.length / 20}`
    });

    setPage(prevPage => prevPage + 1);
  }, [setPage, data.length]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleItemClick = (itemName) => {
    ReactGA.event({
      category: 'User',
      action: 'Click Content Item',
      label: itemName
    });
  };
  
  return (
    <div className="content-grid">
      {data.map((item, index) => (
        <div key={index} className="content-item" onClick={() => handleItemClick(item.name)}>
          <img 
            src={`https://test.create.diagnal.com/images/${item['poster-image']}`} 
            alt={item.name} 
          />
          <p>{item.name}</p>
        </div>
      ))}
    </div>
  );
};  

export default ContentGrid;
