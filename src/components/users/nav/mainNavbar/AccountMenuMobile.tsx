'use client';
import { RightOutlined } from '@ant-design/icons';
import { usePathname, useRouter } from 'next/navigation';

export function AccountMenu(params:any) {
 

  const paths = {
    DASHBOARD: '/account/dashboard',
    CHANGEPASSWORD: '/account/changepassword',
    MANAGE: '/account/manage',
    PARTIES: '/account/parties',
    PAYMENTS: '/account/payments',
    PURCHASES: '/account/purchases',
    RESERVATIONS: '/account/reservations',
    REVIEWS: '/account/reviews',
    SAVED: '/account/saved',
  };

  const pathname = usePathname();
  const router = useRouter();
  const gotoHere = (link: string) => {
    router.push(link);
    params.setIsMenuOpen(false);
  };
  return (
    <div className='flex h-full'>
      <div className='h-full w-full text-gray-400 md:block'>
        <div
          onClick={() => gotoHere(paths.DASHBOARD)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.DASHBOARD) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Dashboard</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.PURCHASES)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.PURCHASES) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Purchase Orders</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.RESERVATIONS)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.RESERVATIONS) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Reservations</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.PAYMENTS)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.PAYMENTS) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Payment Methods</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.SAVED)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.SAVED) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Saved Items</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.PARTIES)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.PARTIES) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Manage Parties</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.REVIEWS)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.REVIEWS) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Products to Review</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.CHANGEPASSWORD)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.CHANGEPASSWORD) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Change Password</span>
            <RightOutlined />
          </div>
        </div>
        <div
          onClick={() => gotoHere(paths.MANAGE)}
          className={`cursor-pointer border-b py-3 ${pathname.includes(paths.MANAGE) ? 'font-semibold tracking-wide text-[#C7675E]' : ''}`}
        >
          <div className='flex w-full justify-between'>
            <span>Manage Account</span>
            <RightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
}
