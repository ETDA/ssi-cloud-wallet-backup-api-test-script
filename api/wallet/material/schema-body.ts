const genSchemaBody = (obj: {
  title: string, description: string, type: string, properties: any, required: any, additional: any
}) => {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: obj.title,
    description: obj.description,
    type: obj.type,
    properties: obj.properties,
    required: obj.required,
    additionalProperties: obj.additional
  }
}

export class SchemaBody {
  static Message (title: string, description: string, type: string, properties: any, required: any, additional: any) {
    const message = genSchemaBody({
      title: title,
      description: description,
      type: type,
      properties: properties,
      required: required,
      additional: additional
    })
    return message
  }
}
