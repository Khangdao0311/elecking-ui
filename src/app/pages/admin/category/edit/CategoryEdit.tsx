"use client";
import React from 'react';
import { Input } from 'antd';
import TitleAdmin from "@/app/components/admin/TitleAdmin";
import { Select } from 'antd';
import { IoCloseSharp } from 'react-icons/io5';

function CategoryEdit() {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  return (
    <>
      <TitleAdmin title="Quản lý danh mục / Sửa danh mục" />
      <div className="bg-white shadow-xl rounded-lg px-4 py-4 flex items-start flex-col gap-4">
        <div className="w-full flex flex-col gap-6">
          <div className="w-full">
            <div className="w-full p-2.5 text-2xl font-semibold border-b-2 border-primary">Sửa Danh Mục</div>
          </div>
          <div className='flex items-center gap-4'>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Mã Danh Mục</div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="aht1h3rt1h32rt1321313213213" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Mã Danh Mục <span className='text-primary'>*</span></div>
              <Input className='w-[268px] h-11 shadow-md' placeholder="aht1h3rt1h32rt1321313213213" />
            </div>
            <div className='flex gap-0.5 flex-col'>
              <div className='text-sm font-medium'>Trạng Thái <span className='text-primary'>*</span></div>
              <Select className='shadow-md'
                defaultValue="lucy"
                style={{ width: 268, height: 44 }}
                onChange={handleChange}
                options={[
                  { value: 'jack', label: 'Jack' },
                  { value: 'lucy', label: 'Lucy' },
                  { value: 'Yiminghe', label: 'yiminghe' },
                  { value: 'disabled', label: 'Disabled', disabled: true },
                ]}
              />
            </div>
          </div>
          <div>
            <div className='text-sm font-medium'>Ảnh <span className='text-primary'>*</span></div>
            <div className='flex gap-2.5 flex-col'>
              <div className='flex items-center gap-2.5 bg-white border border-gray-100 shadow-md p-1.5'>
                <div className='w-[106px] h-auto text-sm font-normal pt-1.5 pb-1.5 pr-5 pl-5 bg-gray-300 border border-gray-100 rounded'>Chọn tệp</div>
                <div className='w-full text-sm font-normal'><span>1</span>Tệp</div>
              </div>
              <div className='flex items-center flex-wrap gap-3'>
                <div className='w-20 h-20 relative'>
                  <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png" alt="" />
                  <div className='w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1'><IoCloseSharp /></div>
                </div>
                <div className='w-20 h-20 relative'>
                  <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png" alt="" />
                  <div className='w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1'><IoCloseSharp /></div>
                </div>
                <div className='w-20 h-20 relative'>
                  <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png" alt="" />
                  <div className='w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1'><IoCloseSharp /></div>
                </div>
                <div className='w-20 h-20 relative'>
                  <img src="https://cdn2.cellphones.com.vn/insecure/rs:fill:358:358/q:90/plain/https://cellphones.com.vn/media/catalog/product/d/i/dien-thoai-samsung-galaxy-s25-ultra_3__3.png" alt="" />
                  <div className='w-3 h-3 bg-white absolute top-0 right-0 flex items-center justify-center mt-1 mr-1'><IoCloseSharp /></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryEdit;
