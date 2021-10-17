import PropTypes from 'prop-types';
import s from './Contacts.module.css';
import Contact from '../Contact/Contact';

function Contacts({ contacts, onDeleteContact }) {
  return (
    <ul className={s.list}>
      {contacts.map(contact => (
        <Contact
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
          onDeleteContact={onDeleteContact}
        />
      ))}
    </ul>
  );
}

export default Contacts;

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDeleteContact: PropTypes.func.isRequired,
};
