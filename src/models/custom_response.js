

const notFound = (res, message = 'Not Found', code = 404) => {
    return res.status(code).json({ message });
}


const success = (res, data, message = 'Success', code = 200) => {
    return res.status(code).json({ message, data });
}

const deleted = (res, code = 204) => {
    return res.status(code).json();
}


const unableToProcess = (res, data, message = 'Unable to Process', code = 402) => {
    res.setHeader("Content-Type", "application/json");
    return res.status(code).json({ message, data });
}


const serverError = (res, data, message = 'Unable to Process', code = 500) => {
    return res.status(code).json({ message, data });
}


module.exports = {
    notFound, success, unableToProcess, serverError, deleted
}