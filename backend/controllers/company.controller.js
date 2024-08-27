import { Company } from "../models/company.model.js";


export const registerCompany = async (req,res) =>{
    try {
        const {companyName} = req.body;
        if(!companyName){
            return res.status(400).json({
                message: "Company Name is required",
                success: false
            });
        }
        let company = await Company.findOne({name: companyName});
        if(company){
            return res.status(400).json({
                message: "Company already exists",
                success: false
            });
        }
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        res.status(201).json({
            message: "Company registered successfully",
            success: true,
            company
        });
    } catch (error) {
        console.error(error);
    }
}

export const getCompany = async (req,res) => {
    try {
        const userId = req.id;
        const companies = await Company.find({userId});
        if(!companies){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        res.status(200).json({
            success: true,
            companies
        });
    } catch (error) {
        console.error(error);
    }
}
export const getCompanyById = async (req,res) =>{
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        res.status(200).json({
            success: true,
            company
        });
    } catch (error) {
        console.error(error);
    }
}

export const updateCompany = async (req,res) => {
    try {
        const companyId = req.params.id;
        const {name,description,website,location} = req.body;
        const file = req.file;
        //cloudinary

        const updateData = {name,description,website,location};
        
        const company = await Company.findByIdAndUpdate(companyId,updateData,{new: true});
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                success: false
            });
        }
        res.status(200).json({
            success: true,
            company,
            message: "Company updated successfully"
        });
    } catch (error) {
        console.error(error);
    }
}