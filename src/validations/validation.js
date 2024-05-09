import ResponseError from "../commons/response-error.js"

export default function validate(schema, request) {
    const results = schema.validate(request)

    if (results.error) {
        throw new ResponseError(400, results.error.message)
    }

    return results.value;
}