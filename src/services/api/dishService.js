import dishesData from "@/services/mockData/dishes.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const dishService = {
  async getAll() {
    await delay(300);
    return [...dishesData];
  },

  async getById(id) {
    await delay(200);
    const dish = dishesData.find(item => item.Id === parseInt(id));
    if (!dish) {
      throw new Error("Dish not found");
    }
    return { ...dish };
  },

  async create(dishData) {
    await delay(400);
    const newDish = {
      Id: Math.max(...dishesData.map(d => d.Id)) + 1,
      ...dishData
    };
    dishesData.push(newDish);
    return { ...newDish };
  },

  async update(id, updateData) {
    await delay(300);
    const index = dishesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Dish not found");
    }
    dishesData[index] = { ...dishesData[index], ...updateData };
    return { ...dishesData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = dishesData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Dish not found");
    }
    const deletedDish = { ...dishesData[index] };
    dishesData.splice(index, 1);
    return deletedDish;
  }
};