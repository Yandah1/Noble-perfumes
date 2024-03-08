"use client"
// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { groq } from 'next-sanity';
import { client } from '../../../sanity/lib/client';
import { Flex, Pagination, Spin } from 'antd';
import PerfumeCard from '../PerfumeCard';
import { RootState } from '@/redux/store';

// Define the Perfume interface
export interface Perfume {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  size: string;
  category: string;
  discountPercentage: number;
  slug: string;
  alt: string;
}

// Set constant for items per page
const ITEMS_PER_PAGE = 3;

// Define fetchData function to fetch perfume data
const fetchData = async (search: string, category: string) => {
  try {
    const data = await client.fetch(
      groq`
        *[_type == "product"]
        | order(_createdAt desc) {
          _id,
          name,
          price,
          description,
          "image": image.asset->url,
          size,
          category,
          discountPercentage,
          "slug": slug.current,
          "alt": image.alt,
        }
      `
    );

    // Filter based on search if search is not empty
    const filteredData = search
      ? data.filter(
          (entry: Perfume) =>
            entry.name.toLowerCase().includes(search.toLowerCase())
        )
      : data;

    // Filter based on category if category is not 'all'
    const finalData = category !== 'all'
      ? filteredData.filter((entry: Perfume) => entry.category === category)
      : filteredData;

    return finalData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};


// Define fetchTotalCount function to fetch the total count of items
const fetchTotalCount = async () => {
  try {
    const totalCount = await client.fetch(groq`count(*[_type == "product"])`);
    return totalCount;
  } catch (error) {
    console.error('Error fetching total count:', error);
    throw error;
  }
};

// Define the EcommercePage component
const EcommercePage: React.FC = () => {
  // Get search and category parameters from Redux store
  const { search, category } = useSelector((state: RootState) => state.search);
  const [currentPage, setCurrentPage] = useState(1);
  const [perfumeData, setPerfumeData] = useState<Perfume[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Fetch and set data based on page
  const fetchAndSetData = async () => {
    try {
      const data = await fetchData(search, category);
      setPerfumeData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch total count of items
  const fetchTotalAndSet = async () => {
    try {
      const totalCount = await fetchTotalCount();
      setTotalItems(totalCount);
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  // Handle pagination change
  const handlePaginationChange = async (page: number) => {
    setCurrentPage(page);
  };

  // Fetch data and total count on component mount and when parameters change
  useEffect(() => {
    fetchAndSetData();
    fetchTotalAndSet();
  }, [search, category, loading]);

  // Calculate start and end indices for data slicing
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;
  const entries = perfumeData.slice(start, end);

  return (
    <>
      <div className='flex flex-wrap gap-4 justify-center'>
        {loading ? (
          <div><Flex gap={10}><Spin size='large' /> loading...</Flex></div>
        ) : totalItems > 0 ? (
          entries.map((perfume: Perfume) => (
            <PerfumeCard key={perfume._id} perfume={perfume} />
          ))
        ) : (
          <p>No data</p>
        )}
      </div>

      <div className='pt-5 max-w-max mx-auto'>
        <Pagination
          pageSize={ITEMS_PER_PAGE}
          current={currentPage}
          onChange={handlePaginationChange}
          total={perfumeData.length}
        />
      </div>
    </>
  );
};

export default EcommercePage;

