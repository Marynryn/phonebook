import { nanoid } from 'nanoid';
import css from 'components/RegisterForm/RegisterForm.module.css';
import { useDispatch } from "react-redux"
import { userPost } from 'store/operations';



const RegisterForm = () => {
    const dispatch = useDispatch();
    const nameId = nanoid();
    const emailId = nanoid();
    const passwordId = nanoid();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const user = {

            name: form.elements.name.value,
            email: form.elements.email.value,
            password: form.elements.password.value,
        };

        dispatch(userPost(user));

        form.reset();
    };
    return (

        <div className={css.form_container}>

            <div className={css.box}>
                <form onSubmit={handleSubmit}>
                    <div className={css.wrap}>
                        <h2 className={css.title_input}>Name</h2>
                        <input className={css.input}
                            type="text"
                            name="name"
                            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                            required
                            id={nameId}
                        /></div>
                    <div className={css.wrap}>
                        <h4 className={css.title_input}>Email</h4>

                        <input className={css.input} type="email"
                            name="email"

                            id={emailId}
                            required
                        />
                    </div>
                    <div className={css.wrap}>
                        <h4 className={css.title_input}>Password</h4>

                        <input className={css.input} type="text"
                            name="password" id={passwordId}

                            required />
                    </div>

                    <button className={css.button} type="submit">Registration</button>
                </form>
            </div>

        </div>

    )
}

export default RegisterForm;



