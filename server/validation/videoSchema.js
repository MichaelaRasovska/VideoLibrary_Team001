const schema = {
    type: "object",
    properties: {
        name: {type: "string", minLength: 1},
        title: {type: "string", minLength: 1},
        duration: {type: "number", format: "int32", minimum: 1},
        description: {type: "string", maxLength: 1000},
        genres: {type: "array", minItems: 1, uniqueItems: true},
        url: {type: "string", format: "uri"},
        picture: {type: "string", format: "uri"}
    },
    required: ["name", "title", "duration", "genres", "url", "picture", "description"],
    additionalProperties: false
}

module.exports = schema;