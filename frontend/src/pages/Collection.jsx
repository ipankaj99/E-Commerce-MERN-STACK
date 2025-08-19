import React, { useEffect, useState, useContext } from 'react';

import ProductItem from '../components/ProductItem';
import { ShopContext } from '../context/ShopContext';
import Searchbar from '../components/Searchbar';

function Collection() {
  const { search, showSearch, products } = useContext(ShopContext);
  const [productsList, setProductList] = useState([]);
  const [category, setCategory] = useState([]);
  const [types, setTypes] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [sortType, setSortType] = useState('relevant');

  useEffect(() => {
    console.log("collection useEffcet");
    setProductList(products || []);
  }, [showFilter]);

  const filter = () => {
    let filtered = [...products];

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (types.length > 0) {
      filtered = filtered.filter((item) => types.includes(item.subCategory));
    }

    if (showSearch && search !== '') {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    setProductList(filtered);

    if (category.length === 0 && types.length === 0) {
      setShowFilter(false);
    }
  };

  useEffect(() => {
    filter();
  }, [types, category, showSearch, search, products]);

  const sortProducts = () => {
    let filteredProducts = [...productsList];

    switch (sortType) {
      case 'low-high':
        setProductList(filteredProducts.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        setProductList(filteredProducts.sort((a, b) => b.price - a.price));
        break;
      default:
        filter();
        break;
    }
  };

  useEffect(() => {
    sortProducts();
  }, [sortType]);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (!showFilter) setShowFilter(true);
      setCategory((prev) => [...prev, value]);
    } else {
      setCategory((prev) => prev.filter((item) => item !== value));
    }
  };

  const subCategory = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      if (!showFilter) setShowFilter(true);
      setTypes((prev) => [...prev, value]);
    } else {
      setTypes((prev) => prev.filter((item) => item !== value));
    }
  };

  return (
    <>
     

      <div
        className={`flex flex-col md:flex-row gap-8 px-4 sm:px-8 lg:px-16 py-10 bg-gray-50 min-h-screen transition-padding duration-300 ${
          showSearch ? 'pt-6 sm:pt-12 md:pt-0' : 'pt-6'
        }`}
      >
        {/* Left side - Filters */}
        <aside className="md:w-1/4 bg-white p-6 rounded-lg shadow-md mb-6 md:mb-0 md:sticky md:top-20 self-start max-h-[calc(100vh-4rem)] overflow-auto">
          <h3 className="text-lg font-semibold mb-6">FILTERS</h3>

          {/* Category */}
          <div className="mb-8 border border-gray-300 rounded-md p-4">
            <h4 className="text-sm md:text-md font-semibold mb-3">CATEGORIES</h4>
            <form className="space-y-3 max-h-48 overflow-auto">
              {['Men', 'Women', 'Kids'].map((cat) => (
                <label
                  key={cat}
                  className="flex items-center space-x-2 cursor-pointer flex-wrap break-words"
                >
                  <input
                    type="checkbox"
                    value={cat}
                    onChange={handleChange}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 flex-shrink-0"
                  />
                  <span className="text-sm md:text-base">{cat}</span>
                </label>
              ))}
            </form>
          </div>

          {/* Type */}
          <div className="border border-gray-300 rounded-md p-4">
            <h4 className="text-sm md:text-md font-semibold mb-3">TYPE</h4>
            <form className="space-y-3 max-h-48 overflow-auto">
              {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 cursor-pointer flex-wrap break-words"
                >
                  <input
                    type="checkbox"
                    value={type}
                    onChange={subCategory}
                    className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500 flex-shrink-0"
                  />
                  <span className="text-sm md:text-base">{type}</span>
                </label>
              ))}
            </form>
          </div>
        </aside>

        {/* Right side - Products */}
        <main className="md:w-3/4">
          <div className="mb-6 mt-2 sm:mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
              ALL
              <span className="text-red-600 font-normal ml-2">COLLECTIONS___</span>
            </h2>
            <select
              onChange={(e) => setSortType(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="relevant">Sort by: Relevant</option>
              <option value="low-high">Sort by: Low to High</option>
              <option value="high-low">Sort by: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            {productsList.length > 0 ? (
              productsList.map((item) => <ProductItem key={item._id} item={item} />)
            ) : (
              <p className="text-center col-span-full text-gray-500">No products found</p>
            )}
          </div>
        </main>
      </div>
    </>
  );
}

export default Collection;
