import moment from 'moment';

function formatDate(dateString, format = 'DD/MM/YYYY') {
    console.log('Date String', dateString);
    // delete all characters except numbers, hyphens, slashes, and spaces
    const sanitizedDateString = dateString.replace(/[^0-9-/\s]/g, '').trim();
    const isValid = moment(sanitizedDateString, 'YYYY-MM-DD', true).isValid();

    if (isValid) {
        console.log('Valid Date', dateString);
        return moment(sanitizedDateString, 'YYYY-MM-DD').format(format);
    }

    return dateString;
}

export default formatDate;
