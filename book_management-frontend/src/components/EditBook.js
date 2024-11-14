import React from 'react';
import BookForm from './BookForm';

const EditBook = () => {
    return (
        <div>
            <h1>Edit Book</h1>
            <BookForm isEdit={true} />
        </div>
    );
};

export default EditBook;
