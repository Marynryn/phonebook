import Filter from "components/Filter/Filter";
import Form from "components/Form/Form";
import { ListContacts } from "components/ListContacts/ListContacts";
import css from "./Contacts.module.css"
const Contacts = () => {


    return (
        <div>
            <h1 className={css.header1}>Phonebook</h1>
            <Form />
            <h2 className={css.header2}>Contacts</h2>
            <Filter />
            <ListContacts />
        </div >

    )
}

export default Contacts;