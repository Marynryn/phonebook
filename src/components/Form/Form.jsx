
import { nanoid } from 'nanoid';
import css from './Form.module.css';
import { useSelector, useDispatch } from "react-redux"
import { selectGetContacts } from 'store/selectors';
import { postContact } from 'store/operations';

export default function Form() {
  const contacts = useSelector(selectGetContacts)
  const dispatch = useDispatch();
  const nameId = nanoid();
  const numberId = nanoid();

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formatPhone = phone => {
      return phone.replace(/(\d{3})(\d{2})(\d{2})/, `$1-$2-$3`);
    };
    const contact = {

      name: form.elements.name.value,
      number: formatPhone(form.elements.number.value),

    };
    const isContactExists = contacts.some(
      contact => contact.name === form.elements.name.value
    );
    if (isContactExists) {
      alert(`${form.elements.name.value} is already in contacts.`);
    } else {

      dispatch(postContact(contact));
    }
    form.reset();
  };

  return (
    <div className={css.box}>
      <h3 className={css.title}>New Contact</h3>


      <form onSubmit={handleSubmit}>
        <div className={css.wrap}>
          <h4 className={css.title_input}>Name</h4>

          <input className={css.input} type="text" name="name" required
            id={nameId} />
        </div>
        <div className={css.wrap}>
          <h4 className={css.title_input}>Number</h4>

          <input className={css.input} type="text" name="number" id={numberId}
            required />
        </div>

        <button className={css.button} type="submit">Send</button>
      </form>
    </div>
  )
}




