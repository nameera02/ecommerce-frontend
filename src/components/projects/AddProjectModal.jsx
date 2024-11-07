import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
} from '@chakra-ui/react';
import axios from 'axios';

const AddProjectModal = ({ isOpen, onClose, onProjectAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    client: '',
    description: '',
    equipmentDelivery: '',
    sr_no: '',
    type: 'oversea',
  });

  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/project", formData);
      onClose();
      onProjectAdded(); // Refresh projects after adding a new one
      toast({
        title: 'Project added.',
        description: "The project has been added successfully.",
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      setFormData({
        name: '',
        location: '',
        client: '',
        description: '',
        equipmentDelivery: '',
        sr_no: '',
        type: 'oversea',
      });
    } catch (error) {
      console.error("Error adding project:", error);
      toast({
        title: 'Error',
        description: "There was an error adding the project.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Project</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <FormControl mb={3} isRequired>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} />
            </FormControl>

            <FormControl mb={3} isRequired>
              <FormLabel>Location</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} />
            </FormControl>

            <FormControl mb={3} isRequired>
              <FormLabel>Client</FormLabel>
              <Input name="client" value={formData.client} onChange={handleChange} />
            </FormControl>

            <FormControl mb={3} isRequired>
              <FormLabel>Description</FormLabel>
              <Input name="description" value={formData.description} onChange={handleChange} />
            </FormControl>

            <FormControl mb={3} isRequired>
              <FormLabel>Equipment Delivery</FormLabel>
              <Input name="equipmentDelivery" value={formData.equipmentDelivery} onChange={handleChange} />
            </FormControl>

            <FormControl mb={3} isRequired>
              <FormLabel>SR No</FormLabel>
              <Input name="sr_no" value={formData.sr_no} onChange={handleChange} />
            </FormControl>

            <FormControl mb={3} isRequired>
              <FormLabel>Type</FormLabel>
              <Select name="type" value={formData.type} onChange={handleChange}>
                <option value="oversea">Oversea</option>
                <option value="nationW">NationW</option>
              </Select>
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProjectModal;
