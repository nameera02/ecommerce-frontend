import React, { useEffect, useState } from "react";
import axios from "axios";
import { 
  Table, Thead, Tbody, Tr, Th, Td, Button, 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, 
  FormControl, FormLabel, Input, Select, useDisclosure 
} from "@chakra-ui/react";

function ProjectTable() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    client: "",
    description: "",
    equipmentDelivery: "",
    sr_no: "",
    type: "oversea",
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Fetch all projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/projects");
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle project update submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedProject) {
        // Update project
        await axios.put(`http://localhost:3000/api/project/${selectedProject._id}`, formData);
      } else {
        // Add new project
        await axios.post("http://localhost:3000/api/project", formData);
      }
      onClose();
      setFormData({ name: "", location: "", client: "", description: "", equipmentDelivery: "", sr_no: "", type: "oversea" });
      setSelectedProject(null);
      const updatedProjects = await axios.get("http://localhost:3000/api/projects");
      setProjects(updatedProjects.data);
    } catch (error) {
      console.error("Error submitting project:", error);
    }
  };

  // Open modal and populate form with project data for editing
  const openEditModal = (project) => {
    setSelectedProject(project);
    setFormData({ ...project });
    onOpen();
  };

  // Delete project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/project/${id}`);
      setProjects(projects.filter((project) => project._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div>
      <Button colorScheme="blue" onClick={() => { setSelectedProject(null); onOpen(); }}>Add Project</Button>
      <Table mt={4} variant="simple">
        <Thead>
          <Tr>
            <Th>SR No</Th>
            <Th>Name</Th>
            <Th>Location</Th>
            <Th>Client</Th>
            <Th>Equipment Delivery</Th>
            <Th>Type</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {projects.map((project) => (
            <Tr key={project._id}>
              <Td>{project.sr_no}</Td>
              <Td>{project.name}</Td>
              <Td>{project.location}</Td>
              <Td>{project.client}</Td>
              <Td>{project.equipmentDelivery === "nationW" ? "Nation Wide" : "Oversea"}</Td>
              <Td>{project.type}</Td>
              <Td>
                <Button colorScheme="teal" size="sm" onClick={() => openEditModal(project)}>Edit</Button>
                <Button colorScheme="red" size="sm" ml={2} onClick={() => deleteProject(project._id)}>Delete</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Update Project Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProject ? "Update Project" : "Add Project"}</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>SR No</FormLabel>
              <Input name="sr_no" value={formData.sr_no} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Location</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Client</FormLabel>
              <Input name="client" value={formData.client} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={formData.description} onChange={handleChange} />
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Equipment Delivery</FormLabel>
              <Select name="equipmentDelivery" value={formData.equipmentDelivery} onChange={handleChange}>
                <option value="nationW">Nation Wide</option>
                <option value="oversea">Oversea</option>
              </Select>
            </FormControl>
            <FormControl mt={4}>
              <FormLabel>Type</FormLabel>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <option value="oversea">Oversea</option>
                <option value="nationW">Nation Wide</option>
              </Select>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {selectedProject ? "Update" : "Add"} Project
            </Button>
            <Button onClick={onClose} ml={3}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default ProjectTable;