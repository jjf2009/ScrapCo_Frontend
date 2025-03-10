import React, { useState } from 'react';
import Card from './Card';
import { useFetchAllItemsQuery } from '../../redux/features/items/itemsApi';
import { FaRecycle, FaSearch } from 'react-icons/fa';

const Recommended = () => {
  const { data: scrapItems = [], isLoading } = useFetchAllItemsQuery();
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  // Define common scrap categories
  const categories = ['all', 'metal', 'paper', 'plastic', 'electronics', 'glass'];
  
  // Pagination settings
  const itemsPerPage = 8;
  
  // Filter scrap items by category
  const filteredItems = categoryFilter === 'all' 
    ? scrapItems 
    : scrapItems.filter(item => item.category?.toLowerCase() === categoryFilter);
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  
  // Get current page items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto bg-white">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h2 className="text-3xl font-semibold text-green-700 mb-2">
             Scrap Materials
          </h2>
          <p className="text-gray-900">Find the best deals on recyclable materials</p>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  setCategoryFilter(category);
                  setCurrentPage(1); // Reset to first page when changing filter
                }}
                className={`px-3 py-1.5 rounded-full text-sm font-medium capitalize ${
                  categoryFilter === category
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Materials' : category}
              </button>
            ))}
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : currentItems.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentItems.map((scrap, index) => (
              <div key={index} className="h-full">
                <Card scrap={scrap} key={index}  />
              </div>
            ))}
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-10 gap-2">
              <button 
                onClick={goToPrevPage} 
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-md ${
                  currentPage === 1 
                    ? 'bg-gray-200 text-gray-800 cursor-not-allowed' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Previous
              </button>
              
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => paginate(i + 1)}
                    className={`w-8 h-8 rounded-md ${
                      currentPage === i + 1 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={goToNextPage} 
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-md ${
                  currentPage === totalPages 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20 bg-gray-100 rounded-lg">
          <FaRecycle className="mx-auto text-gray-400 text-5xl mb-4" />
          <h3 className="text-xl font-medium text-gray-700 mb-2">No materials found</h3>
          <p className="text-gray-500 mb-6">No scrap materials matching your criteria were found.</p>
          {categoryFilter !== 'all' && (
            <button 
              onClick={() => setCategoryFilter('all')} 
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              <FaSearch className="mr-2" />
              View all materials
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Recommended;
