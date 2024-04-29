import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; // Adjust this to your backend server URL

export const apiService = {
  async deposit(amount: number) {
    return axios.post(`${API_BASE_URL}/bank-account/deposit`, { amount });
  },
  async withdraw(amount: number) {
    return axios.post(`${API_BASE_URL}/bank-account/withdraw`, { amount });
  },
  async transfer(iban: string, amount: number) {
    return axios.post(`${API_BASE_URL}/bank-account/transfer`, {
      iban,
      amount,
    });
  },
  async getStatement(sortOrder: "asc" | "desc" = "desc", page?: number) {
    return axios.get(`${API_BASE_URL}/bank-account/statement`, {
      params: { sort: sortOrder, page },
    });
  },
  async searchMovements(
    type: "deposit" | "withdrawal" | "all",
    startDate?: string,
    endDate?: string,
    sortOrder: "asc" | "desc" = "desc",
    page?: number
  ) {
    const params = { type, sort: sortOrder, page };
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;

    return axios.get(`${API_BASE_URL}/bank-account/search-movements`, {
      params,
    });
  },
};
