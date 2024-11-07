// CertificateTable.js
import React, { useEffect, useState } from 'react';
import { Table, Tbody, Tr, Td, Th, Thead, Button } from '@chakra-ui/react';
import axios from 'axios';
import CertificateModal from './CertificateModal';

const CertificateTable = () => {
  const [certificates, setCertificates] = useState([]);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/certificates');
        setCertificates(data.certificates);
        
      } catch (error) {
        console.error('Error fetching certificates:', error);
      }
    };

    fetchCertificates();
  }, [certificates]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/certificate/${id}`);
      setCertificates(certificates.filter((certificate) => certificate._id !== id));
    } catch (error) {
      console.error('Error deleting certificate:', error);
    }
  };

  return (
    <>
      <CertificateModal onSuccess={() => setCertificates([])} /> {/* Refresh certificates after adding/editing */}

      <Table>
        <Thead>
          <Tr>
            <Th>SR No</Th>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {certificates.map((certificate) => (
            <Tr key={certificate._id}>
              <Td>{certificate.sr_no}</Td>
              <Td>{certificate.name}</Td>
              <Td>
                <img src={`${certificate.imagePath}`} alt={certificate.name} width="50" />
              </Td>
              <Td>
                <CertificateModal certificate={certificate} onSuccess={() => setCertificates([])} />
                <Button onClick={() => handleDelete(certificate._id)} colorScheme="red">
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default CertificateTable;