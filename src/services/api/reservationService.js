import reservationsData from "@/services/mockData/reservations.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const reservationService = {
  async getAll() {
    await delay(300);
    return [...reservationsData];
  },

  async getById(id) {
    await delay(200);
    const reservation = reservationsData.find(item => item.Id === parseInt(id));
    if (!reservation) {
      throw new Error("Reservation not found");
    }
    return { ...reservation };
  },

  async create(reservationData) {
    await delay(500);
    const newReservation = {
      Id: Math.max(...reservationsData.map(r => r.Id)) + 1,
      ...reservationData,
      timestamp: new Date().toISOString()
    };
    reservationsData.push(newReservation);
    return { ...newReservation };
  },

  async update(id, updateData) {
    await delay(300);
    const index = reservationsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Reservation not found");
    }
    reservationsData[index] = { ...reservationsData[index], ...updateData };
    return { ...reservationsData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = reservationsData.findIndex(item => item.Id === parseInt(id));
    if (index === -1) {
      throw new Error("Reservation not found");
    }
    const deletedReservation = { ...reservationsData[index] };
    reservationsData.splice(index, 1);
    return deletedReservation;
  }
};