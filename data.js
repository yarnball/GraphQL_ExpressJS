const data = {
  1: {
    id: 1,
    name: 'Tom',
    age: 45,
  },
  2: {
    id: 2,
    name: 'Jon',
    age: 15,
  }
};

console.log('obj vals', Object.values(data))

module.exports = {
  getPeople: () => Object.values(data),
  getPerson: id => data[id],
  createPerson: (name, age) => {
    const newPerson = {
      id: Math.random().toString(36).substr(2, 6),
      name,
      age
    };
      data[newPerson.id] = newPerson;
    return newPerson;
  },
  createRelation: (personId, friendId) => {
    const person = data[personId];
    const friend = data[friendId];

    person.friend = friend;

    return person;
  }
};