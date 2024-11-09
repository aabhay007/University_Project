import DepartmentModel from "../models/Department.js";
import fs from "fs";
export const CreateDepartment = async (req, res) => {
  try {
    const depData = await DepartmentModel.create({
      name: req.body.name,
      image: req?.file?.filename,
      uniId: req.body.uniId,
    });
    if (depData) res.status(200).send({ message: "Department Created" });
    else res.status(404).send({ message: "unable to create department" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const GetDepartment = async (req, res) => {
  try {
    const getdata = await DepartmentModel.find().populate("uniId");
    if (getdata) res.status(200).send({ getdata });
    else res.status(404).send({ message: "Unable to fetch data!" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
export const DelDepartment = async (req, res) => {
  try {
    const deldep = await DepartmentModel.deleteOne({
      _id: req.body._id,
    });
    if (deldep.deletedCount == 1)
      res.status(200).send({ message: "Department Deleted!" });
    else res.status(404).send({ error: e?.message });
  } catch {
    res.status(404).send({ error: e?.message });
  }
};
export const UpdatedDepartment = async (req, res) => {
  try {
    const staticpath = "D:\\React JS\\ecomm_react\\server\\uploadDep\\"; // Absolute path for department images directory

    // Get existing department data
    const existingData = await DepartmentModel.findById(req.body.id);
    if (!existingData) {
      return res.status(404).send({ message: "Department not found!" });
    }

    // Delete previous image if it exists
    if (existingData.image) {
      fs.unlink(staticpath + existingData.image, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        } else {
          console.log("Previous image deleted successfully");
        }
      });
    }

    // Update department data
    const updatedData = await DepartmentModel.findByIdAndUpdate(
      req.body.id,
      {
        name: req.body.name,
        image: req?.file?.filename || existingData.image,
        uniId: req.body.uniId,
      },
      { new: true }
    );

    if (updatedData) {
      res.status(200).send({ message: "Department updated!" });
    } else {
      res.status(404).send({ message: "Unable to update department!" });
    }
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
export const GetDepartmentByUniversityId = async (req, res) => {
  try {
    // console.log("chal rha hai");
    const depData = await DepartmentModel.find({
      uniId: req.query.universityId,
    });

    if (depData) res.status(200).send({ depData });
    else res.status(404).send({ message: "Unable to fetch data!" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};
