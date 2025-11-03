import studentData from "@/services/mockData/students.json";

let students = [...studentData];

export const studentService = {
  // Get all students
  getAll: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([...students]);
      }, 300);
    });
  },

  // Get student by ID
  getById: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const student = students.find(s => s.Id === parseInt(id));
        if (student) {
          resolve({ ...student });
        } else {
          reject(new Error("Student not found"));
        }
      }, 200);
    });
  },

  // Create new student
  create: (studentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const maxId = Math.max(...students.map(s => s.Id), 0);
        const newStudent = {
          ...studentData,
          Id: maxId + 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        students.push(newStudent);
        resolve({ ...newStudent });
      }, 400);
    });
  },

  // Update existing student
  update: (id, studentData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = students.findIndex(s => s.Id === parseInt(id));
        if (index !== -1) {
          students[index] = {
            ...students[index],
            ...studentData,
            Id: parseInt(id),
            updatedAt: new Date().toISOString()
          };
          resolve({ ...students[index] });
        } else {
          reject(new Error("Student not found"));
        }
      }, 400);
    });
  },

  // Delete student
  delete: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = students.findIndex(s => s.Id === parseInt(id));
        if (index !== -1) {
          const deletedStudent = students.splice(index, 1)[0];
          resolve(deletedStudent);
        } else {
          reject(new Error("Student not found"));
        }
      }, 300);
    });
  },

  // Search students
  search: (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredStudents = students.filter(student => 
          student.firstName.toLowerCase().includes(query.toLowerCase()) ||
          student.lastName.toLowerCase().includes(query.toLowerCase()) ||
          student.email.toLowerCase().includes(query.toLowerCase()) ||
          student.studentId.toLowerCase().includes(query.toLowerCase()) ||
          student.major.toLowerCase().includes(query.toLowerCase())
        );
        resolve([...filteredStudents]);
      }, 250);
    });
  },

  // Filter by status
  filterByStatus: (status) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredStudents = students.filter(student => 
          status === "all" || student.status === status
        );
        resolve([...filteredStudents]);
      }, 200);
    });
  },

  // Get students by major
  getByMajor: (major) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredStudents = students.filter(student => 
          student.major.toLowerCase() === major.toLowerCase()
        );
        resolve([...filteredStudents]);
      }, 200);
    });
  },

  // Get students by year
  getByYear: (year) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const filteredStudents = students.filter(student => 
          student.year === parseInt(year)
        );
        resolve([...filteredStudents]);
      }, 200);
    });
  }
};