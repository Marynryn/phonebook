import { nanoid } from 'nanoid';
import css from 'components/LoginForm/LoginForm.module.css';
import { useDispatch } from "react-redux"
import { login } from 'store/operations';


const LoginForm = () => {


    const dispatch = useDispatch();

    const emailId = nanoid();
    const passwordId = nanoid();
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;

        const user = {
            email: form.elements.email.value,
            password: form.elements.password.value,
        };

        dispatch(login(user));

        form.reset();
    };
    return (
        <div className={css.form_container}>
            <div className={css.box}>



                <form onSubmit={handleSubmit}>
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

                    <button className={css.button} type="submit"> Log in</button>
                </form>
            </div>

        </div>

    )
}

export default LoginForm;
