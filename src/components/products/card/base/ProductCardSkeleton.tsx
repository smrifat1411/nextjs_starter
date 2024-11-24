'use client';
import { Skeleton } from 'antd';

export function ProductCardSkeleton() {
  return (
    <div className='!md:max-w-[100%] !md:gap-[10px] !flex !max-w-[100%] !flex-col'>
      <div className='!md:h-[240px] !md:w-[100%] !h-[150px] !w-[100%]'>
        <Skeleton.Image
          active
          className='!md:w-[100%] !h-[150px] !w-[100%] !rounded-[7px]'
        />
      </div>
      <div className='my-2 flex flex-row justify-between overflow-hidden'>
        <Skeleton
          active
          paragraph={{ rows: 1, style: { height: '10px', width: '100px' } }}
        />
        {/* <Skeleton active paragraph={{rows:0, style:{height:'10px', gap:0}}} /> */}
        <Skeleton.Avatar active />
      </div>
    </div>
  );
}
