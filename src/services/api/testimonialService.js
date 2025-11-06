import testimonialsData from "@/services/mockData/testimonials.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const testimonialService = {
  async getAll() {
    await delay(300);
    return [...testimonialsData];
  },

  async getById(id) {
    await delay(200);
    const testimonial = testimonialsData.find(item => item.Id === parseInt(id));
    if (!testimonial) {
      throw new Error("Testimonial not found");
    }
    return { ...testimonial };
  },

  async create(testimonialData) {
    await delay(400);
    const newTestimonial = {
      Id: Math.max(...testimonialsData.map(t => t.Id)) + 1,
      ...testimonialData,
      date: new Date().toISOString().split('T')[0]
    };
    testimonialsData.push(newTestimonial);
    return { ...newTestimonial };
  },

  async update(id, updateData) {
    await delay(300);
    const index = testimonialsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Testimonial not found");
    }
    testimonialsData[index] = { ...testimonialsData[index], ...updateData };
    return { ...testimonialsData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = testimonialsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Testimonial not found");
    }
    const deletedTestimonial = { ...testimonialsData[index] };
    testimonialsData.splice(index, 1);
    return deletedTestimonial;
  }
};