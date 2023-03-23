import PropTypes from 'prop-types';
import { ContactItem } from 'components/ContactItem/ContactItem';
import { ContactListEl } from './ContactList.styled';

export function ContactList({contacts, deleteContact}) {
    return (
        <ContactListEl>
            {contacts.map((contact) => {
                    return (
                        <ContactItem 
                            key={contact.name}
                            name={contact.name}
                            number={contact.number}
                            deleteContact={deleteContact}
                        />
                    );
                })}                
        </ContactListEl>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })),
    deleteContact: PropTypes.func,
};