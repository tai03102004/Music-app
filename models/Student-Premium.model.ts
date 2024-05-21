import mongoose from "mongoose";

const accountStudentPremium = new mongoose.Schema(
    {
        region : String,
        university : String,
        lastName : String,
        firstName : String,
        dateOfBirth: Date ,
        email : String,
        phone : String,
    }
)

const StudentPremium = mongoose.model("StudentPremium", accountStudentPremium, "student-premium");

export default StudentPremium;