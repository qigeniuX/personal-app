class Person {
    age
    name

    constructor(age, name) {
        this.age = age
        this.name = name
    }
}

class ProgrammePerson extends Person {
    skills

    constructor(age, name, skills) {
        super(age, name)

        this.skills = skills
    }
}

li = new ProgrammePerson(20, 'li', ['C+++++++++++++'])

console.log(li.age, li.name, li.skills)
// class MarketPerson {

// }

arr = new Array(10)


