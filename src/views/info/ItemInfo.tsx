import { useState, useEffect } from 'react';
import InputField from "components/fields/InputField";
import Checkbox from "components/checkbox";
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../features/auth/authActions';
import InfoForm from './info-form';
import { AppDispatch } from '../../store';
import SelectRestaurant from 'components/select-restaurant';

const ItemInfo = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { userToken } = useSelector((state: any) => state.auth) || {};
  const location = useLocation();
  const [record, setRecord] = useState(location?.state?.record);

  const handleFormSubmit = async (values: any) => {
    dispatch(userLogin({ userName, password }));
  };

  return (
    <>

      <span className="text-sm">正在編輯: </span><SelectRestaurant />
      <div className="mt-24 max-w-sm mx-auto">
        <div className="border-b border-gray-900/10 pb-12">
          <InfoForm record={record} />
          {/* <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">

     </div> */}
        </div>
      </div>
    </>
  );
}

export default ItemInfo;