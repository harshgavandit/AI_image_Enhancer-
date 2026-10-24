// Provider credentials belong behind a server boundary, never in this bundle.
export const enhancedImageAPI = async () => {
    const error = new Error("Enhancement is unavailable until a server proxy is configured. Local image preview is available.");
    error.name = "EnhancementUnavailableError";
    throw error;
};
