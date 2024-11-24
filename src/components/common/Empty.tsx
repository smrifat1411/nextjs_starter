import Image from 'next/image';

interface Props {
  message: string;
}

export const EmptyMark: React.FC<Props> = ({ message }) => {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4 text-gray-400'>
      <div>
        <Image
          className='opacity-50'
          src={'/icons/empty-box.png'}
          alt={'empty'}
          width={100}
          height={100}
        />
      </div>
      <div>{message || 'No Item'}</div>
    </div>
  );
};
