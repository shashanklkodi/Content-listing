import axios from 'axios';

export const fetchData = async (pageNo) => {
  try {
    const response = await axios.get(`https://test.create.diagnal.com/data/page${pageNo}.json`);
    return response.data.page['content-items'].content;
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
};
