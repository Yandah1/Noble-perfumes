"use client"
import React, { useState } from 'react';
import { Input, Select } from 'antd';
import { ManOutlined, WomanOutlined } from '@ant-design/icons';

const { Option } = Select;

interface SearchInputProps {
  onSearch: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, onCategoryChange }) => {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch(value);
  };

  const handleCategoryChange = (value: string) => {
    setCategory(value);
    onCategoryChange(value);
  };

  const selectBefore = (
    <Select value={category} onChange={handleCategoryChange}>
      <Option value="all">ALL</Option>
      <Option value="men"><ManOutlined /></Option>
      <Option value="women"><WomanOutlined /></Option>
    </Select>
  );

  return (
    <div>
      <Input.Search
        addonBefore={selectBefore}
        placeholder="Search"
        allowClear
        className="text-white-500"
        style={{ marginRight: 10, width: 304, backgroundColor: "#ffffff" }}
        onSearch={handleSearch}
      />
    </div>
  );
};

export default SearchInput;
