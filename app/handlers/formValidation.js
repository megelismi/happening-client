export const validPhone = phone => {
    const validFormat = (
        /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    );

    return phone.match(validFormat);
};
