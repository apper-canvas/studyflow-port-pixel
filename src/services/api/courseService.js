import { getApperClient } from "@/services/apperClient";
import { toast } from "react-toastify";

export const courseService = {
  async getAll() {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.fetchRecords('course_c', {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "instructor_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "credits_c"}},
          {"field": {"Name": "semester_c"}},
          {"field": {"Name": "schedule_day_c"}},
          {"field": {"Name": "schedule_start_time_c"}},
          {"field": {"Name": "schedule_end_time_c"}},
          {"field": {"Name": "schedule_location_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      // Transform schedule data to match expected format
      return (response.data || []).map(course => ({
        ...course,
        name: course.name_c,
        instructor: course.instructor_c,
        color: course.color_c,
        credits: course.credits_c,
        semester: course.semester_c,
        schedule: course.schedule_day_c ? [{
          day: course.schedule_day_c,
          startTime: course.schedule_start_time_c,
          endTime: course.schedule_end_time_c,
          location: course.schedule_location_c
        }] : []
      }));
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      throw new Error("Failed to fetch courses");
    }
  },

  async getById(id) {
    try {
      const apperClient = getApperClient();
      const response = await apperClient.getRecordById('course_c', parseInt(id), {
        fields: [
          {"field": {"Name": "Name"}},
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "instructor_c"}},
          {"field": {"Name": "color_c"}},
          {"field": {"Name": "credits_c"}},
          {"field": {"Name": "semester_c"}},
          {"field": {"Name": "schedule_day_c"}},
          {"field": {"Name": "schedule_start_time_c"}},
          {"field": {"Name": "schedule_end_time_c"}},
          {"field": {"Name": "schedule_location_c"}}
        ]
      });

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (!response.data) return null;

      const course = response.data;
      return {
        ...course,
        name: course.name_c,
        instructor: course.instructor_c,
        color: course.color_c,
        credits: course.credits_c,
        semester: course.semester_c,
        schedule: course.schedule_day_c ? [{
          day: course.schedule_day_c,
          startTime: course.schedule_start_time_c,
          endTime: course.schedule_end_time_c,
          location: course.schedule_location_c
        }] : []
      };
    } catch (error) {
      console.error("Error fetching course:", error.message);
      throw new Error("Failed to fetch course");
    }
  },

  async create(courseData) {
    try {
      const apperClient = getApperClient();
      
      const scheduleItem = courseData.schedule?.[0];
      const params = {
        records: [{
          name_c: courseData.name,
          instructor_c: courseData.instructor,
          color_c: courseData.color,
          credits_c: courseData.credits,
          semester_c: courseData.semester,
          schedule_day_c: scheduleItem?.day || "",
          schedule_start_time_c: scheduleItem?.startTime || "",
          schedule_end_time_c: scheduleItem?.endTime || "",
          schedule_location_c: scheduleItem?.location || ""
        }]
      };

      const response = await apperClient.createRecord('course_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} courses:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const createdCourse = successful[0]?.data;
        if (createdCourse) {
          return {
            ...createdCourse,
            name: createdCourse.name_c,
            instructor: createdCourse.instructor_c,
            color: createdCourse.color_c,
            credits: createdCourse.credits_c,
            semester: createdCourse.semester_c,
            schedule: createdCourse.schedule_day_c ? [{
              day: createdCourse.schedule_day_c,
              startTime: createdCourse.schedule_start_time_c,
              endTime: createdCourse.schedule_end_time_c,
              location: createdCourse.schedule_location_c
            }] : []
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error creating course:", error.message);
      throw new Error("Failed to create course");
    }
  },

  async update(id, courseData) {
    try {
      const apperClient = getApperClient();
      
      const scheduleItem = courseData.schedule?.[0];
      const params = {
        records: [{
          Id: parseInt(id),
          name_c: courseData.name,
          instructor_c: courseData.instructor,
          color_c: courseData.color,
          credits_c: courseData.credits,
          semester_c: courseData.semester,
          schedule_day_c: scheduleItem?.day || "",
          schedule_start_time_c: scheduleItem?.startTime || "",
          schedule_end_time_c: scheduleItem?.endTime || "",
          schedule_location_c: scheduleItem?.location || ""
        }]
      };

      const response = await apperClient.updateRecord('course_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} courses:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        
        const updatedCourse = successful[0]?.data;
        if (updatedCourse) {
          return {
            ...updatedCourse,
            name: updatedCourse.name_c,
            instructor: updatedCourse.instructor_c,
            color: updatedCourse.color_c,
            credits: updatedCourse.credits_c,
            semester: updatedCourse.semester_c,
            schedule: updatedCourse.schedule_day_c ? [{
              day: updatedCourse.schedule_day_c,
              startTime: updatedCourse.schedule_start_time_c,
              endTime: updatedCourse.schedule_end_time_c,
              location: updatedCourse.schedule_location_c
            }] : []
          };
        }
      }
      
      return null;
    } catch (error) {
      console.error("Error updating course:", error.message);
      throw new Error("Failed to update course");
    }
  },

  async delete(id) {
    try {
      const apperClient = getApperClient();
      
      const params = { 
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('course_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);
        
        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} courses:`, failed);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }
        return successful.length > 0;
      }
      
      return true;
    } catch (error) {
      console.error("Error deleting course:", error.message);
      throw new Error("Failed to delete course");
    }
  }
};