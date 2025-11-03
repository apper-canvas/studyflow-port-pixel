import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Badge from "@/components/atoms/Badge";
import Modal from "@/components/atoms/Modal";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import ApperIcon from "@/components/ApperIcon";
import { studentService } from "@/services/api/studentService";
import { formatDate } from "@/utils/dateUtils";
import { toast } from "react-toastify";
import { cn } from "@/utils/cn";

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentId: "",
    major: "",
    year: "",
    gpa: "",
    status: "active",
    enrollmentDate: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: ""
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await studentService.getAll();
      setStudents(data);
    } catch (err) {
      setError("Failed to load students");
      console.error("Error loading students:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateStudent = () => {
    setEditingStudent(null);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentId: "",
      major: "",
      year: "",
      gpa: "",
      status: "active",
      enrollmentDate: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: ""
    });
    setIsModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setFormData({
      firstName: student.firstName,
      lastName: student.lastName,
      email: student.email,
      phone: student.phone,
      studentId: student.studentId,
      major: student.major,
      year: student.year,
      gpa: student.gpa.toString(),
      status: student.status,
      enrollmentDate: student.enrollmentDate,
      address: student.address,
      emergencyContact: student.emergencyContact,
      emergencyPhone: student.emergencyPhone
    });
    setIsModalOpen(true);
  };

  const handleDeleteStudent = async (studentId) => {
    if (!confirm("Are you sure you want to delete this student? This action cannot be undone.")) {
      return;
    }

    try {
      await studentService.delete(studentId);
      setStudents(prev => prev.filter(student => student.Id !== studentId));
      toast.success("Student deleted successfully");
    } catch (err) {
      toast.error("Failed to delete student");
      console.error("Error deleting student:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const studentData = {
        ...formData,
        gpa: parseFloat(formData.gpa) || 0,
        year: parseInt(formData.year) || 1
      };

      if (editingStudent) {
        const updatedStudent = await studentService.update(editingStudent.Id, studentData);
        setStudents(prev => prev.map(student => 
          student.Id === editingStudent.Id ? updatedStudent : student
        ));
        toast.success("Student updated successfully");
      } else {
        const newStudent = await studentService.create(studentData);
        setStudents(prev => [...prev, newStudent]);
        toast.success("Student created successfully");
      }

      setIsModalOpen(false);
      setEditingStudent(null);
    } catch (err) {
      toast.error(editingStudent ? "Failed to update student" : "Failed to create student");
      console.error("Error submitting student:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.major.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "all" || student.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "bg-success-100 text-success-700 border-success-200";
      case "inactive": return "bg-gray-100 text-gray-700 border-gray-200";
      case "graduated": return "bg-primary-100 text-primary-700 border-primary-200";
      case "suspended": return "bg-danger-100 text-danger-700 border-danger-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getYearLabel = (year) => {
    switch (year) {
      case 1: return "Freshman";
      case 2: return "Sophomore";
      case 3: return "Junior";
      case 4: return "Senior";
      default: return `Year ${year}`;
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} onRetry={loadStudents} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Students</h1>
          <p className="text-gray-600 mt-1">Manage student records and information</p>
        </div>
        <Button 
          onClick={handleCreateStudent}
          className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white hover:shadow-lg transition-all duration-200"
        >
          <ApperIcon name="Plus" size={16} className="mr-2" />
          Add Student
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search students by name, email, student ID, or major..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white min-w-[120px]"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="graduated">Graduated</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </Card>

      {/* Students Grid */}
      {filteredStudents.length === 0 ? (
        <Empty 
          title="No students found"
          description={searchTerm || statusFilter !== "all" ? "Try adjusting your search or filters" : "Get started by adding your first student"}
          action={
            <Button 
              onClick={handleCreateStudent}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
            >
              <ApperIcon name="Plus" size={16} className="mr-2" />
              Add Student
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredStudents.map((student) => (
              <motion.div
                key={student.Id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group"
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-200 h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {student.firstName} {student.lastName}
                        </h3>
                        <p className="text-sm text-gray-500">{student.studentId}</p>
                      </div>
                    </div>
                    <Badge className={cn("text-xs font-medium border", getStatusColor(student.status))}>
                      {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                    </Badge>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="Mail" size={14} className="mr-2 text-gray-400" />
                      <span className="truncate">{student.email}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <ApperIcon name="GraduationCap" size={14} className="mr-2 text-gray-400" />
                      <span>{student.major} • {getYearLabel(student.year)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-600">
                        <ApperIcon name="Trophy" size={14} className="mr-2 text-gray-400" />
                        <span>GPA: {student.gpa.toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-500">
                        Enrolled {formatDate(student.enrollmentDate)}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-100">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditStudent(student)}
                      className="flex-1 text-primary-600 border-primary-200 hover:bg-primary-50"
                    >
                      <ApperIcon name="Edit" size={14} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteStudent(student.Id)}
                      className="text-danger-600 border-danger-200 hover:bg-danger-50"
                    >
                      <ApperIcon name="Trash2" size={14} />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Student Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => !isSubmitting && setIsModalOpen(false)}
        title={editingStudent ? "Edit Student" : "Add New Student"}
        className="max-w-2xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                required
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="Last Name"
                required
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="Email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Academic Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Student ID"
                required
                value={formData.studentId}
                onChange={(e) => handleInputChange("studentId", e.target.value)}
                disabled={isSubmitting}
              />
              <Input
                label="Major"
                required
                value={formData.major}
                onChange={(e) => handleInputChange("major", e.target.value)}
                disabled={isSubmitting}
              />
              <select
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="">Select Year</option>
                <option value="1">Freshman (Year 1)</option>
                <option value="2">Sophomore (Year 2)</option>
                <option value="3">Junior (Year 3)</option>
                <option value="4">Senior (Year 4)</option>
              </select>
              <Input
                label="GPA"
                type="number"
                step="0.01"
                min="0"
                max="4"
                value={formData.gpa}
                onChange={(e) => handleInputChange("gpa", e.target.value)}
                disabled={isSubmitting}
              />
              <select
                value={formData.status}
                onChange={(e) => handleInputChange("status", e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="graduated">Graduated</option>
                <option value="suspended">Suspended</option>
              </select>
              <Input
                label="Enrollment Date"
                type="date"
                required
                value={formData.enrollmentDate}
                onChange={(e) => handleInputChange("enrollmentDate", e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>

          {/* Additional Information */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
            <div className="space-y-4">
              <Input
                label="Address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                disabled={isSubmitting}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Emergency Contact Name"
                  value={formData.emergencyContact}
                  onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                  disabled={isSubmitting}
                />
                <Input
                  label="Emergency Contact Phone"
                  value={formData.emergencyPhone}
                  onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-primary-500 to-secondary-500 text-white"
            >
              {isSubmitting ? (
                <>
                  <ApperIcon name="Loader2" size={16} className="mr-2 animate-spin" />
                  {editingStudent ? "Updating..." : "Creating..."}
                </>
              ) : (
                editingStudent ? "Update Student" : "Create Student"
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Students;