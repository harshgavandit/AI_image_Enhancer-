import ImageUpload from "./ImageUpload";
import ImagePreview from "./ImagePreview";
import { useState } from "react";
import { enhancedImageAPI } from "../utils/enhanceImageApi";

const Home = () => {
    const [uploadImage, setUploadImage] = useState(null);
    const [enhancedImage, setEnhancedImage] = useState(null);
    const [loading, setloading] = useState(false);
    const [error, setError] = useState("");

    const UploadImageHandler = async (file) => {
        setUploadImage(URL.createObjectURL(file));
        setEnhancedImage(null);
        setError("");
        setloading(true);
        try {
            const enhancedURL = await enhancedImageAPI(file);
            setEnhancedImage(enhancedURL);
        } catch (error) {
            setError(error.message);
        } finally {
            setloading(false);
        }
    };

    return (
        <>
            <ImageUpload UploadImageHandler={UploadImageHandler} />
            {error && <p role="status" className="mt-4 text-center text-gray-700">{error}</p>}
            <ImagePreview
                loading={loading}
                uploaded={uploadImage}
                enhanced={enhancedImage?.image}
            />
        </>
    );
};

export default Home;
