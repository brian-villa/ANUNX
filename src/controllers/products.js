import formidable from "formidable-serverless" 
import path from "path"
import fs from "fs"
import ProductsModel from "../models/products"
import dbConnect from "../utils/dbConnect"

//body parser

const post = async (req, res) => {
    await dbConnect()

    const form = new formidable.IncomingForm({
        multiples: true,
        uploadDir: 'public/uploads',
        keepExtensions: true,
    })

    form.parse(req, async (error, fields, data) => {
        if (error) {
            return res.status(500).json({success: true})
        }

        const { files } = data

        const filesToRename = files instanceof Array
            ? files
            : [files]

        const filesToSave = [] 

        filesToRename.forEach(file => {
            const timestamp = Date.now()
            const random = Math.floor(Math.random() * 99999999) + 1

            const extension = path.extname(file.name)
            
            const filename = `${timestamp}_${random}${extension}`

            const oldpath = path.join(__dirname, `../../../../../${file.path}`)

            const newpath = path.join(__dirname, `../../../../../${form.uploadDir}/${filename}`)


            filesToSave.push({
                name: filename,
                path: newpath,
            })

            fs.rename(oldpath, newpath, () => {
                if(error) {
                    console.log(err)
                    return res.status(500).json({ success: true })
                }
            })
        })

        const {
            title,
            category,
            description,
            price,
            name,
            email,
            phone,
            city,
            userId,
            image,
            date,
        } = fields

        const product = new ProductsModel({
            title,
            category,
            description,
            price,
            date,
            user: {
                id: userId,
                name,
                email,
                phone,
                city,
                image,
            },
            files: filesToSave,
        })

        const register = await product.save()

        if(register) {
            res.status(201).json({ success: true })
        } else {
            res.status(500).json({ success: false })
            return
        }

    })
    
    res.status(200).json({success: true})
}

const remove = async (req, res) => {
    await dbConnect()

    const id = req.body.id

    const deleted = await ProductsModel.findOneAndRemove({ _id: id })

    if(deleted) {
        return res.status(200).json({ success: true })
    } else {
        return res.status(500).json({ success: false })
    }
}

export {
    post,
    remove,
}