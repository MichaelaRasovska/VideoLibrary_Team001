const schema = {
    type: "object",
    properties: {
        id: {type: "string", format: "uuid"},
    },
    required: ["id"]
}

module.exports = schema;