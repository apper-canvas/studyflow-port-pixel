import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const studentService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('student_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "major_c"}},
          {"field": {"Name": "year_c"}},
          {"field": {"Name": "gpa_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform data to match UI expectations
      return (response.data || []).map(student => ({
        ...student,
        firstName: student.first_name_c,
        lastName: student.last_name_c,
        email: student.email_c,
        phone: student.phone_c,
        studentId: student.student_id_c,
        major: student.major_c,
        year: student.year_c,
        gpa: student.gpa_c,
        status: student.status_c,
        enrollmentDate: student.enrollment_date_c,
        address: student.address_c,
        emergencyContact: student.emergency_contact_c,
        emergencyPhone: student.emergency_phone_c
      }));
    } catch (error) {
      console.error("Error fetching students:", error.message);
      throw new Error("Failed to fetch students");
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('student_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "major_c"}},
          {"field": {"Name": "year_c"}},
          {"field": {"Name": "gpa_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (!response.data) return null;

      const student = response.data;
      return {
        ...student,
        firstName: student.first_name_c,
        lastName: student.last_name_c,
        email: student.email_c,
        phone: student.phone_c,
        studentId: student.student_id_c,
        major: student.major_c,
        year: student.year_c,
        gpa: student.gpa_c,
        status: student.status_c,
        enrollmentDate: student.enrollment_date_c,
        address: student.address_c,
        emergencyContact: student.emergency_contact_c,
        emergencyPhone: student.emergency_phone_c
      };
    } catch (error) {
      console.error("Error fetching student:", error.message);
      throw new Error("Failed to fetch student");
    }
  },

  async create(studentData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          first_name_c: studentData.firstName,
          last_name_c: studentData.lastName,
          email_c: studentData.email,
          phone_c: studentData.phone,
          student_id_c: studentData.studentId,
          major_c: studentData.major,
          year_c: studentData.year,
          gpa_c: studentData.gpa,
          status_c: studentData.status,
          enrollment_date_c: studentData.enrollmentDate,
          address_c: studentData.address,
          emergency_contact_c: studentData.emergencyContact,
          emergency_phone_c: studentData.emergencyPhone
        }]
      };

      const response = await apperClient.createRecord('student_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} students:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const createdStudent = successful[0]?.data;
        if (createdStudent) {
          return {
            ...createdStudent,
            firstName: createdStudent.first_name_c,
            lastName: createdStudent.last_name_c,
            email: createdStudent.email_c,
            phone: createdStudent.phone_c,
            studentId: createdStudent.student_id_c,
            major: createdStudent.major_c,
            year: createdStudent.year_c,
            gpa: createdStudent.gpa_c,
            status: createdStudent.status_c,
            enrollmentDate: createdStudent.enrollment_date_c,
            address: createdStudent.address_c,
            emergencyContact: createdStudent.emergency_contact_c,
            emergencyPhone: createdStudent.emergency_phone_c
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating student:", error.message);
      throw new Error("Failed to create student");
    }
  },

  async update(id, studentData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          first_name_c: studentData.firstName,
          last_name_c: studentData.lastName,
          email_c: studentData.email,
          phone_c: studentData.phone,
          student_id_c: studentData.studentId,
          major_c: studentData.major,
          year_c: studentData.year,
          gpa_c: studentData.gpa,
          status_c: studentData.status,
          enrollment_date_c: studentData.enrollmentDate,
          address_c: studentData.address,
          emergency_contact_c: studentData.emergencyContact,
          emergency_phone_c: studentData.emergencyPhone
        }]
      };

      const response = await apperClient.updateRecord('student_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} students:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const updatedStudent = successful[0]?.data;
        if (updatedStudent) {
          return {
            ...updatedStudent,
            firstName: updatedStudent.first_name_c,
            lastName: updatedStudent.last_name_c,
            email: updatedStudent.email_c,
            phone: updatedStudent.phone_c,
            studentId: updatedStudent.student_id_c,
            major: updatedStudent.major_c,
            year: updatedStudent.year_c,
            gpa: updatedStudent.gpa_c,
            status: updatedStudent.status_c,
            enrollmentDate: updatedStudent.enrollment_date_c,
            address: updatedStudent.address_c,
            emergencyContact: updatedStudent.emergency_contact_c,
            emergencyPhone: updatedStudent.emergency_phone_c
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating student:", error.message);
      throw new Error("Failed to update student");
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('student_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} students:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting student:", error.message);
      throw new Error("Failed to delete student");
    }
  },

  async search(query) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('student_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "major_c"}},
          {"field": {"Name": "year_c"}},
          {"field": {"Name": "gpa_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}}
        ],
        whereGroups: [{
          "operator": "OR",
          "subGroups": [
            {"conditions": [
              {"fieldName": "first_name_c", "operator": "Contains", "values": [query]},
              {"fieldName": "last_name_c", "operator": "Contains", "values": [query]},
              {"fieldName": "email_c", "operator": "Contains", "values": [query]},
              {"fieldName": "student_id_c", "operator": "Contains", "values": [query]},
              {"fieldName": "major_c", "operator": "Contains", "values": [query]}
            ], "operator": "OR"}
          ]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(student => ({
        ...student,
        firstName: student.first_name_c,
        lastName: student.last_name_c,
        email: student.email_c,
        phone: student.phone_c,
        studentId: student.student_id_c,
        major: student.major_c,
        year: student.year_c,
        gpa: student.gpa_c,
        status: student.status_c,
        enrollmentDate: student.enrollment_date_c,
        address: student.address_c,
        emergencyContact: student.emergency_contact_c,
        emergencyPhone: student.emergency_phone_c
      }));
    } catch (error) {
      console.error("Error searching students:", error.message);
      throw new Error("Failed to search students");
    }
  },

  async filterByStatus(status) {
    try {
      if (status === "all") {
        return await this.getAll();
      }

      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('student_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "major_c"}},
          {"field": {"Name": "year_c"}},
          {"field": {"Name": "gpa_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}}
        ],
        where: [{
          "FieldName": "status_c",
          "Operator": "EqualTo",
          "Values": [status]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(student => ({
        ...student,
        firstName: student.first_name_c,
        lastName: student.last_name_c,
        email: student.email_c,
        phone: student.phone_c,
        studentId: student.student_id_c,
        major: student.major_c,
        year: student.year_c,
        gpa: student.gpa_c,
        status: student.status_c,
        enrollmentDate: student.enrollment_date_c,
        address: student.address_c,
        emergencyContact: student.emergency_contact_c,
        emergencyPhone: student.emergency_phone_c
      }));
    } catch (error) {
      console.error("Error filtering students by status:", error.message);
      throw new Error("Failed to filter students by status");
    }
  },

  async getByMajor(major) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('student_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "major_c"}},
          {"field": {"Name": "year_c"}},
          {"field": {"Name": "gpa_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}}
        ],
        where: [{
          "FieldName": "major_c",
          "Operator": "EqualTo",
          "Values": [major]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(student => ({
        ...student,
        firstName: student.first_name_c,
        lastName: student.last_name_c,
        email: student.email_c,
        phone: student.phone_c,
        studentId: student.student_id_c,
        major: student.major_c,
        year: student.year_c,
        gpa: student.gpa_c,
        status: student.status_c,
        enrollmentDate: student.enrollment_date_c,
        address: student.address_c,
        emergencyContact: student.emergency_contact_c,
        emergencyPhone: student.emergency_phone_c
      }));
    } catch (error) {
      console.error("Error fetching students by major:", error.message);
      throw new Error("Failed to fetch students by major");
    }
  },

  async getByYear(year) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('student_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "first_name_c"}},
          {"field": {"Name": "last_name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "student_id_c"}},
          {"field": {"Name": "major_c"}},
          {"field": {"Name": "year_c"}},
          {"field": {"Name": "gpa_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "enrollment_date_c"}},
          {"field": {"Name": "address_c"}},
          {"field": {"Name": "emergency_contact_c"}},
          {"field": {"Name": "emergency_phone_c"}}
        ],
        where: [{
          "FieldName": "year_c",
          "Operator": "EqualTo",
          "Values": [parseInt(year)]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(student => ({
        ...student,
        firstName: student.first_name_c,
        lastName: student.last_name_c,
        email: student.email_c,
        phone: student.phone_c,
        studentId: student.student_id_c,
        major: student.major_c,
        year: student.year_c,
        gpa: student.gpa_c,
        status: student.status_c,
        enrollmentDate: student.enrollment_date_c,
        address: student.address_c,
        emergencyContact: student.emergency_contact_c,
        emergencyPhone: student.emergency_phone_c
      }));
    } catch (error) {
      console.error("Error fetching students by year:", error.message);
      throw new Error("Failed to fetch students by year");
    }
  }
};