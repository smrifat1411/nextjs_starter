import React from 'react';
import Image from 'next/image';
import { Button, Upload } from 'antd';
import { UploadProps } from 'antd/lib/upload/interface';
import { FileImageOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

type ImageUploaderProps = UploadProps & {
  setImageUrl: (imageUrl?: string) => void;
  labelText?: string;
  supportedFile?: string;
  value?: string;
};

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  onChange,
  multiple = false,
  accept,
  setImageUrl,
  labelText,
  supportedFile,
  value,
  ...props
}) => {
  const handleChange = (info: any) => {
    const { status } = info.file;
    if (status === 'done') {
      setImageUrl(info.file.response);
    }
  };

  return (
    <Dragger
      style={{ background: '#EDF1F7' }}
      multiple={multiple}
      accept={accept}
      action={`${process.env.NEXT_PUBLIC_API_URI}/api/image/upload`}
      onChange={handleChange}
      onRemove={() => setImageUrl(undefined)}
      {...props}
    >
      <Button type='link' size='large'>
        <FileImageOutlined size={55} />
      </Button>
      <p className='ant-upload-text'>{`${labelText ?? 'Click here to Upload Image'}`}</p>
      <p className='ant-upload-hint'>{`${supportedFile ?? 'Supported file jpg, png'}`}</p>
      {value && (
        <>
          <Image
            alt='not found'
            className='w-full'
            height={200}
            width={200}
            src={value}
          />
        </>
      )}
    </Dragger>
  );
};
