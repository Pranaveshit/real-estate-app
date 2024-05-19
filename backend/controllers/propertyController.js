const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
  try {
    const newProperty = new Property({
      seller: req.user.id,
      place,
      area,
      bedrooms,
      bathrooms,
      nearbyHospitals,
      nearbyColleges
    });
    const property = await newProperty.save();
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ seller: req.user.id });
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateProperty = async (req, res) => {
  const { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } = req.body;
  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });

    if (property.seller.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    property = await Property.findByIdAndUpdate(req.params.id, { $set: { place, area, bedrooms, bathrooms, nearbyHospitals, nearbyColleges } }, { new: true });
    res.json(property);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ msg: "Property not found" });

    if (property.seller.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Property.findByIdAndRemove(req.params.id);
    res.json({ msg: "Property removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
