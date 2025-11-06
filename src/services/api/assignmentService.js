import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const assignmentService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('assignment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "weight_c"}},
          {"field": {"Name": "course_id_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching assignments:", error.message);
      throw new Error("Failed to fetch assignments");
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('assignment_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "weight_c"}},
          {"field": {"Name": "course_id_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching assignment:", error.message);
      throw new Error("Failed to fetch assignment");
    }
  },

  async getByCourseId(courseId) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('assignment_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "due_date_c"}},
          {"field": {"Name": "priority_c"}},
          {"field": {"Name": "completed_c"}},
          {"field": {"Name": "grade_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "weight_c"}},
          {"field": {"Name": "course_id_c"}}
        ],
        where: [{
          "FieldName": "course_id_c",
          "Operator": "EqualTo",
          "Values": [parseInt(courseId)]
        }]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching course assignments:", error.message);
      throw new Error("Failed to fetch course assignments");
    }
  },

  async create(assignmentData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          title_c: assignmentData.title_c || assignmentData.title,
          description_c: assignmentData.description_c || assignmentData.description,
          due_date_c: assignmentData.due_date_c || assignmentData.dueDate,
          priority_c: assignmentData.priority_c || assignmentData.priority,
          type_c: assignmentData.type_c || assignmentData.type,
          weight_c: assignmentData.weight_c || assignmentData.weight,
          completed_c: assignmentData.completed_c || assignmentData.completed || false,
          course_id_c: parseInt(assignmentData.course_id_c || assignmentData.courseId)
        }]
      };

      const response = await apperClient.createRecord('assignment_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} assignments:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error creating assignment:", error.message);
      throw new Error("Failed to create assignment");
    }
  },

  async update(id, assignmentData) {
    try {
      const apperClient = getApperClient();
      
      const params = {
        records: [{
          Id: parseInt(id),
          title_c: assignmentData.title_c || assignmentData.title,
          description_c: assignmentData.description_c || assignmentData.description,
          due_date_c: assignmentData.due_date_c || assignmentData.dueDate,
          priority_c: assignmentData.priority_c || assignmentData.priority,
          type_c: assignmentData.type_c || assignmentData.type,
          weight_c: assignmentData.weight_c || assignmentData.weight,
          completed_c: assignmentData.completed_c !== undefined ? assignmentData.completed_c : assignmentData.completed,
          course_id_c: parseInt(assignmentData.course_id_c || assignmentData.courseId),
          grade_c: assignmentData.grade_c || assignmentData.grade
        }]
      };

      const response = await apperClient.updateRecord('assignment_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} assignments:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful[0]?.data || null;
      }
      
      return null;
    } catch (error) {
      console.error("Error updating assignment:", error.message);
      throw new Error("Failed to update assignment");
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('assignment_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} assignments:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting assignment:", error.message);
      throw new Error("Failed to delete assignment");
    }
  },

  async toggleComplete(id, completed) {
    try {
      return await this.update(id, { completed_c: completed });
    } catch (error) {
      console.error("Error toggling assignment completion:", error.message);
      throw new Error("Failed to toggle assignment completion");
    }
  }
};