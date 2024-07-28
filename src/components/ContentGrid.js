import React, { useEffect, useCallback } from 'react';

const ContentGrid = ({ data, setPage }) => {
  const handleScroll = useCallback(() => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(prevPage => prevPage + 1);
  }, [setPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="content-grid">
      {data.map((item, index) => (
        <div key={index} className="content-item">
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
