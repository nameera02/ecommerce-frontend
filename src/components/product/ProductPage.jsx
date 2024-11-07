import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  FormControl,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

const ClientManagement = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    sr_no:"",
    name: "",           // Product name
    model: "",          // Product model
    image: null,        // Image file
    aval: "",           // Availability (e.g., "In Stock", "Out of Stock", "Pre-Order")
    price: "",          // Product price
    detail: ""          // Product details
  });  const [editProductId, setEditProductId] = useState(null);

  // Disclosure hooks for separate modals
  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Fetch clients
  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        setProducts(response.data.products);
        console.log(response.data.products);
        
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle Add Client submission
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("sr_no", formData.sr_no);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("image", formData.image);  // Only append if image is uploaded
    formDataToSend.append("aval", formData.aval);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("detail", formData.detail);

    try {
      await axios.post("http://localhost:3000/api/product", formDataToSend);
      setFormData({ name: "", image: null });
      onAddClose();
      // Refetch clients
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error adding client:", error);
    }
  };

  // Handle Edit Client submission
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("sr_no", formData.sr_no);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("model", formData.model);
    formDataToSend.append("image", formData.image);  // Only append if image is uploaded
    formDataToSend.append("aval", formData.aval);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("detail", formData.detail);

    try {
      await axios.put(`http://localhost:3000/api/product/${editProductId}`, formDataToSend);
      setFormData({ name: "", image: null });
      setEditProductId(null);
      onEditClose();
      // Refetch products
      const response = await axios.get("http://localhost:3000/api/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error editing client:", error);
    }
  };

  // Handle edit button click
  const handleEditClick = (product) => {
    setEditProductId(product._id);
    setFormData({
      sr_no:product.sr_no,
      name: product.name,
      model: product.model,
      image: null,                // Set image to null if you want to keep it empty for new upload
      aval: product.aval,         // Assuming this is the availability status
      price: product.price,
      detail: product.detail
    });
    onEditOpen();
  };

  // Handle delete button click
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/product/${productId}`);
      setProducts(products.filter((product) => product._id !== productId));
    } catch (error) {
      console.error("Error deleting client:", error);
    }
  };

  return (
    <Box p={5}>
      <Button colorScheme="teal" onClick={onAddOpen}>
        Add Product
      </Button>
      <Table mt={4}>
        <Thead>
          <Tr>
            <Th>S.No</Th>
            <Th>Name</Th>
            <Th>Image</Th>
            <Th>Model</Th>
            <Th>Price</Th>
            <Th>Avalability</Th>
            <Th>Detail</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {products.map((product) => (
            <Tr key={product._id}>
              <Td>{product.sr_no}</Td>
              <Td>{product.name}</Td>
              <Td>
                <img src={`${product.imagePath}`} alt={product.name} width="50" />
              </Td>
              <Td>{product.model}</Td>
              <Td>{product.price}</Td>
              <Td>{product.aval}</Td>
              <Td>{product.detail}</Td>
              <Td>
                <Button colorScheme="blue" onClick={() => handleEditClick(product)}>
                  Edit
                </Button>
                <Button colorScheme="red" ml={2} onClick={() => handleDelete(product._id)}>
                  Delete
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      {/* Add Product Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleAddSubmit}>
              <FormControl isRequired mb={4}>
                <FormLabel>SR NO</FormLabel>
                <Input type="text" name="sr_no" value={formData.sr_no} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Name</FormLabel>
                <Input type="text" name="name" value={formData.name} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Model</FormLabel>
                <Input type="text" name="model" value={formData.model} onChange={handleChange} />
              </FormControl>
              <FormControl mb={4}>
                <FormLabel>Image</FormLabel>
                <Input type="file" name="image" onChange={handleChange} accept="image/*" />
              </FormControl>
              <FormControl isRequired mb={4}>
              <FormLabel>Availability</FormLabel>
              <Select name="aval" value={formData.aval} onChange={handleChange} placeholder="Select availability">
                <option value="instock">In Stock</option>
                <option value="outofstock">Out of Stock</option>
                <option value="inorder">Pre-Order</option>
              </Select>
            </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Price</FormLabel>
                <Input type="text" name="price" value={formData.price} onChange={handleChange} />
              </FormControl>
              <FormControl isRequired mb={4}>
                <FormLabel>Detail</FormLabel>
                <Input type="text" name="detail" value={formData.detail} onChange={handleChange} />
              </FormControl>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} type="submit">
                  Add
                </Button>
                <Button onClick={onAddClose}>Cancel</Button>
              </ModalFooter>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Edit Product Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader>Edit Product</ModalHeader>
    <ModalCloseButton />
    <ModalBody>
      <form onSubmit={handleEditSubmit}>
      <FormControl isRequired mb={4}>
                <FormLabel>SR NO</FormLabel>
                <Input type="text" name="sr_no" value={formData.sr_no} onChange={handleChange} />
              </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Model</FormLabel>
          <Input type="text" name="model" value={formData.model} onChange={handleChange} />
        </FormControl>
        <FormControl mb={4}>
          <FormLabel>Image</FormLabel>
          <Input type="file" name="image" onChange={handleChange} accept="image/*" />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Availability</FormLabel>
          <Select name="aval" value={formData.aval} onChange={handleChange} placeholder="Select availability">
            <option value="instock">In Stock</option>
            <option value="outofstock">Out of Stock</option>
            <option value="inorder">In Order</option>
          </Select>
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Price</FormLabel>
          <Input type="text" name="price" value={formData.price} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired mb={4}>
          <FormLabel>Detail</FormLabel>
          <Input type="text" name="detail" value={formData.detail} onChange={handleChange} />
        </FormControl>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} type="submit">
            Update
          </Button>
          <Button onClick={onEditClose}>Cancel</Button>
        </ModalFooter>
      </form>
    </ModalBody>
  </ModalContent>
</Modal>
    </Box>
  );
};

export default ClientManagement;