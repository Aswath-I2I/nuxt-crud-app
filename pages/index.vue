<template>
  <div>
    <v-alert v-if="checkForDuplicateEmployeeId" class="mt-8" type="warning"
      >Employee Id already present</v-alert
    >
    <v-alert v-if="checkForDuplicateEmailId" class="mt-8" type="warning"
      >Email already present</v-alert
    >
    <div>
      <v-card>
        <v-form v-model="valid" ref="empDetails">
          <v-container>
            <v-card-title :style="{ color: '#702b4f' }">
              Add Employee Details
            </v-card-title>
            <v-text-field
              v-model="firstName"
              :counter="20"
              label="First name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="lastname"
              :counter="20"
              label="Last name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="E-mail"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="empId"
              label="Employee Id"
              :rules="empIdRules"
              required
            ></v-text-field>
            <v-btn
              :disabled="disableButton"
              type="submit"
              size="xx-large"
              rounded
              @click.prevent="addDetails()"
              >Submit</v-btn
            >
          </v-container>
        </v-form>
      </v-card>
    </div>
    <div class="mt-8" v-if="empDetails.length > 0">
      <v-card>
        <v-card-title :style="{ color: '#702b4f' }"
          >List of Employees</v-card-title
        >
        <v-simple-table>
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">First Name</th>
                <th class="text-left">Last Name</th>
                <th class="text-left">Email</th>
                <th class="text-left">Employee Id</th>
                <th class="text-left">Edit</th>
                <th class="text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(emp, index) in empDetails" :key="index">
                <td>
                  <v-text-field
                    v-if="enableEdit && index === currentIndex"
                    v-model="emp.firstName"
                  ></v-text-field>
                  <div v-else>{{ emp.firstName }}</div>
                </td>
                <td>
                  <v-text-field
                    v-if="enableEdit && index === currentIndex"
                    v-model="emp.lastName"
                  ></v-text-field>
                  <div v-else>{{ emp.lastName }}</div>
                </td>
                <td>
                  <v-text-field
                    v-if="enableEdit && index === currentIndex"
                    v-model="emp.email"
                  ></v-text-field>
                  <div v-else>{{ emp.email }}</div>
                </td>
                <td>
                  <v-text-field
                    v-if="enableEdit && index === currentIndex"
                    v-model="emp.empId"
                  ></v-text-field>
                  <div v-else>{{ emp.empId }}</div>
                </td>
                <td v-if="!enableEdit">
                  <v-btn fab small color="grey">
                    <v-icon dark @click="enableToEdit(index)">
                      mdi-pencil
                    </v-icon>
                  </v-btn>
                </td>
                <td v-if="enableEdit">
                  <v-btn fab small color="grey">
                    <v-icon dark @click="updateEmpDetails(emp, index)">
                      mdi-content-save
                    </v-icon>
                  </v-btn>
                </td>
                <td>
                  <v-btn small fab color="grey"
                    ><v-icon dark @click="deleteEmployee(index, emp)">
                      mdi-delete
                    </v-icon></v-btn
                  >
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
declare interface EmployeeDetail {
  firstName: string;
  lastName: string;
  email: string;
  empId: any;
  _id?: string;
  __v?: number;
}
export default {
  name: "IndexPage",
  data() {
    return {
      valid: false as boolean,
      disableBtn: true as boolean,
      enableEdit: false,
      currentIndex: null as any,
      firstName: "" as string,
      lastname: "" as string,
      email: "" as string,
      empId: "" as any,
      empDetails: [] as EmployeeDetail[],
      nameRules: [
        (v: string) => !!v || "Name is required",
        (v: string) =>
          (v && v.length <= 20) || "Name must be less than 20 characters",
      ],
      empIdRules: [
        (v: any) => !!v || "Employee Id is required",
        (v: any) =>
          (v && !isNaN(parseFloat(v))) || "Employee Id must be Number",
      ],
      emailRules: [
        (v: any) => !!v || "E-mail is required",
        (v: any) => /.+@.+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    /**
     * Method to add employee details
     *
     * @param {*} params
     */
    async addDetails(): Promise<any> {
      const OThis: any = this;
      const refForm = OThis.$refs.empDetails as any;
      const addAEmployee: EmployeeDetail = {
        firstName: OThis.firstName,
        lastName: OThis.lastname,
        email: OThis.email,
        empId: OThis.empId,
      };
      try {
        await OThis.$axios.post("/employeedetails", addAEmployee);
      } catch (err) {
        console.log(err);
      }
      OThis.getEmployeeDetails();
      refForm.reset();
    },
    /**
     * Method to delete an employee detail
     *
     * @param {*} params
     */
    async deleteEmployee(index: number, emp: EmployeeDetail): Promise<any> {
      const id = emp._id;
      const OThis: any = this;
      try {
        await OThis.$axios.delete(`/employeedetails/${id}`);
      } catch (err) {
        console.log(err);
      }
      OThis.getEmployeeDetails();
    },

    /**
     * Method to enable edit for the index in table row
     *
     * @param {number} index
     * 
     */
    enableToEdit(index?: number): any {
      const OThis: any = this;
      OThis.currentIndex = index;
      OThis.enableEdit = !OThis.enableEdit;
    },

    /**
     * Method to update an existing employee detail
     *
     * @param {number} index
     * @param {EmployeeDetail} emp
     */
    async updateEmpDetails(emp: EmployeeDetail, index: number): Promise<any> {
      const OThis: any = this;
      const id = emp._id;
      try {
        await OThis.$axios.patch(`/employeedetails/${id}`, emp);
      } catch (err) {
        console.log(err);
      }
      OThis.getEmployeeDetails();
      OThis.enableToEdit();
    },

    /**
     * Method to fetch employee details from api
     *
     * @param {*} params
     */
    async getEmployeeDetails(): Promise<any> {
      const OThis: any = this;
      try {
        const response = await OThis.$axios.get("/employeedetails");
        OThis.empDetails = response.data;
        console.log(OThis.empDetails);
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    /**
     * Method to disable submit button
     *
     * @param {*} params
     */
    disableButton(): Boolean {
      const OThis: any = this;
      if (OThis.firstName && OThis.lastname && OThis.email && OThis.empId) {
        OThis.disableBtn = false;
      }
      return OThis.disableBtn;
    },

    /**
     * To check for duplicate employee Id in each input of new employee id
     *
     * @param {*} params
     */
    checkForDuplicateEmployeeId(): Boolean {
      const OThis: any = this;
      return OThis.empDetails.some(
        (employee: EmployeeDetail) => employee.empId === OThis.empId
      );
    },
    /**
     * To check for duplicate email Id in each input of new email id
     *
     * @param {*} params
     */
    checkForDuplicateEmailId(): Boolean {
      const OThis: any = this;
      return OThis.empDetails.some(
        (employee: EmployeeDetail) => employee.email === OThis.email
      );
    },
  },
  mounted() {
    (this as any).getEmployeeDetails();
  },
};
</script>
