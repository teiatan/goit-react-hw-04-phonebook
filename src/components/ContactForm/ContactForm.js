import PropTypes from 'prop-types';
import { useState } from "react";
import { Form, Label, Input, Button } from './ContactForm.styled';

export function ContactForm({takeDataFromSubmitForm}) {

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");

    const handleInputChange = e => {
        const { name, value } = e.currentTarget;

        switch (name) {
            case "name":
                setName(value);
                break;
            case "number":
                setNumber(value);
                break;
            default:
                return;
        };
    };

    const handleSubmit = e => {
        e.preventDefault();
        takeDataFromSubmitForm(name, number);
        resetForm();
    };

    const resetForm = () => {
        setName("");
        setNumber("");
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Label>
                Name
                <Input
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value={name}
                    onChange={handleInputChange}
                />
            </Label>
            
            <Label>
                Number
                <Input
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleInputChange}
                />
            </Label>  

            <Button type="submit">Add contact</Button>
        </Form>
    );  
};

ContactForm.propTypes = {
    takeDataFromSubmitForm: PropTypes.func,
};