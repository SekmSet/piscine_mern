db.createCollection("students", {
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: [ "id", "lastname", "firstname", "email","phone","validated","admin"],
            properties: {
                id: {
                    bsonType: "int",
                },
                lastname: {
                    bsonType: "string",
                },
                firstname: {
                    bsonType: "string",
                },
                email: {
                    bsonType: "string",
                    pattern: '^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,}$',
                },
                phone: {
                    bsonType: "string",
                    pattern: '^((\\+)33|0|0033)[1-9](\\d{2}){4}$',
                },
                validated: {
                    enum: ["in progress", "validated", "rejected"]
                },
                admin: {
                    bsonType: "bool",
                }
            }
        }
    }
})

db.students.insert({
    id: NumberInt(1),
    lastname: 'Joly',
    firstname: 'priscilla',
    email: 'PRISCILLA@ORANGE.FR',
    phone: '0683895070',
    validated: 'in progress',
    admin: true
})