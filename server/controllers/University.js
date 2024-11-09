import UniversityModel from "../models/University.js";
import fs from "fs";

export const CreateUniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.create({
      name: req.body.name,
      image: req?.file?.filename,
    });
    if (univData) res.status(200).send({ message: "University Created !" });
    else res.status(404).send({ message: "unable to create!" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const UpdateUniversity = async (req, res) => {
  try {
    const staticpath = "D:\\React JS\\ecomm_react\\server\\uploadUniv\\"; //absolute path

    // existing university data
    const existingData = await UniversityModel.findById(req.body._id);
    if (!existingData) {
      return res.status(404).send({ message: "University not found!" });
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
    // Update university data
    const updatedData = await UniversityModel.findByIdAndUpdate(
      req.body._id,
      {
        name: req.body.name,
        image: req.file ? req.file.filename : existingData.image,
      },
      { new: true }
    );

    if (updatedData) {
      res.status(200).send({ message: "University updated !" });
    } else {
      res.status(404).send({ message: "Unable to update!" });
    }
  } catch (e) {
    res.status(500).send({ error: e.message });
  }
};

// export const UpdateUniversity = async (req, res) => {
//   try {
//     const oldUniversity = await UniversityModel.findById(req.body._id);
//     if (!oldUniversity) {
//       return res.status(404).send({ message: "University not found!" });
//     }

//     let updatedFields = {
//       name: req.body.name,
//       image: req?.file?.filename,
//     };

//     const updatedUniversity = await UniversityModel.findByIdAndUpdate(
//       req.body._id,
//       updatedFields,
//       { new: true }
//     );

//     if (!updatedUniversity) {
//       return res.status(404).send({ message: "Unable to update university!" });
//     }

//     // Delete the existing image if it exists
//     if (oldUniversity.image) {
//       fs.unlink(path.join(__dirname, "uploadUniv", oldUniversity.image), (err) => {
//         if (err) {
//           console.error("Error deleting image:", err);
//         }
//       });
//     }

//     res.status(200).send({ message: "University updated successfully!" });
//   } catch (error) {
//     console.error("Error updating university:", error.message);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// };

export const DeleteUniversity = async (req, res) => {
  try {
    const DelUniv = await UniversityModel.deleteOne({
      _id: req.body._id,
    });
    if (DelUniv.deletedCount == 1)
      res.status(200).send({ message: "University Deleted !" });
    else res.status(404).send({ message: "unable to delete!" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const Alluniversity = async (req, res) => {
  try {
    const univData = await UniversityModel.find();
    if (univData) res.status(200).send({ univData });
    else res.status(404).send({ message: "Empty!" });
  } catch (e) {
    res.status(404).send({ error: e?.message });
  }
};

export const testdel = async (req, res) => {
  const univData = await UniversityModel.find();
  const existingimg = univData.image;
  console.log(existingimg);
  const imgpath =
    "D:\\React JS\\ecomm_react\\server\\uploadUniv\\1709659897625--wallpaperflare.com_wallpaper.jpg";

  fs.unlink(imgpath, (err) => {
    if (err) {
      console.error("Error deleting file:", err);
      return;
    }
    console.log("File deleted successfully");
  });
};
