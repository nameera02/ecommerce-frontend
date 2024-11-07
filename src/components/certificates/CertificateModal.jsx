import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
} from '@chakra-ui/react';
import axios from 'axios';

const CertificateModal = ({ certificate, onSuccess }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    name: '',
    issuedBy: '',
    issuedDate: '',
    expirationDate: '',
    certificateFile: '',
  });

  useEffect(() => {
    if (certificate) {
      setFormData({
        name: certificate.name,
        issuedBy: certificate.issuedBy,
        issuedDate: certificate.issuedDate,
        expirationDate: certificate.expirationDate,
        certificateFile: certificate.certificateFile,
      });
    }
  }, [certificate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = certificate ? `http://localhost:3000/api/certificate/${certificate._id}` : 'http://localhost:3000/api/certificate';
      const method = certificate ? 'put' : 'post';

      await axios({
        method,
        url,
        data: formData,
      });

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting certificate:', error);
    }
  };

  return (
    <>
      <Button onClick={onOpen}>{certificate ? 'Edit Certificate' : 'Add Certificate'}</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{certificate ? 'Edit Certificate' : 'Add Certificate'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Issued By</FormLabel>
              <Input
                name="issuedBy"
                value={formData.issuedBy}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Issued Date</FormLabel>
              <Input
                name="issuedDate"
                type="date"
                value={formData.issuedDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Expiration Date</FormLabel>
              <Input
                name="expirationDate"
                type="date"
                value={formData.expirationDate}
                onChange={handleChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Certificate File</FormLabel>
              <Input
                name="certificateFile"
                type="file"
                onChange={(e) => setFormData({ ...formData, certificateFile: e.target.files[0] })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit}>
              {certificate ? 'Update' : 'Create'}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CertificateModal;