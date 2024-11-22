import {
  useCreatePurchase,
  useCreateRental,
  useGetAllParty,
  useGetAllSetting,
  useGetCartItems,
  useGetCurrentUserProfile,
  useGetReservationItems,
} from '@/apis';
import { errorModal, SelectAddon } from '@/components';
import AppInput from '@/components/common/custom-inputs/AppInput';
import { IAddon } from '@/interfaces';
import { RightOutlined, TruckOutlined } from '@ant-design/icons';
import { CardStackIcon } from '@radix-ui/react-icons';
import { DatePicker, Form, GetProps, Input, Select, Spin } from 'antd';
import { useForm } from 'antd/es/form/Form';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

interface Props {
  changeScreen: (
    x: 'close' | 'default' | 'renting' | 'rentalpayment' | 'rentaldone'
  ) => void;
  setOrder: (x: string) => void;
}

export const RentalBilling = ({ changeScreen, setOrder }: Props) => {
  const { data: defaultParty, isLoading: partyLoading } = useGetAllParty({
    query: {
      where: {
        isDefault: true,
      },
    },
  });
  const { data: reservation } = useGetReservationItems({
    query: {
      select: {
        total: true,
      },
    },
  });

  const { data: profile, isLoading: profileLoading } =
    useGetCurrentUserProfile();

  const [form] = useForm();

  const [info, setInfo] = useState<{
    partyName: string;
  }>({
    partyName: 'Default Party',
  });

  useEffect(() => {
    if (profile) {
      form.setFieldsValue({
        customerName: profile?.firstName + ' ' + profile?.lastName,
        customerPhone: profile?.phone,
        customerEmail: profile?.email,
        customerAddress: profile?.deliveryAddress,
        partyDate: dayjs().add(3, 'day'),
        expectedDeliveryDate: dayjs().add(4, 'day'),
      });
    }
    if (defaultParty) {
      setInfo({
        ...info,
        partyName: defaultParty?.data?.at(0)?.name,
      });
    }
  }, [profileLoading, partyLoading]);

  const [onLoad, setOnLoad] = useState(false);

  const createRentalOrder = useCreateRental();

  const [addonIds, setAddonIds] = useState<(string | undefined)[]>([]);

  const handlePlaceOrder = async () => {
    const values = await form?.validateFields();
    setOnLoad(true);
    try {
      const { id } = await createRentalOrder.mutateAsync({
        ...values,
        days: +values?.days,
        partyName: info?.partyName,
        partyDate: dayjs(values?.partyDate).format('YYYY-MM-DD'),
        expectedDeliveryDate: dayjs(values?.expectedDeliveryDate).format(
          'YYYY-MM-DD'
        ),
        addons: addonIds,
      });
      setOrder(id);
      changeScreen('rentaldone');
    } catch (err) {
      errorModal(err);
    }
    setOnLoad(false);
  };

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleAddonSelected = async (selecteds: IAddon[]) => {
    const newAddonIds = selecteds.map((addon) => addon?.id?.toString());
    const totalPrice = selecteds.reduce((acc, addon) => acc + addon.price, 0);

    setAddonIds(newAddonIds);
    setShowAddonFee(totalPrice);

    setIsModalVisible(false);
  };

  const { data: settings } = useGetAllSetting();
  const [showDeliveryFee, setShowDeliveryFee] = useState<number>(0);
  const [showAddonFee, setShowAddonFee] = useState<number>(0);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    // Can not select days before today and today
    return current && current < dayjs().endOf('day');
  };

  return (
    <div className='relative flex h-full flex-col gap-2 !font-proxima'>
      {onLoad && (
        <div className='absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-5'>
          <Spin />
        </div>
      )}
      <Form
        disabled={onLoad}
        form={form}
        layout='vertical'
        className='!font-proxima'
      >
        <div className='flex flex-col items-start justify-between py-2 md:flex-row'>
          <div>
            <div className='font-bold'>Billing</div>
            <div className='text-gray-400'>
              Enter the billing and delivery Information!
            </div>
          </div>
          <div className='font-bold'>
            <span className='font-normal'>Party: </span>
            {defaultParty?.data?.at(0)?.name}
          </div>
        </div>
        <div className='flex h-[500px] flex-col gap-4 overflow-y-scroll scrollbar-hide'>
          <div className='flex flex-col gap-2'>
            <Form.Item
              label={<span className='!font-proxima'>Your Name</span>}
              name={'customerName'}
              rules={[{ required: true, message: 'Name is required' }]}
              className='!font-proxima'
            >
              <AppInput
                // value={info?.customerName}
                // onChange={handleNameChange}
                placeholder='Your Name'
                className='max-h-10 !font-proxima'
              />
            </Form.Item>
            <div className='flex flex-col gap-y-2 md:flex-row md:gap-x-2 md:gap-y-0'>
              <Form.Item
                label={<span className='!font-proxima'>Phone No.</span>}
                name={'customerPhone'}
                className='w-full !font-proxima'
                rules={[{ required: true, message: 'Phone No. is required' }]}
              >
                <AppInput
                  // value={info?.customerPhone}
                  // onChange={handlePhoneChange}
                  placeholder='Your Phone No.'
                  className='max-h-10 !font-proxima'
                />
              </Form.Item>
              <Form.Item
                label={<span className='!font-proxima'>Email</span>}
                name={'customerEmail'}
                className='w-full'
                rules={[{ required: true, message: 'Email is required' }]}
              >
                <AppInput
                  // value={info?.customerEmail}
                  // onChange={handleEmailChange}
                  placeholder='Your Email'
                  className='max-h-10 w-full !font-proxima'
                />
              </Form.Item>
            </div>
          </div>
          <hr />
          <div className=''>
            <div className='mb-2 flex gap-2'>
              <div className='w-full'>
                <div className='font-bold'>Number of Days?</div>
                <Form.Item
                  name={'days'}
                  rules={[
                    { required: true, message: 'For How Many Days is required' },
                  ]}
                >
                  <AppInput
                    // value={info?.customerEmail}
                    // onChange={handleEmailChange}
                    placeholder='Booking For (days)'
                    className='max-h-10 w-full !font-proxima'
                    type='number'
                  />
                </Form.Item>
              </div>
              <div className='w-full'>
                <div className='font-bold'>Event Date</div>
                <Form.Item
                  name={'partyDate'}
                  rules={[
                    { required: true, message: 'Party Date is required' },
                  ]}
                >
                  <DatePicker
                    className='h-10 w-full !font-proxima'
                    placeholder='Your Event Date here'
                    disabledDate={(d) => d <= dayjs()}
                  />
                </Form.Item>
              </div>
              <div className='w-full'>
                <div className='font-bold'>Expected Delivery Date</div>
                <Form.Item
                  name={'expectedDeliveryDate'}
                  rules={[
                    {
                      required: true,
                      message: 'Expected Delivery Date needed!',
                    },
                    () => ({
                      validator(_, value) {
                        if (dayjs().add(3, 'day') >= dayjs(value)) {
                          return Promise.reject(
                            new Error('At least 3 days later!')
                          );
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <DatePicker
                    className='h-10 w-full !font-proxima'
                    placeholder='At Least 3 days needed'
                    disabledDate={(d) => d < dayjs().add(3, 'day')}
                  />
                </Form.Item>
              </div>
            </div>
            <div>
              <div className='font-bold'>Deliver To</div>
              <div className='flex gap-2'>
                <Form.Item
                  className='w-2/5 !font-proxima'
                  name={'state'}
                  label={<span className='!font-proxima'>Region</span>}
                  rules={[{ required: true, message: 'Region is required' }]}
                >
                  <Select
                    className='!h-[50px] !font-proxima !outline-none'
                    placeholder='Region'
                    options={Object.entries(
                      settings?.deliveryChargeUSA ?? {}
                    )?.map(([label]) => ({
                      label: label,
                      value: label,
                    }))}
                    onChange={(v) => {
                      Object.entries(settings?.deliveryChargeUSA ?? {})?.map(
                        ([label, price]) => {
                          label == v && setShowDeliveryFee(price);
                        }
                      );
                    }}
                    showSearch
                    optionFilterProp='label'
                  />
                </Form.Item>
                <Form.Item
                  className='w-full !font-proxima'
                  name={'customerAddress'}
                  label={
                    <span className='!font-proxima'>Detailed Address</span>
                  }
                  rules={[{ required: true, message: 'Address is required' }]}
                >
                  <AppInput placeholder='Type your address or paste the google map link here' />
                </Form.Item>
              </div>
            </div>
          </div>
          <hr />
          <div className='flex flex-col gap-2'>
            <SelectAddon
              visible={isModalVisible}
              onSelect={handleAddonSelected}
              onClose={() => setIsModalVisible(false)}
            />
            <div
              onClick={handleShowModal}
              className='flex cursor-pointer justify-between rounded-md border p-4 text-gray-600 hover:bg-gray-100'
            >
              <div className='flex items-center gap-2 text-[16px] font-bold'>
                <TruckOutlined />
                Add Ons
              </div>
              <RightOutlined />
            </div>
            {/* <div className='flex justify-between rounded-md border p-4 text-gray-600'>
            <div className='flex items-center gap-2 text-[16px] font-bold'>
              <CardStackIcon /> Payment Method
            </div>
            <RightOutlined />
          </div> */}
          </div>
          <div className='flex flex-col gap-2'>
            <div className='font-bold'>Order Summary</div>
            <div>
              <div className='flex justify-between'>
                <div className='text-gray-500'>Total</div>
                <div className='font-bold'>${reservation?.total}</div>
              </div>
              <hr />
            </div>
            <div>
              <div className='flex justify-between'>
                <div className='text-gray-500'>Delivery Fee</div>
                <div className='font-bold'>${showDeliveryFee}</div>
              </div>
              <div className='flex justify-between'>
                <div className='text-gray-500'>Addon Price</div>
                <div className='font-bold'>${showAddonFee}</div>
              </div>
              <hr />
            </div>
            <div>
              <div className='flex justify-between'>
                <div className='text-gray-500'>Total Payable</div>
                <div className='font-bold'>
                  ${reservation?.total + showDeliveryFee + showAddonFee}
                </div>
              </div>
              <hr />
            </div>
          </div>
        </div>
      </Form>
      <div className='flex w-full gap-2'>
        <div
          onClick={() => changeScreen('default')}
          className='w-full cursor-pointer rounded-md bg-gray-100 py-2 text-center text-gray-600 duration-200 hover:bg-gray-200'
        >
          Back to Cart
        </div>
        <div
          onClick={handlePlaceOrder}
          className='sahadow-md w-full cursor-pointer rounded-sm bg-blue-500 py-2 text-center text-white duration-200 hover:bg-blue-600 hover:shadow-lg'
        >
          Place Order
        </div>
      </div>
    </div>
  );
};
