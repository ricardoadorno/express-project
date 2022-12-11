// create a user class  and export to express app

class UserCreator {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class QuestTracker {
  constructor(name) {
    this.name = name;
    this.quests = [];
    this.completedQuests = [];
  }

  addQuest(quest) {
    this.quests.push(quest);
  }

  isCompleteQuest(quest) {
    if (!this.quests.includes(quest)) {
      return false;
    }
    this.quests = this.quests.filter((q) => q !== quest);
    this.completedQuests.push(quest);
  }
}

module.exports = { UserCreator, QuestTracker };
