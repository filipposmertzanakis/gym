const express = require('express');
const Service = require('../models/Service');
const router = express.Router();

// Get All Services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find().populate('trainer');
        res.status(200).json(services);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add New Service
router.post('/', async (req, res) => {
    try {
        const newService = new Service(req.body);
        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});
// delete a service by searching its name
router.delete('/deleteByName/:serviceName', async (req, res) => {
    try {
      const { serviceName } = req.params;
  
      // Find and delete the service
      const deletedService = await Service.findOneAndDelete({ name: serviceName });
  
      if (!deletedService) {
        return res.status(404).json({ message: `Service "${serviceName}" not found.` });
      }
  
      res.status(200).json({ message: `Service "${serviceName}" deleted successfully.` });
    } catch (error) {
      console.error('Error deleting service:', error);
      res.status(500).json({ message: 'Internal server error.' });
    }
  });
  
// Update a service by name
router.put('/updateByName/:serviceName', async (req, res) => {
  try {
      const { serviceName } = req.params;
      const updatedService = await Service.findOneAndUpdate({ name: serviceName }, req.body, { new: true });

      if (!updatedService) {
          return res.status(404).json({ message: `Service "${serviceName}" not found.` });
      }

      res.status(200).json(updatedService);
  } catch (error) {
      console.error('Error updating service:', error);
      res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;