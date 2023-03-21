import { useState, useEffect } from "react";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Section } from "./Section/section";
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { Container } from "./App.styled";

export function App() {
  const [contacts, setContacts] = useState([
    {name: 'Rosie Simpson', number: '459-12-56'},
    {name: 'Hermione Kline', number: '443-89-12'},
    {name: 'Eden Clements', number: '645-17-79'},
    {name: 'Annie Copeland', number: '227-91-26'},
  ]);

  const [filter, setFilter] = useState("");
  const [firstLoading, setFirstLoading] = useState(false);
  useEffect(()=>{
    const savedStorage = localStorage.getItem('contacts');
    if(savedStorage) {
      setContacts(JSON.parse(savedStorage));
    };
    setFirstLoading(true);
  }, []);

  useEffect(()=>{
    if(firstLoading) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    };
  }, [contacts, firstLoading]);

  const takeDataFromSubmitForm = (name, number) => {
    const existingContact = contacts.find((element) =>
      element.name === name
    );
    if(existingContact) {
      window.alert(`${name} is already in contacts`);
      return;
    }; 
    setContacts(prevState => [...prevState, {name: name, number: number}]);
    Notify.success(`${name} is successfully added to your contact list`);
  };

  const handleFilterInputChange = e => {
    setFilter(e.currentTarget.value);
  };

  const getFilteredContacts = () => {
    return contacts.filter(element => element.name.toLowerCase().includes(filter));
  };

  const deleteContact = (name) => {
    setContacts(prevState => prevState.filter(contact => contact.name !== name));
    Notify.failure(`${name} is deleted from your contact list`);
  };
  const visibleContacts = getFilteredContacts();
  return (
    <>
      <Section title="Phonebook">
        <ContactForm takeDataFromSubmitForm={takeDataFromSubmitForm}/>
      </Section>

      <Section title="Contacts">
        <Container>
          <Filter value={filter} onChange={handleFilterInputChange}/>
          <ContactList
            contacts={visibleContacts} 
            onDeleteContact={deleteContact}>
          </ContactList>
        </Container>
      </Section>
    </>
  );
};