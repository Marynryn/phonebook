import { useDispatch } from "react-redux";
import { addFilter } from "store/contactsreducer";
import css from "./Filter.module.css"
const Filter = () => {

  const dispatch = useDispatch();
  const changeFilter = event => {
    const filter = event.currentTarget.value;
    dispatch(addFilter(filter));

  };
  return (

    <div className={css.box}>
      <h3 className={css.title}>Find contacts by name</h3>
      <form >
        <div className={css.wrap}>
          <input className={css.input} type="text"
            name="name"
            onChange={changeFilter}
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"

            required />
        </div>
      </form>
    </div>
  );
};

export default Filter;
