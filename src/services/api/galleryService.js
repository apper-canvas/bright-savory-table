import galleryData from "@/services/mockData/gallery.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const galleryService = {
  async getAll() {
    await delay(300);
    return [...galleryData];
  },

  async getById(id) {
    await delay(200);
    const image = galleryData.find(item => item.Id === parseInt(id));
    if (!image) {
      throw new Error("Gallery image not found");
    }
    return { ...image };
  },

  async create(imageData) {
    await delay(400);
    const newImage = {
      Id: Math.max(...galleryData.map(g => g.Id)) + 1,
      ...imageData
    };
    galleryData.push(newImage);
    return { ...newImage };
  },

  async update(id, updateData) {
    await delay(300);
    const index = galleryData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Gallery image not found");
    }
    galleryData[index] = { ...galleryData[index], ...updateData };
    return { ...galleryData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = galleryData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Gallery image not found");
    }
    const deletedImage = { ...galleryData[index] };
    galleryData.splice(index, 1);
    return deletedImage;
  }
};