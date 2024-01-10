import { Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { getRestaurantInfo } from "../../features/restaurant/restaurantActions";
import { setRestaurant } from "../../features/restaurant/restaurantSlice";

const SelectRestaurant = (props: {}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { userToken } = useSelector((state: any) => state.auth) || {};
  const { restaurantList, restaurantId, restaurantInfo } = useSelector((state: any) => state.restaurant) || {};
  const [optionList, setOptionList] = useState<any>([]);

  const handleChange = (value: string, data: any) => {
    console.log(data);
    if (data) {
      dispatch(setRestaurant(data));
    }
  };

  useEffect(() => {
    if (userToken) {
      dispatch(getRestaurantInfo({ token: userToken }));
      console.log(restaurantId, restaurantList, restaurantInfo);
      let list: any = [];
      restaurantList?.map((item: any) => {
        list.push({ value: item.id, label: item.name, key: item.id, info: item });
      })
      console.log(list);
      setOptionList(list);
      dispatch(setRestaurant(list?.[0] ?? null));
    }
  }, [userToken, restaurantList?.length]);


  return (
    <Select
      value={restaurantId}
      style={{ width: 120 }}
      onChange={handleChange}
      options={optionList}
    />
  );
};

export default SelectRestaurant;
