import Contact from 'components/Contact/Contact';
import { selectIsLoading } from 'store/selectors';
import { useSelector, useDispatch } from 'react-redux';
import css from "./ListContact.module.css"
import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import { fetchContacts } from '../../store/operations';

export const ListContacts = () => {


  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(fetchContacts());
  }, [dispatch]);
  const loading = useSelector(selectIsLoading)


  return (<div className={css.list}>
    {loading ? <Loader /> : <Contact />
    }</div>)


};

