export const EMPTY_FORM = {
  fullName: "",
  gender: "",
  dob: "",
  state: "",
  isActive: true,
  profileImage: "",
};

const DEFAULT_EMPLOYEES = [
  {
    id: 1,
    fullName: "Ravi Kumar",
    gender: "Male",
    dob: "1995-06-12",
    state: "Telangana",
    isActive: true,
    profileImage: "",
  },
];

export const getEmployees = () => {
  const data = localStorage.getItem("employees");
  if (!data) {
    localStorage.setItem("employees", JSON.stringify(DEFAULT_EMPLOYEES));
    return DEFAULT_EMPLOYEES;
  }
  return JSON.parse(data);
};

export const saveEmployees = (list) => {
  localStorage.setItem("employees", JSON.stringify(list));
};

export const insertOrUpdateEmployee = (employee) => {
  const employees = getEmployees();

  const index = employees.findIndex((e) => e.id === employee.id);

  if (index !== -1) {
    employees[index] = {
      ...employees[index],
      ...employee,
    };
  } else {
    employees.push({
      ...employee,
      id: generateEmployeeId(employees),
    });
  }
  employee.profileImage = "";

  saveEmployees(employees);
  return employees;
};

const generateEmployeeId = (employees) => {
  return employees.length ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
};

export const deleteEmployee = (id) => {
  const employees = getEmployees();
  const updated = employees.filter((emp) => emp.id !== id);
  saveEmployees(updated);
  return updated;
};
