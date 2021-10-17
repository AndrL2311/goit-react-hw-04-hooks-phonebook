import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import s from './App.module.css';
import Form from './components/Form/Form';
import Filter from './components/Filter/Filter';
import Contacts from './components/Contacts/Contacts';

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  formSubmitHandler = data => {
    if (this.state.contacts.find(contact => contact.name === data.name)) {
      return alert(`${data.name} is alredy in contacts`);
    } else {
      data.id = uuidv4();
      this.setState(prevState => {
        // console.log(prevState.contacts); // будет разный на каждой итерации
        // Добавляем в масив новый объект
        return { contacts: [...prevState.contacts, data] };
      });
    }
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  changeFilter = event => {
    this.setState({ filter: event.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  render() {
    const visibleContacts = this.getVisibleContacts();

    return (
      <div className={s.container}>
        <h1 className={s.titlePhonebook}>Phonebook</h1>
        <Form onSubmit={this.formSubmitHandler} />
        <h2 className={s.titleContacts}>Contacts</h2>
        <Filter value={this.state.filter} onChange={this.changeFilter} />
        <Contacts
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
