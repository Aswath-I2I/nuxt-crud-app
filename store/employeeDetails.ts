export const state = () => ({
  // employeeDetails: [],
  newEmployeeDetail: "",
  updateExisitingEmployee: "",
  deleteAnEmployee: "",
});

export const mutations = {
  // setEmpDetails(state: any,value: any) {
  //     state.employeeDetails = value;
  // },
  setNewEmployeeDetail(state: any, value: any) {
    state.newEmployeeDetail = value;
  },
  updateAnExisitingEmployee(state: any, value: any) {
    state.updateAnExisitingEmployee = value;
  },
  deleteAnExistingEmployee(state: any, value: any) {
    state.deleteAnEmployee = value;
  },
};

export const actions = {
  async addANewEmployee({ commit, state }: any): Promise<any> {
    const OThis = this;
    const addEmployee = state.newEmployeeDetail;
    const response = await OThis.$axios.post("/employeedetails", addEmployee);
    commit("setEmpDetails", "");
    return response.data;
  },

  async updateAnExisitingEmployeeDetail({ commit, state }: any): Promise<any> {
    const OThis = this;
    const exisitingEmployeeDetail = state.updateAnExisitingEmployee;
    const id = exisitingEmployeeDetail._id;
    const response = await OThis.$axios.patch(
      `/employeedetails/${id}`,
      exisitingEmployeeDetail
    );
    commit("updateAnExisitingEmployee", "");
    return response.data;
  },

  async deleteAnEmployeeDetail({ commit, state }: any): Promise<any> {
    const OThis = this;
    const id = state.deleteAnEmployee._id;
    const response = await OThis.$axios.delete(`/employeedetails/${id}`);
    commit("deleteAnExistingEmployee", "");
    return response.data;
  },
};

export default { state, mutations, actions };
