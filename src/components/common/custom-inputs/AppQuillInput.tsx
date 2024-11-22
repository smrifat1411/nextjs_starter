'use client';
import React from 'react';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import { ReactQuillProps } from 'react-quill';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

type QuillInputProps = ReactQuillProps & {
  onChange?: (value: string) => void;
  value?: string;
};

const modules = {
  toolbar: [
    [{ size: [] }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
  ],
};

const formats = ['size', 'bold', 'italic', 'underline', 'list', 'bullet'];

const AppQuillInput: React.FC<QuillInputProps> = ({ onChange, value }) => {
  return (
    <ReactQuill
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      className='!mb-12 h-32'
    />
  );
};

export default AppQuillInput;
